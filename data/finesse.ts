export interface FinesseExperiment {
  id: number;
  title: string;
  subtitle: string;
  concept: string;
  howItWorks: string[];
  whyItWorks: string[];
  budget: string;
  prototypeIncludes: string[];
}

export const finesseIntro = {
  heading: 'AI EXPERIMENTS FOR FINESSE',
  description:
    'Concept explorations investigating how AI could generate brand buzz, community participation, and new fashion production systems. Each concept is designed as a rapid prototype experiment, tested with real users.',
};

export interface ProposedRole {
  id: number;
  title: string;
  overview: string;
  responsibilities: string[];
  initiatives: string[];
  impact: string;
}

export const finesseProposal = {
  heading: 'PROPOSED ROLES FOR FINESSE',
  closingNote: 'My goal with these roles is to help take creative and innovation responsibilities off your shoulders while working closely with engineering to develop new products and experiences that push FINESSE forward culturally and technologically.',
  roles: [
    {
      id: 1,
      title: 'HEAD OF AI & BRAND INNOVATION',
      overview: 'Lead the development of AI-driven initiatives that expand FINESSE\'s brand presence, product capabilities, and consumer experiences. This role sits at the intersection of brand, product, and engineering, focusing on identifying and launching new technologies and creative concepts that move the brand forward culturally and technologically.',
      responsibilities: [
        'Identify and develop new AI-powered products and experiences for the FINESSE ecosystem',
        'Lead experimental projects that explore how AI can shape fashion design, production, and consumer interaction',
        'Work closely with the engineering team to prototype and deploy new AI tools and platforms',
        'Collaborate with brand, marketing, and creative teams to integrate emerging technologies into campaigns and storytelling',
        'Translate emerging technology trends into practical initiatives for the company',
        'Help drive long-term innovation strategy across the organization',
      ],
      initiatives: [
        'AI Creator Lab (community-generated fashion design platform)',
        'AI stylist / digital twin interactions for consumers',
        'AI-powered product discovery and shopping experiences',
        'Experimental immersive brand environments',
      ],
      impact: 'This role would enable FINESSE to continuously experiment with new technologies while strengthening its position as a forward-thinking fashion brand.',
    },
    {
      id: 2,
      title: 'DIRECTOR OF AI PRODUCTS & BRAND INNOVATION',
      overview: 'Design and launch AI-driven products that enhance both the internal capabilities and external experiences of FINESSE. The role focuses on building experimental digital products while collaborating with engineering and brand teams to integrate them into the company\'s ecosystem.',
      responsibilities: [
        'Lead development of AI-powered consumer products and internal tools',
        'Prototype new technology-driven experiences quickly and test them with real audiences',
        'Work closely with engineering to translate concepts into scalable systems',
        'Identify opportunities to integrate AI into product development workflows',
        'Support brand initiatives by building interactive tools and experiences that increase engagement',
        'Evaluate emerging technologies and their potential applications for FINESSE',
      ],
      initiatives: [
        'AI conversational stylist and product recommendation system',
        'AI-assisted fashion design tools for internal teams',
        'Community-driven fashion creation platforms',
        'AI-powered personalization of digital shopping experiences',
      ],
      impact: 'This role would focus on transforming experimental ideas into real products that expand the FINESSE platform and increase user engagement.',
    },
    {
      id: 3,
      title: 'HEAD OF AI PRODUCT & INNOVATION',
      overview: 'Lead the exploration and implementation of AI technologies that accelerate product development and introduce new forms of consumer interaction. The role focuses on developing tools and platforms that enable faster experimentation and innovation across the organization.',
      responsibilities: [
        'Lead the development of AI tools that accelerate fashion design and production workflows',
        'Build experimental consumer products that combine fashion, AI, and interactive experiences',
        'Work closely with engineering to develop scalable AI systems',
        'Prototype new product concepts rapidly and test their market potential',
        'Identify opportunities where AI can create operational efficiencies or new revenue streams',
        'Help define the long-term roadmap for AI capabilities at FINESSE',
      ],
      initiatives: [
        'AI pipeline converting design concepts into technical production assets',
        'AI-generated fashion design experimentation tools',
        'Interactive digital environments for product discovery',
        'Voice-based and conversational commerce tools',
      ],
      impact: 'This role would allow FINESSE to rapidly explore emerging technologies and integrate them into both product development and consumer experiences.',
    },
  ] as ProposedRole[],
  compensation: {
    intro: 'Because the role would involve leadership across brand innovation, product development, and collaboration with engineering teams, I would be interested in a structure that reflects the strategic scope of the work.',
    baseSalary: '$160,000 – $210,000 annually',
    equity: '0.25% – 0.75% depending on scope and structure',
    alternativeIntro: 'A hybrid model combining:',
    alternativeItems: [
      'Base salary or monthly retainer',
      'Equity participation',
      'Innovation project budgets to develop experimental initiatives',
    ],
    goal: 'My main goal is to help FINESSE build meaningful new products and experiences while supporting the brand\'s long-term growth and technological leadership.',
  },
};

