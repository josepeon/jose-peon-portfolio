export const resume = {
  name: 'JOSE PEON',
  title: 'AI Engineer',
  location: 'New York, NY',
  contact: '+1 786-521-5379',
  email: 'jose@oh.systems',
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
      role: 'AI Engineer & Technical Lead',
      company: 'OH Systems',
      period: '2024 – Present',
      location: 'New York, NY',
      highlights: [
        'Architected and built the O-OH Companion backend: a full speech-to-speech AI pipeline (Whisper ASR, Llama 3.3 70B, Edge TTS) with 5-layer persistent memory (Redis), partial audio streaming (50-70% faster TTFA), 39 API endpoints, and three WebSocket channels.',
        'Designed and shipped Self-Improving Agent — the canonical AI infrastructure library now shared across Digital Twin and Multi-Agent Planner. Self-play LoRA fine-tuning on Apple Silicon (MLX), multi-judge ensemble filtering, OpenAI-compatible inference server with hot-reload on model promotion, classifier-based intelligent routing trained on real outcomes, Streamlit eval dashboard, knowledge distillation pipeline, and Prometheus observability. 549 tests.',
        'Built the OH website backend and integrated Spline 3D interactive elements, Arcware cloud streaming for Unreal Engine experiences, and Shopify Storefront API for spatial commerce.',
        'Led technical strategy and team coordination across 5+ contributors for the OH platform launch, including the Nooon Showroom multiplayer spatial commerce experience in Unreal Engine.',
      ],
    },
    {
      role: 'AI & Systems Engineer',
      company: 'Nooon',
      period: '2024 – Present',
      location: 'New York, NY',
      highlights: [
        'Built AI-powered internal tools to automate documentation, workflow organization, and system logic, replacing manual processes across product lifecycle management.',
        'Engineered 3D-first garment simulation pipelines using CLO3D, reducing physical sampling iterations and enabling rapid digital prototyping before production.',
        'Designed real-time rendering pipelines (Cinema 4D + Octane) and immersive Unreal Engine environments for interactive product presentation and spatial commerce.',
        'Developed technical specifications and automated coordination systems between digital design tools and manufacturing partners.',
      ],
    },
    {
      role: 'Product Systems Engineer',
      company: 'Grailed',
      period: 'Jan 2025 – Sep 2025',
      location: 'New York, NY',
      highlights: [
        'Engineered product data pipelines and systems architecture for a high-traffic fashion marketplace processing millions of listings.',
        'Designed and implemented automated workflows for product categorization, metadata enrichment, and content validation at scale.',
        'Built internal tooling and dashboards to surface product analytics, streamline listing quality, and optimize platform operations.',
      ],
    },
    {
      role: 'Technical Product & Campaign Engineer',
      company: 'Badson',
      period: 'Sep 2023 – Apr 2025',
      location: 'New York, NY',
      highlights: [
        'Developed automated 3D rendering and asset generation pipelines using Cinema 4D, Octane, and CLO3D, reducing production time by 60%.',
        'Built computational design workflows for campaign production, integrating real-time 3D visualization with digital product development.',
        'Led end-to-end digital product architecture from concept through deployment, merging creative direction with technical systems.',
      ],
    },
    {
      role: 'AI-Driven Product Development',
      company: 'Finesse',
      period: 'Feb 2023 – Apr 2024',
      location: 'New York, NY',
      highlights: [
        'Worked at an AI-native fashion company leveraging machine learning for trend prediction and demand forecasting.',
        'Contributed to data-driven product development workflows, using computational methods to optimize design decisions and reduce waste.',
        'Built automated content generation and campaign asset pipelines, integrating digital tooling across the product lifecycle.',
      ],
    },
    {
      role: 'Digital Product Engineer',
      company: 'GOAT',
      period: 'Jan 2022 – Jun 2023',
      location: 'New York, NY',
      highlights: [
        'Designed and built digital product systems for one of the largest sneaker and apparel marketplaces globally.',
        'Created data-driven product visualization tools and automated asset pipelines for high-volume catalog operations.',
        'Developed technical specifications and digital workflows that improved cross-functional efficiency across design, engineering, and operations.',
      ],
    },
    {
      role: 'Computational Pattern Engineer',
      company: 'Mint Collaborative',
      period: 'Jun 2022 – Feb 2023',
      location: 'New York, NY',
      highlights: [
        'Applied computational methods to precision pattern engineering, bridging digital design software with physical manufacturing systems.',
        'Built digital-to-physical production pipelines using CLO3D simulation for fit validation before physical sampling.',
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
      degree: 'BFA Fashion Design',
      institution: 'Parsons School of Design, The New School',
      period: '2022 – 2026',
    },
    {
      degree: 'AI Engineering Professional Certificate',
      institution: 'IBM · Deep Learning Specialization · Applied AI',
      period: '2024 – 2026',
    },
    {
      degree: 'AI Foundations',
      institution: 'Codecademy',
      period: '2026',
    },
  ],

  certifications: [
    'IBM AI Engineering Professional Certificate (2026)',
    'IBM Deep Learning with PyTorch, Keras & TensorFlow',
    'IBM Machine Learning with Python',
    'Codecademy AI Foundations (2026)',
  ],
};
