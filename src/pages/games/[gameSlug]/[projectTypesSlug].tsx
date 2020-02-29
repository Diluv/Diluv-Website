import React from 'react';

import { NextPageContext } from 'next';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { Project, ProjectType } from '../../../interfaces';
import { getProjectsByGameSlugAndProjectTypeSlug, getProjectTypesByGameSlugAndProjectTypeSlug } from '../../../utils/projects';
import ProjectCard from '../../../components/project/ProjectCard';

type Props = {
  gameSlug: string
  projectType: ProjectType
  projects: Project[]
  errors?: string
};

function ProjectTypePage({
  gameSlug, projectType, projects, errors,
}: Props) {
  return (
    <Layout title="Diluv">
      <div className="container mx-auto">
        <div className="flex">
          <h2 className="flex-grow text-center text-4xl font-bold pb-2">{projectType.name}</h2>
          <Link href={`/games/${gameSlug}/${projectType.slug}/create`}>
            <a
              className="btn-diluv w-auto py-2 px-4 m-4"
            >
              Create Project
            </a>
          </Link>
        </div>
        <ul>
          {projects.map((project) => <ProjectCard key={project.slug} gameSlug={gameSlug} projectTypeSlug={projectType.slug} project={project}/>)}
        </ul>
        {errors}
      </div>
    </Layout>
  );
}

ProjectTypePage.getInitialProps = async ({ query: { gameSlug, projectTypesSlug } }: NextPageContext) => {
  const projectType = await getProjectTypesByGameSlugAndProjectTypeSlug(gameSlug, projectTypesSlug);
  const projects = await getProjectsByGameSlugAndProjectTypeSlug(gameSlug, projectTypesSlug);
  return { gameSlug, projectType, projects };
};

export default ProjectTypePage;
