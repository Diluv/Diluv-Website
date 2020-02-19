import * as React from 'react'
import {NextPage} from 'next'
import Layout from '../../../../../components/Layout'
import {Project, ProjectFiles} from "../../../../../interfaces";
import {
  getProjectByGameSlugAndProjectTypeSlugAndProjectSlug,
  getProjectFilesByGameSlugAndProjectTypeSlugAndProjectSlug
} from "../../../../../utils/projects";
import ProjectComponent from '../../../../../components/project/ProjectComponent'
import ProjectFilesComponent from "../../../../../components/project/ProjectFilesComponent";

type Props = {
  gameSlug: string
  projectTypesSlug: string
  projectSlug: string
  project: Project
  projectFiles: ProjectFiles[]
  errors?: string
}

const ProjectFilesPage: NextPage<Props> = ({project, projectFiles, gameSlug, projectTypesSlug, projectSlug, errors}) => (
  <Layout title={project.name + " Files | Diluv"}>
    <ProjectComponent activeKey='files'
                      project={project}
                      gameSlug={gameSlug}
                      projectTypesSlug={projectTypesSlug}
                      projectSlug={projectSlug}
                      permissions={""}>
      <ProjectFilesComponent projectFiles={projectFiles}/>
    </ProjectComponent>
    {errors}
  </Layout>
);

ProjectFilesPage.getInitialProps = async ({query: {game_slug, project_types_slug, project_slug}}) => {
  const gameSlug = Array.isArray(game_slug) ? game_slug[0] : game_slug;
  const projectTypesSlug = Array.isArray(project_types_slug) ? project_types_slug[0] : project_types_slug;
  const projectSlug = Array.isArray(project_slug) ? project_slug[0] : project_slug;

  const project = await getProjectByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug, projectTypesSlug, projectSlug);
  const projectFiles = await getProjectFilesByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug, projectTypesSlug, projectSlug);

  return {gameSlug, projectTypesSlug, projectSlug, project, projectFiles};
};

export default ProjectFilesPage
