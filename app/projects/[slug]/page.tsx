import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectPageComponent from '@/components/ProjectPage';
import ResumePageComponent from '@/components/ResumePage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectRoute({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  if (slug === 'resume') {
    return <ResumePageComponent />;
  }

  return <ProjectPageComponent project={project} />;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
