export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  embedUrl?: string;
  splineScene?: string;
  digitalTwin?: boolean;
  sampleGifs?: { src: string; label: string }[];
  handle: string;
  topLeftText: string[];
  bottomLeftText: string;
  year: string;
  /** Repo creation date, "Mon YYYY". Shown top-right; falls back to year. */
  created?: string;
  slug: string;
  /** When true, omit from the home page list but keep /projects/<slug> reachable. */
  hideFromHome?: boolean;
}
