export const resume = {
  name: 'JOSE PEON',
  title: 'AI Engineer',
  location: 'New York, NY',
  contact: '+1 786-521-5379',
  email: 'josepeon1803@gmail.com',
  github: 'github.com/josepeon',
  instagram: '@josepeoon',
  portfolio: 'josepeon.co',

  summary:
    'AI Engineer with production experience across voice AI pipelines, LLM fine-tuning, multi-agent orchestration, retrieval-augmented generation, and deep learning. Built end-to-end systems from model training through API deployment, including a self-play LoRA fine-tuning loop on Apple Silicon, a 5-layer memory voice companion, a RAG-powered digital twin with dual voice clones, and an 8-agent code generation pipeline. Background in systems engineering, computational design, real-time 3D, and digital product architecture.',

  skills: {
    'Languages': ['Python', 'TypeScript', 'JavaScript'],
    'AI / ML': [
      'LLM Integration (Groq, OpenAI, Ollama, Gemini)',
      'LoRA Fine-Tuning (MLX)',
      'RAG (ChromaDB, Sentence-Transformers)',
      'PyTorch (CNN, VAE, Classification, Generation)',
      'Prompt Architecture & Agent Systems',
      'XGBoost',
      'Pandas',
      'Whisper ASR',
      'ElevenLabs TTS',
      'Microsoft Edge TTS',
      'Multi-Agent Orchestration',
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
      'CLO3D',
      'Cinema 4D',
      'Octane Render',
      'ZBrush',
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
      role: 'Founder and Creative Director',
      company: 'NOOON',
      period: 'Sep 2024 – Present',
      location: 'New York, NY · On-site',
      highlights: [
        'Founded and run a 3D-driven fashion label end to end — built the nooon.online Shopify storefront from scratch in custom Liquid, plus the full e-commerce stack and a 3D-asset and pattern-making pipeline.',
        'Direct every collection and campaign (GRDT, ComplexCon, the Converse collaboration) and the brand’s NYFW presence; press in Complex, Highsnobiety, and Office, with an MTV VMAs 2025 red-carpet moment.',
        'Lead pattern making, 3D garment design (CLO3D), and real-time rendering (Cinema 4D + Octane) across product development and editorial.',
      ],
    },
    {
      role: 'AI Engineer & Technical Lead',
      company: 'OH',
      period: 'Sep 2025 – Present',
      location: 'New York, NY · Hybrid',
      highlights: [
        'Architected and built the O-OH Companion backend: a full speech-to-speech AI pipeline (Whisper ASR, Llama 3.3 70B, Edge TTS) with 5-layer persistent memory (Redis), partial audio streaming (50-70% faster TTFA), 39 API endpoints, and three WebSocket channels.',
        'Designed and shipped Self-Improving Agent — the canonical AI infrastructure library now shared across Digital Twin and Multi-Agent Planner. Self-play LoRA fine-tuning on Apple Silicon (MLX), multi-judge ensemble filtering, OpenAI-compatible inference server with hot-reload on model promotion, classifier-based intelligent routing, eval dashboard, and Prometheus observability. 549 tests.',
        'Built the OH website backend and integrated Spline 3D interactive elements, Arcware cloud streaming for Unreal Engine experiences, and Shopify Storefront API for spatial commerce.',
        'Led technical strategy and team coordination across 5+ contributors for the OH platform launch, including the NOOON Showroom multiplayer spatial-commerce experience in Unreal Engine.',
      ],
    },
    {
      role: 'Founding AI and Brand Innovation',
      company: 'FINESSE',
      period: 'Mar 2026 – May 2026',
      location: 'New York, NY · Hybrid',
      highlights: [
        'Built the company’s applied-AI layer at an AI-native fashion startup — from model selection through product integration — alongside AI-driven product and content tooling. Returned to FINESSE, where I had previously been a 3D designer; concluded the engagement on graduation from Parsons.',
      ],
    },
    {
      role: 'Product and Campaign Development',
      company: 'Badson',
      period: 'Jan 2025 – Jun 2025',
      location: 'Remote',
      highlights: [
        'Led product and campaign development through the brand’s 2024–25 run — art direction and sample development for drops featured in Highsnobiety’s “Best of 2024” and a string of sold-out releases.',
      ],
    },
    {
      role: 'Campaign and Product Designer',
      company: 'Grailed · Contract',
      period: 'Sep 2023 – Apr 2025',
      location: 'New York, NY · Hybrid',
      highlights: [
        'Campaign and product design across multiple seasons (SS24, SS25, Team Uniform) for a major fashion marketplace — 3D scanning, product visualization, and social content.',
      ],
    },
    {
      role: '3D Designer',
      company: 'FINESSE',
      period: 'Feb 2023 – Apr 2024',
      location: 'New York, NY',
      highlights: [
        '3D design for an AI-native fashion startup — garment visualization and digital product assets across the product lifecycle.',
      ],
    },
    {
      role: 'Digital Product Designer',
      company: 'GOAT · Contract',
      period: 'Jan 2022 – Jun 2023',
      location: 'New York, NY',
      highlights: [
        'Digital product design and 3D/CGI for one of the largest sneaker and apparel marketplaces, including the Cybercore and Showroom campaigns.',
      ],
    },
    {
      role: 'Pattern Cutter',
      company: 'Mint Collaborative',
      period: 'Jun 2022 – Feb 2023',
      location: 'New York, NY',
      highlights: [
        'Pattern cutting and digital-to-physical production using CLO3D for fit validation before physical sampling.',
      ],
    },
  ],

  projects: [
    {
      name: 'Digital Twin',
      tech: 'Python · FastAPI · Groq 70B · ChromaDB · ElevenLabs · SSE · Prometheus',
      description:
        'Personal AI twin with RAG personality engine ingesting messages from 5 platforms, dual ElevenLabs voice clones (EN/ES), four persona modes that tune delivery without changing identity, OpenAI-compatible SSE streaming, OH platform agent adapter, autonomous draft queue with human approval, incremental real-time learning, and a distillation bridge that turns live conversations into local-LoRA training data. 202 tests, production on Railway.',
    },
    {
      name: 'Self-Improving Agent',
      tech: 'Python · MLX · LoRA · Groq 70B · FastAPI · Streamlit · Prometheus',
      description:
        'Canonical AI infrastructure library for the OH platform — self-play LoRA fine-tuning on Apple Silicon, multi-judge ensemble quality filtering, classifier-based intelligent routing trained on real outcomes, OpenAI-compatible inference server with model hot-reload, knowledge distillation pipeline, model registry with full lifecycle, eval dashboard, and adapter merging via weighted task-arithmetic. Now shipped as an installable package; Digital Twin and Multi-Agent Planner depend on it. 549 tests.',
    },
    {
      name: 'Multi-Agent Planner',
      tech: 'Python · Groq 70B · FastAPI · DAG Executor · Docker · E2B · AST',
      description:
        '9-agent system that turns natural language into deployed, tested, documented Python or TypeScript projects. DAG-based parallel execution with mid-run replanning, human-in-the-loop approve/edit/regenerate gates, live SSE timeline UI, project + user memory, web-search Researcher agent, best-of-N generation, four-tier sandbox (including E2B cloud), Deployer that auto-picks Railway/Streamlit/Vercel/Modal, and a modify-existing-codebase mode that produces structured diffs against any Git repo. 315 tests.',
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
      degree: "Bachelor's Degree, Fashion / Apparel Design",
      institution: 'Parsons School of Design, The New School',
      period: 'Sep 2022 – May 2026',
    },
    {
      degree: 'Phygital Designer of the Year · CFDA Design Scholar Finalist',
      institution: 'Parsons School of Design · CFDA',
      period: '2025 – 2026',
    },
  ],

  certifications: [
    'Harvard — Data Science: Building Machine Learning Models (2026)',
    'IBM AI Engineering (2026)',
    'Codecademy — Data and Programming Foundations for AI (2025)',
  ],
};
