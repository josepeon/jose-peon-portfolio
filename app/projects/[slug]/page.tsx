import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { mediaManifest } from '@/data/media-manifest';
import ProjectGallery from '@/components/ProjectGallery';

interface ProjectMedia {
  src: string;
  type: 'image' | 'video';
  name: string;
}

async function getProjectMedia(imagesFolder: string): Promise<ProjectMedia[]> {
  const R2_URL = process.env.NEXT_PUBLIC_R2_URL || 'https://pub-0b2b9e3ab0ff4761b7390f8e8e5e0286.r2.dev';
  const files = mediaManifest[imagesFolder] || [];

  const mediaExtensions = {
    image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG'],
    video: ['.mp4', '.mov', '.webm'],
  };

  return files
    .map(file => {
      const ext = file.slice(file.lastIndexOf('.')).toLowerCase();
      const type: 'image' | 'video' = mediaExtensions.image.includes(ext) ? 'image' : 'video';
      
      const src = `${R2_URL}/scenes-examples/${encodeURIComponent(imagesFolder)}/${encodeURIComponent(file)}`;
      
      return {
        src,
        type,
        name: file,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  const allMedia = project.imagesFolder ? await getProjectMedia(project.imagesFolder) : [];

  // Filter out hero media from gallery and get hero source
  const heroMedia = project.heroMedia
    ? allMedia.find(m => m.name === project.heroMedia)
    : undefined;
  const media = project.heroMedia
    ? allMedia.filter(m => m.name !== project.heroMedia)
    : allMedia;

  return (
    <ProjectGallery project={project} media={media} heroMedia={heroMedia} />
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
