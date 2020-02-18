import * as React from 'react'
import {NextPageContext} from 'next'
import Layout from '../../../../components/Layout'
import {Project} from "../../../../interfaces";
import {getProjectByGameSlugAndProjectTypeSlugAndProjectSlug} from "../../../../utils/projects";
import ProjectComponent from '../../../../components/project/ProjectComponent'
import ProjectOverviewComponent from "../../../../components/project/ProjectOverviewComponent";
import {getAccessToken} from "../../../../utils/auth";

type Props = {
  gameSlug: string
  projectTypesSlug: string
  projectSlug: string
  project: Project
  permissions: string
}

function ProjectOverviewPage({gameSlug, projectTypesSlug, projectSlug, project, permissions}: Props) {
  return (
    <Layout title={project.name + " | Diluv"}>
      <ProjectComponent activeKey={''}
                        gameSlug={gameSlug}
                        projectTypesSlug={projectTypesSlug}
                        projectSlug={projectSlug}
                        project={project}
                        permissions={permissions}>
        <ProjectOverviewComponent description={project.description}/>
      </ProjectComponent>
    </Layout>
  );
}

ProjectOverviewPage.getInitialProps = async (ctx: NextPageContext) => {

  const {game_slug, project_types_slug, project_slug} = ctx.query;

  const gameSlug = Array.isArray(game_slug) ? game_slug[0] : game_slug;
  const projectTypesSlug = Array.isArray(project_types_slug) ? project_types_slug[0] : project_types_slug;
  const projectSlug = Array.isArray(project_slug) ? project_slug[0] : project_slug;
  const project = await getProjectByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug, projectTypesSlug, projectSlug);
  //TODO get permissions for user
  const permissions = getAccessToken(ctx) ? 'all' : undefined;

  return {gameSlug, projectTypesSlug, projectSlug, project, permissions};
};

export default ProjectOverviewPage
