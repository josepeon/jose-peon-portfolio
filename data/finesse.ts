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