export const finesseExperiments: FinesseExperiment[] = [
  {
    id: 1,
    title: 'CREATOR LAB',
    subtitle: 'AI Community Fashion Platform',
    concept:
      'A platform where anyone can generate clothing concepts with AI. The most popular designs get produced by FINESSE.',
    howItWorks: [
      'Users generate a clothing design with AI',
      'System converts the design into production assets -- flats, rough measurements, draft tech pack',
      'Users publish designs on the Creator Lab feed',
      'Community votes or preorders favorites',
      'FINESSE produces the winning designs',
    ],
    whyItWorks: [
      'Transforms the audience into designers',
      'Creates viral user-generated content',
      'Generates a continuous pipeline of product ideas',
    ],
    budget: '$10K-$15K',
    prototypeIncludes: [
      'AI garment generator',
      'Voting system',
      'Leaderboard',
      'Weekly design challenges',
    ],
  },
  {
    id: 2,
    title: 'DIGITAL TWINS',
    subtitle: 'Conversational Fashion Discovery',
    concept:
      'AI-powered digital twins of fashion personalities that users can talk to for styling advice and product recommendations.',
    howItWorks: [
      'Users interact with a digital twin through voice or text',
      'Twin recommends FINESSE products in conversation',
      'Possible twins: celebrity collaborators, fashion stylists, brand characters, creative director',
    ],
    whyItWorks: [
      'Merges celebrity culture with AI',
      'Interactive and shareable',
      'Turns shopping into conversation',
    ],
    budget: '$10K',
    prototypeIncludes: [
      'Conversational AI agent',
      'Product recommendation engine',
      'Web interface',
    ],
  },
  {
    id: 3,
    title: 'FASHION AGENTS',
    subtitle: 'Interactive Shopping Personas',
    concept:
      'AI-powered fashion agents that live inside the FINESSE website or app and guide users through product discovery.',
    howItWorks: [
      'Agents appear as interactive characters that speak and emote',
      'They recommend outfits, guide through collections, answer styling questions',
      'Possible personalities: cyberpunk designer, luxury stylist, streetwear curator, edgy fashion critic',
    ],
    whyItWorks: [
      'Makes shopping interactive',
      'Adds personality to the brand',
      'Creates memorable user experiences',
    ],
    budget: '$5K-$10K',
    prototypeIncludes: [
      'Conversational AI agent',
      'Simple animated avatar',
      'Product recommendation integration',
    ],
  },
  {
    id: 4,
    title: 'AI-TO-PRODUCTION',
    subtitle: 'Accelerating Product Development',
    concept:
      'An AI system that converts generated fashion concepts into structured design assets used in production.',
    howItWorks: [
      'AI generates a garment concept',
      'Automatic conversion to garment flats, approximate measurements, draft tech packs',
      'Human validation',
      'Production candidate',
    ],
    whyItWorks: [
      'Dramatically speeds up product development',
      'Enables rapid testing of new ideas',
      'Integrates AI directly into the design pipeline',
    ],
    budget: '$5K-$10K',
    prototypeIncludes: [
      'AI concept generator',
      'Image-to-flat converter',
      'Basic tech pack generator',
    ],
  },
  {
    id: 5,
    title: 'IMMERSIVE WEBSITE',
    subtitle: 'Personalized Fashion Experiences',
    concept:
      'A website that adapts visually and stylistically to each user based on preferences and behavior.',
    howItWorks: [
      'User A sees dark cyberpunk visuals with futuristic styling',
      'User B sees minimal design with neutral palettes',
      'Powered by browsing behavior, purchase history, style questionnaires, and AI preference modeling',
    ],
    whyItWorks: [
      'Creates personalized fashion universes',
      'Increases engagement and discovery',
      'Makes the brand experience unique for each user',
    ],
    budget: '$10K-$15K',
    prototypeIncludes: [
      'Preference model',
      'Adaptive UI variations',
      'Personalized product recommendations',
    ],
  },
  {
    id: 6,
    title: 'VOICE SHOPPING',
    subtitle: 'AI Conversational Commerce',
    concept:
      'Users browse and purchase products entirely through voice interaction.',
    howItWorks: [
      'User says "Find me a black oversized jacket under $200"',
      'AI shows options, adds to cart, completes checkout -- all through voice',
    ],
    whyItWorks: [
      'Removes friction from online shopping',
      'Creates futuristic brand interaction',
      'Aligns with the rise of AI assistants',
    ],
    budget: '$5K-$10K',
    prototypeIncludes: [
      'Voice interface',
      'Product search AI',
      'Checkout integration',
    ],
  },
  {
    id: 7,
    title: 'AI FASHION WORLD',
    subtitle: 'Immersive Digital Fashion Environment',
    concept:
      'A virtual environment where users explore fashion collections, exhibitions, and creator spaces.',
    howItWorks: [
      'Users walk through digital environments',
      'Explore collections, attend virtual fashion events, discover creators and products',
      'Inspired by the intersection of gaming, fashion, and AI',
    ],
    whyItWorks: [
      'Immersive brand storytelling',
      'Highly shareable experiences',
      'Connects fashion with gaming culture',
    ],
    budget: '$15K+',
    prototypeIncludes: [
      'Small interactive environment',
      'Product showcases',
      'Social exploration mechanics',
    ],
  },
];
