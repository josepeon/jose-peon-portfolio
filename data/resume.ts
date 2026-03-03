export const resume = {
  name: 'JOSE PEON',
  title: 'AI Engineer',
  location: 'New York, NY',
  email: 'josepeon@proton.me',
  github: 'github.com/josepeon',
  portfolio: 'josepeon.com',

  summary:
    'AI Engineer with production experience across voice AI pipelines, LLM fine-tuning, multi-agent orchestration, retrieval-augmented generation, and deep learning. Built end-to-end systems from model training through API deployment — including a self-play LoRA fine-tuning loop on Apple Silicon, a 5-layer memory voice companion, a RAG-powered digital twin with dual voice clones, and an 8-agent code generation pipeline. Strong background in 3D interactive experiences, creative technology, and full-stack engineering.',

  skills: {
    'Languages': ['Python', 'TypeScript', 'JavaScript'],
    'AI / ML': [
      'LLM Integration (Groq, OpenAI, Ollama, Gemini)',
      'LoRA Fine-Tuning (MLX)',
      'RAG (ChromaDB, Sentence-Transformers)',
      'PyTorch (CNN, VAE, Classification, Generation)',
      'XGBoost',
      'Whisper ASR',
      'ElevenLabs TTS',
      'Microsoft Edge TTS',
      'Prompt Engineering',
      'Multi-Agent Systems',
      'Self-Play Training',
    ],
    'Backend': [
      'FastAPI',
      'Flask',
      'WebSocket',
      'Redis',
      'REST API Design',
      'Pydantic',
      'Railway',
    ],
    'Frontend & 3D': [
      'Next.js',
      'React',
      'Streamlit',
      'Spline 3D',
      'Unreal Engine 5',
      'Open3D',
      'Plotly',
      'GSAP',
    ],
    'Infrastructure': [
      'Docker',
      'GitHub Actions CI/CD',
      'Pytest',
      'Sentry',
      'Shopify Storefront API',
      'Arcware Core',
    ],
  },

  experience: [
    {
      role: 'AI Engineer & Technical Lead',
      company: 'OH Systems',
      period: '2024 – Present',
      location: 'New York, NY',
      highlights: [
        'Architected and built the O-OH Companion backend — a full speech-to-speech AI pipeline (Whisper ASR → Llama 3.3 70B → Edge TTS) with 5-layer persistent memory (Redis), partial audio streaming (50-70% faster TTFA), 39 API endpoints, and three WebSocket channels.',
        'Designed the Self-Improving Agent infrastructure — a self-play LoRA fine-tuning loop on Apple Silicon (MLX) where the local model generates conversations and Groq 70B judges quality, with model registry lifecycle management and 92%+ test coverage across 291 tests.',
        'Built the OH website backend and integrated Spline 3D interactive elements, Arcware cloud streaming for Unreal Engine experiences, and Shopify Storefront API for spatial commerce.',
        'Led technical strategy and team coordination across 5+ contributors for the OH platform launch, including the Nooon Showroom multiplayer spatial commerce experience in Unreal Engine.',
      ],
    },
  ],

  projects: [
    {
      name: 'Digital Twin',
      tech: 'Python · FastAPI · Groq 70B · ChromaDB · ElevenLabs · RAG',
      description:
        'Personal AI twin with RAG personality engine ingesting messages from 5 platforms, few-shot priming from real conversations, automatic language/register detection, and dual ElevenLabs voice clones (English/Spanish). Deployed on Railway.',
    },
    {
      name: 'Multi-Agent Planner',
      tech: 'Python · Groq 70B · Flask · RestrictedPython · Docker · AST',
      description:
        '8-agent pipeline (Planner → Architect → Developer → QA → Integrator → TestGenerator + Documenter) that transforms natural language into production Python code. Sandboxed execution with 3 isolation strategies, 5 LLM providers, critic-feedback retries, and web UI with ZIP export.',
    },
    {
      name: 'Fashion Item Generator',
      tech: 'Python · PyTorch · FastAPI · Streamlit · CNN · Conditional VAE',
      description:
        'Deep learning toolkit: 95.1% accuracy CNN classifier (1.2M params) and conditional VAE (3.7M params) for clothing generation with SLERP latent interpolation and style transfer. Live Streamlit demo with 4 interactive modes.',
    },
    {
      name: '3D Scan Processor (Scanalyzer)',
      tech: 'Python · Streamlit · Open3D · XGBoost · Plotly · Trimesh',
      description:
        'Web tool for 3D mesh analysis computing 12+ geometric features (curvature, topology, Euler characteristic) with ML-powered (XGBoost) simplification recommendations and interactive Plotly 3D visualization. Deployed on Streamlit Cloud.',
    },
    {
      name: 'Nooon Showroom',
      tech: 'Unreal Engine 5 · Shopify API · Arcware · UMG · Multiplayer',
      description:
        'Multiplayer spatial commerce experience in Unreal Engine. Led creative direction, interior design, asset creation, and concept development. Real e-commerce transactions inside the 3D environment with 7 avatars, 9 outfits, cross-platform distribution.',
    },
  ],

  education: [
    {
      degree: 'AI Engineering — Self-Directed & Industry',
      institution: 'IBM AI Engineering Professional Certificate · Deep Learning Specialization · Applied AI',
      period: '2024 – 2026',
    },
  ],

  certifications: [
    'IBM AI Engineering Professional Certificate',
    'IBM Deep Learning with PyTorch, Keras & TensorFlow',
    'IBM Machine Learning with Python',
  ],
};
