import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import fs from 'fs';
import path from 'path';
import ProjectGallery from '@/components/ProjectGallery';

interface ProjectMedia {
  src: string;
  type: 'image' | 'video';
  name: string;
}

async function getProjectMedia(imagesFolder: string): Promise<ProjectMedia[]> {
  const folderPath = path.join(process.cwd(), 'public', 'images', 'scenes-examples', imagesFolder);
  const R2_URL = process.env.NEXT_PUBLIC_R2_URL;

  try {
    const files = fs.readdirSync(folderPath);
    const mediaExtensions = {
      image: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      video: ['.mp4', '.mov', '.webm'],
    };

    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return [...mediaExtensions.image, ...mediaExtensions.video].includes(ext);
      })
      .map(file => {
        const ext = path.extname(file).toLowerCase();
        const type: 'image' | 'video' = mediaExtensions.image.includes(ext) ? 'image' : 'video';
        
        // Use R2 for production/deployment, local files for development
        const src = R2_URL 
          ? `${R2_URL}/scenes-examples/${encodeURIComponent(imagesFolder)}/${encodeURIComponent(file)}`
          : `/images/scenes-examples/${encodeURIComponent(imagesFolder)}/${encodeURIComponent(file)}`;
        
        return {
          src,
          type,
          name: file,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
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
