import * as React from 'react'
import {NextPage} from 'next'
import Layout from '../../../../components/Layout'
import {Project} from "../../../../interfaces";
import {getProjectByGameSlugAndProjectTypeSlugAndProjectSlug} from "../../../../utils/projects";
import ProjectComponent from '../../../../components/project/ProjectComponent'
import ProjectOverviewComponent from "../../../../components/project/ProjectOverviewComponent";

type Props = {
  gameSlug: string
  projectTypesSlug: string
  projectSlug: string
  project: Project
}

const ProjectOverviewPage: NextPage<Props> = ({gameSlug, projectTypesSlug, projectSlug, project}) =>
  (
    <Layout title={project.name + " | Diluv"}>
      <ProjectComponent activeKey={''}
                        gameSlug={gameSlug}
                        projectTypesSlug={projectTypesSlug}
                        projectSlug={projectSlug}
                        project={project}>
        <ProjectOverviewComponent description={project.description}/>
      </ProjectComponent>
    </Layout>
  );

ProjectOverviewPage.getInitialProps = async ({query: {game_slug, project_types_slug, project_slug}}) => {
  const gameSlug = Array.isArray(game_slug) ? game_slug[0] : game_slug;
  const projectTypesSlug = Array.isArray(project_types_slug) ? project_types_slug[0] : project_types_slug;
  const projectSlug = Array.isArray(project_slug) ? project_slug[0] : project_slug;
  const project = await getProjectByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug, projectTypesSlug, projectSlug);
  return {gameSlug, projectTypesSlug, projectSlug, project};
};

export default ProjectOverviewPage
