export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  embedUrl?: string;
  splineScene?: string;
  digitalTwin?: boolean;
  handle: string;
  topLeftText: string[];
  bottomLeftText: string;
  year: string;
  slug: string;
  imagesFolder?: string;
  heroMedia?: string;
}
