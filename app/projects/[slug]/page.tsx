import { notFound, redirect } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectPageComponent from '@/components/ProjectPage';
import ResumePageComponent from '@/components/ResumePage';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectRoute({ params }: PageProps) {
  const { slug } = await params;

  // Keep this legacy project URL alive while preserving josepeon.co as the visible domain.
  if (slug === 'parsons-homework') {
    redirect('/parsons-homework');
  }

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
  return [
    ...projects.map((project) => ({
      slug: project.slug,
    })),
    { slug: 'parsons-homework' },
  ];
}
