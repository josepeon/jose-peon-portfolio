'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_TWIN_API_URL || 'https://digital-twin-production-c355.up.railway.app';
const API_KEY = process.env.NEXT_PUBLIC_TWIN_API_KEY || '';

type Status = 'idle' | 'recording' | 'thinking' | 'speaking';

export default function TalkToJose() {
  const [status, setStatus] = useState<Status>('idle');
  const [connected, setConnected] = useState(false);
  const [lastTranscript, setLastTranscript] = useState('');
  const [lastResponse, setLastResponse] = useState('');

  const wsRef = useRef<WebSocket | null>(null);
  const wsReadyRef = useRef(false);
  const sessionIdRef = useRef(crypto.randomUUID());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // WebSocket connection
  const connectWebSocket = useCallback(() => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const wsUrl = API_URL.replace(/^http/, 'ws') + '/ws';
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      if (API_KEY) ws.send(JSON.stringify({ type: 'auth', key: API_KEY }));
      wsReadyRef.current = true;
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === 'error') {
        setStatus('idle');
        setLastResponse(`Error: ${msg.content}`);
        return;
      }

      if (msg.type === 'text' && msg.done) {
        setLastResponse(msg.content);
        // If no audio comes, go back to idle after a moment
        setTimeout(() => {
          setStatus(prev => prev === 'thinking' ? 'idle' : prev);
        }, 5000);
      }

      if (msg.type === 'audio') {
        const audioData = Uint8Array.from(atob(msg.content), c => c.charCodeAt(0));
        const blob = new Blob([audioData], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        setStatus('speaking');
        audio.onended = () => {
          setStatus('idle');
          audioRef.current = null;
        };
        audio.play().catch(() => setStatus('idle'));
      }
    };

    ws.onclose = () => {
      wsReadyRef.current = false;
      setConnected(false);
      setTimeout(connectWebSocket, 3000);
    };

    ws.onerror = () => {
      wsReadyRef.current = false;
    };
  }, []);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const resp = await fetch(`${API_URL}/health`);
        const data = await resp.json();
        if (data.status === 'ok') {
          setConnected(true);
          connectWebSocket();
        }
      } catch {
        setConnected(false);
      }
    };
    checkHealth();
    return () => { if (wsRef.current) wsRef.current.close(); };
  }, [connectWebSocket]);

  // Send query via WS or REST (always with voice)
  const sendQuery = useCallback(async (query: string) => {
    setStatus('thinking');
    setLastTranscript(query);

    // Try WebSocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        query,
        session_id: sessionIdRef.current,
        voice: true,
      }));
      return;
    }

    // REST fallback with voice
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;
      const body = { query, session_id: sessionIdRef.current };

      // Get voice response
      const resp = await fetch(`${API_URL}/ask-jose/voice`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      if (!resp.ok) throw new Error(`Error ${resp.status}`);

      const responseText = resp.headers.get('X-Response-Text') || '';
      setLastResponse(responseText);

      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      setStatus('speaking');
      audio.onended = () => {
        setStatus('idle');
        audioRef.current = null;
      };
      audio.play().catch(() => setStatus('idle'));
    } catch {
      setStatus('idle');
      setLastResponse('Could not reach Jose. Try again.');
    }
  }, []);

  // Recording
  const startRecording = useCallback(async () => {
    if (status !== 'idle') return;

    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        if (audioChunksRef.current.length === 0) {
          setStatus('idle');
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setStatus('thinking');

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
            sendQuery(data.text.trim());
          } else {
            setStatus('idle');
          }
        } catch {
          setStatus('idle');
          setLastResponse('Could not transcribe audio.');
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setStatus('recording');
    } catch {
      // Mic denied
    }
  }, [status, sendQuery]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, [status]);

  const statusText = status === 'idle'
    ? 'TALK TO JOSE'
    : status === 'recording'
    ? 'LISTENING...'
    : status === 'thinking'
    ? 'THINKING...'
    : 'SPEAKING...';

  const ringColor = status === 'recording'
    ? 'rgba(255,255,255,0.8)'
    : status === 'thinking'
    ? 'rgba(255,255,255,0.3)'
    : status === 'speaking'
    ? 'rgba(255,255,255,0.5)'
    : 'rgba(255,255,255,0.15)';

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-full">
      {/* Main button */}
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        disabled={status === 'thinking'}
        className="flex items-center justify-center relative"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: `2px solid ${ringColor}`,
          background: status === 'recording' ? 'rgba(255,255,255,0.08)' : 'transparent',
          cursor: 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            width: status === 'recording' ? '32px' : '40px',
            height: status === 'recording' ? '32px' : '40px',
            borderRadius: status === 'recording' ? '6px' : '50%',
            background: '#fff',
            transition: 'all 0.2s ease',
            animation: status === 'speaking' ? 'talk-pulse 1.2s infinite ease-in-out' : status === 'thinking' ? 'talk-think 2s infinite ease-in-out' : 'none',
          }}
        />
      </button>

      {/* Status + connection */}
      <div className="flex flex-col items-center gap-2">
        <span
          className="text-white text-[11px] uppercase tracking-[0.2em]"
          style={{ opacity: status === 'idle' ? 0.4 : 0.7, transition: 'opacity 0.3s ease' }}
        >
          {statusText}
        </span>
        <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Hold to speak
        </span>
        <div className="flex items-center gap-1.5" style={{ marginTop: '4px' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: connected ? '#3fb950' : '#f85149' }} />
          <span className="text-[9px] uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {connected ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Transcript / Response area */}
      <div className="flex flex-col items-center gap-3 text-center voice-response-area" style={{ minHeight: '80px', maxWidth: '18vw' }}>
        {lastTranscript && status !== 'idle' && (
          <p className="text-[11px] italic" style={{ color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            &ldquo;{lastTranscript}&rdquo;
          </p>
        )}
        {lastResponse && status === 'idle' && (
          <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6 }}>
            {lastResponse.length > 150 ? lastResponse.slice(0, 150) + '...' : lastResponse}
          </p>
        )}

        {/* Prompt suggestions */}
        {!lastResponse && status === 'idle' && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.18)' }}>
              Try asking
            </span>
            {[
              'What kind of AI work do you do?',
              'Tell me about yourself',
              'What are you working on?',
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendQuery(prompt)}
                className="text-center text-[11px] transition-opacity"
                style={{ color: 'rgba(255,255,255,0.3)', cursor: 'none', background: 'none', border: 'none', padding: 0, fontFamily: 'inherit' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
              >
                &ldquo;{prompt}&rdquo;
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes talk-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
        @keyframes talk-think {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(0.85); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
