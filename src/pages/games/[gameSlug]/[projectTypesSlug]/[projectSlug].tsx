import React from 'react';
import { NextPageContext } from 'next';
import Layout from '../../../../components/Layout';
import { Project } from '../../../../interfaces';
import { getProjectByGameSlugAndProjectTypeSlugAndProjectSlug } from '../../../../utils/projects';
import ProjectComponent from '../../../../components/project/ProjectComponent';
import ProjectOverviewComponent from '../../../../components/project/ProjectOverviewComponent';

type Props = {
  gameSlug: string
  projectTypesSlug: string
  projectSlug: string
  project: Project
};

function ProjectOverviewPage({
  gameSlug, projectTypesSlug, projectSlug, project,
}: Props) {
  return (
    <Layout title={`${project.name} | Diluv`}>
      <ProjectComponent
        activeKey=""
        project={project}
        gameSlug={gameSlug}
        projectTypesSlug={projectTypesSlug}
        projectSlug={projectSlug}>
        <ProjectOverviewComponent description={project.description}/>
      </ProjectComponent>
    </Layout>
  );
}

ProjectOverviewPage.getInitialProps = async (ctx: NextPageContext) => {
  const { gameSlug, projectTypesSlug, projectSlug } = ctx.query;
  const project = await getProjectByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug, projectTypesSlug, projectSlug);

  return {
    gameSlug, projectTypesSlug, projectSlug, project,
  };
};

export default ProjectOverviewPage;
