'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_TWIN_API_URL || 'https://digital-twin-production-c355.up.railway.app';
const API_KEY = process.env.NEXT_PUBLIC_TWIN_API_KEY || '';

interface Message {
  role: 'user' | 'jose';
  text: string;
  meta?: {
    language?: string;
    register?: string;
    examples_used?: number | string;
    elapsed?: string;
  };
}

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState<'connecting' | 'ws' | 'rest' | 'offline'>('connecting');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const wsReadyRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sessionIdRef = useRef(crypto.randomUUID());
  const pendingStartRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // WebSocket connection
  const connectWebSocket = useCallback(() => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const wsUrl = API_URL.replace(/^http/, 'ws') + '/ws';
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    wsReadyRef.current = false;

    ws.onopen = () => {
      if (API_KEY) {
        ws.send(JSON.stringify({ type: 'auth', key: API_KEY }));
      }
      wsReadyRef.current = true;
      setConnected('ws');
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === 'error') {
        setSending(false);
        setMessages(prev => [...prev, { role: 'jose', text: `Error: ${msg.content}` }]);
        return;
      }

      if (msg.type === 'text' && msg.done) {
        const elapsed = pendingStartRef.current
          ? ((performance.now() - pendingStartRef.current) / 1000).toFixed(1)
          : '?';
        pendingStartRef.current = null;

        setMessages(prev => [...prev, {
          role: 'jose',
          text: msg.content,
          meta: {
            language: msg.language,
            register: msg.register,
            examples_used: msg.examples_used,
            elapsed,
          },
        }]);
        setSending(false);
      }

      if (msg.type === 'audio') {
        const audioData = Uint8Array.from(atob(msg.content), c => c.charCodeAt(0));
        const blob = new Blob([audioData], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play().catch(() => {});
      }
    };

    ws.onclose = () => {
      wsReadyRef.current = false;
      setConnected('offline');
      setTimeout(connectWebSocket, 3000);
    };

    ws.onerror = () => {
      wsReadyRef.current = false;
    };
  }, []);

  // Health check + WS init
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const resp = await fetch(`${API_URL}/health`);
        const data = await resp.json();
        if (data.status === 'ok') {
          setConnected('rest');
          connectWebSocket();
        }
      } catch {
        setConnected('offline');
      }
    };
    checkHealth();

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [connectWebSocket]);

  // Send message
  const sendMessage = useCallback(async (overrideText?: string) => {
    const query = (overrideText || input).trim();
    if (!query || sending) return;

    setInput('');
    setSending(true);
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    pendingStartRef.current = performance.now();

    // Try WebSocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        query,
        session_id: sessionIdRef.current,
        voice: voiceEnabled,
      }));
      return;
    }

    // REST fallback
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;

      const resp = await fetch(`${API_URL}/ask-jose`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, session_id: sessionIdRef.current }),
      });

      if (!resp.ok) {
        throw new Error(resp.status === 401 ? 'Invalid API key' : `Error ${resp.status}`);
      }

      const data = await resp.json();
      const elapsed = pendingStartRef.current
        ? ((performance.now() - pendingStartRef.current) / 1000).toFixed(1)
        : '?';
      pendingStartRef.current = null;

      setMessages(prev => [...prev, {
        role: 'jose',
        text: data.response,
        meta: {
          language: data.language,
          register: data.style_register,
          examples_used: data.examples_used,
          elapsed,
        },
      }]);

      // Voice via REST
      if (voiceEnabled) {
        const audioResp = await fetch(`${API_URL}/ask-jose/voice`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ query, session_id: sessionIdRef.current }),
        });
        if (audioResp.ok) {
          const blob = await audioResp.blob();
          const audio = new Audio(URL.createObjectURL(blob));
          audio.play().catch(() => {});
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'jose', text: `Error: ${(err as Error).message}` }]);
    }

    setSending(false);
  }, [input, sending, voiceEnabled]);

  // Voice recording
  const startRecording = useCallback(async () => {
    if (isRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        if (audioChunksRef.current.length === 0) return;

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setIsRecording(false);

        // Transcribe
        const headers: Record<string, string> = {};
        if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;

        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        try {
          const resp = await fetch(`${API_URL}/transcribe`, {
            method: 'POST',
            headers,
            body: formData,
          });
          if (!resp.ok) throw new Error('Transcription failed');
          const data = await resp.json();
          if (data.text?.trim()) {
            sendMessage(data.text.trim());
          }
        } catch {
          setMessages(prev => [...prev, { role: 'jose', text: 'Could not transcribe audio. Try typing instead.' }]);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      // Mic denied
    }
  }, [isRecording, sendMessage]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  }, [isRecording]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const statusColor = connected === 'ws' ? '#a371f7' : connected === 'rest' ? '#3fb950' : connected === 'offline' ? '#f85149' : '#8b949e';
  const statusLabel = connected === 'ws' ? 'WS' : connected === 'rest' ? 'REST' : connected === 'offline' ? 'Offline' : 'Connecting';

  return (
    <div
      className="flex flex-col"
      style={{
        height: '60vh',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 flex-shrink-0"
        style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div
          className="flex items-center justify-center text-[14px] font-semibold"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
          }}
        >
          JP
        </div>
        <div className="flex-1">
          <div className="text-white text-[13px] font-medium uppercase tracking-[0.1em]">Talk to Jose</div>
          <div className="text-[11px] uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Digital Twin -- RAG + Groq 70B + Voice Clone
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor }} />
          <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {statusLabel}
          </span>
        </div>
        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className="text-[11px] uppercase tracking-[0.1em]"
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.15)',
            color: voiceEnabled ? '#fff' : 'rgba(255,255,255,0.35)',
            padding: '4px 10px',
            borderRadius: '6px',
            cursor: 'none',
            marginLeft: '8px',
          }}
        >
          Voice {voiceEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto flex flex-col gap-3"
        style={{ padding: '20px' }}
      >
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <div className="text-[32px] mb-3" style={{ color: 'rgba(255,255,255,0.15)' }}>JP</div>
            <div className="text-[13px] uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Ask anything
            </div>
            <div className="text-[12px] leading-relaxed max-w-[320px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              English or Spanish. Type or hold the mic. Powered by RAG over 27K+ real messages.
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[72%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}
            style={{
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
              border: msg.role === 'jose' ? '1px solid rgba(255,255,255,0.08)' : 'none',
              fontSize: '13px',
              lineHeight: '1.5',
              color: '#fff',
              wordBreak: 'break-word',
            }}
          >
            <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
            {msg.meta && msg.role === 'jose' && (
              <div className="flex gap-2 items-center mt-2" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
                {msg.meta.language && (
                  <span
                    className="uppercase font-semibold"
                    style={{
                      padding: '1px 5px',
                      borderRadius: '3px',
                      background: 'rgba(255,255,255,0.06)',
                      color: msg.meta.language === 'es' ? '#f0883e' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {msg.meta.language}
                  </span>
                )}
                {msg.meta.register && <span>{msg.meta.register}</span>}
                {msg.meta.examples_used && <span>{msg.meta.examples_used} ex</span>}
                {msg.meta.elapsed && <span>{msg.meta.elapsed}s</span>}
              </div>
            )}
          </div>
        ))}

        {sending && (
          <div
            className="self-start"
            style={{
              padding: '12px 18px',
              borderRadius: '14px 14px 14px 4px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.3)',
                    animation: `twin-bounce 1.4s infinite ease-in-out ${i * 0.16}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-end gap-2 flex-shrink-0"
        style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: `1px solid ${isRecording ? '#f85149' : 'rgba(255,255,255,0.15)'}`,
            background: 'none',
            color: isRecording ? '#f85149' : 'rgba(255,255,255,0.4)',
            cursor: 'none',
            fontSize: '14px',
            animation: isRecording ? 'twin-pulse 1s infinite' : 'none',
          }}
          title="Hold to speak"
        >
          &#x1F3A4;
        </button>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Jose..."
          rows={1}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '13px',
            fontFamily: 'inherit',
            resize: 'none',
            minHeight: '36px',
            maxHeight: '100px',
            lineHeight: '1.4',
            outline: 'none',
            cursor: 'none',
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={sending || !input.trim()}
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: sending || !input.trim() ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)',
            border: 'none',
            color: sending || !input.trim() ? 'rgba(255,255,255,0.2)' : '#fff',
            cursor: 'none',
            fontSize: '14px',
          }}
        >
          ↑
        </button>
      </div>

      <style jsx>{`
        @keyframes twin-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes twin-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
