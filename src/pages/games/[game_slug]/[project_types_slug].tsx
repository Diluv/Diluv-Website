import * as React from 'react'
import Layout from '../../../components/Layout'
import {NextPage} from 'next'
import {getGamesBySlug} from "../../../utils/games";
import {Game, Project, ProjectType} from "../../../interfaces";
import {getProjectsByGameSlugAndProjectTypeSlug, getProjectTypesByGameSlugAndProjectTypeSlug} from "../../../utils/projects";
import ModMedia from "../../../components/ModMedia";

type Props = {
  game: Game
  projectType: ProjectType
  projects: Project[]
  errors?: string
}

const ProjectTypePage: NextPage<Props> = ({game, projectType, projects, errors}) => (
  <Layout title="Diluv">
    <div className="container mx-auto">
      <h2 className="text-center text-4xl font-bold pb-2">{projectType.name}</h2>
      <ul>
        {projects.map((project) =>
          <ModMedia key={project.slug} gameSlug={game.slug} projectTypeSlug={projectType.slug} project={project}/>
        )}
      </ul>
      {errors}
    </div>
  </Layout>
);

ProjectTypePage.getInitialProps = async ({query: {game_slug, project_types_slug}}) => {
  const gameSlug = Array.isArray(game_slug) ? game_slug[0] : game_slug;
  const projectTypesSlug = Array.isArray(project_types_slug) ? project_types_slug[0] : project_types_slug;

  const game = await getGamesBySlug(gameSlug);
  const projectType = await getProjectTypesByGameSlugAndProjectTypeSlug(gameSlug, projectTypesSlug);
  const projects = await getProjectsByGameSlugAndProjectTypeSlug(gameSlug, projectTypesSlug);
  return {game, projectType, projects};
};

export default ProjectTypePage
