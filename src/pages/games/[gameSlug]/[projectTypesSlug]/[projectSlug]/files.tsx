import React from 'react';
import { NextPageContext } from 'next';
import Layout from '../../../../../components/Layout';
import { Project, ProjectFiles } from '../../../../../interfaces';
import {
  getProjectByGameSlugAndProjectTypeSlugAndProjectSlug,
  getProjectFilesByGameSlugAndProjectTypeSlugAndProjectSlug,
} from '../../../../../utils/projects';
import ProjectComponent from '../../../../../components/project/ProjectComponent';
import ProjectFilesComponent from '../../../../../components/project/ProjectFilesComponent';

type Props = {
  gameSlug: string
  projectTypesSlug: string
  projectSlug: string
  project: Project
  projectFiles: ProjectFiles[]
  errors?: string
};

function ProjectFilesPage({
  project, projectFiles, gameSlug, projectTypesSlug, projectSlug,
}: Props) {
  return (
    <Layout title={`${project.name} Files | Diluv`}>
      <ProjectComponent
        activeKey="files"
        project={project}
        gameSlug={gameSlug}
        projectTypesSlug={projectTypesSlug}
        projectSlug={projectSlug}
        permissions=""
      >
        <ProjectFilesComponent projectFiles={projectFiles}/>
      </ProjectComponent>
    </Layout>
  );
}

ProjectFilesPage.getInitialProps = async ({ query: { gameSlug, projectTypesSlug, projectSlug } }: NextPageContext) => {
  const project = await getProjectByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug, projectTypesSlug, projectSlug);
  const projectFiles = await getProjectFilesByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug, projectTypesSlug, projectSlug);

  return {
    gameSlug, projectTypesSlug, projectSlug, project, projectFiles,
  };
};

export default ProjectFilesPage;
