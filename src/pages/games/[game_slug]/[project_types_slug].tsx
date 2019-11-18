import * as React from 'react'
import Layout from '../../../components/Layout'
import {NextPage} from 'next'
import {getGamesBySlug} from "../../../utils/games";
import {Game, Project, ProjectType} from "../../../interfaces";
import {getProjectsByGameSlugAndProjectTypeSlug, getProjectTypesByGameSlugAndProjectTypeSlug} from "../../../utils/projects";
import ModMedia from "../../../components/ModMedia";

type Props = {
  game?: Game
  projectType?: ProjectType
  projects?: Project[]
  errors?: string
}

const ProjectTypePage: NextPage<Props> = ({game, projectType, projects, errors}) => (
  <Layout title="Diluv">
    <div className="container pt-md-5">
      {(game && projectType && projects && (
        <React.Fragment>
          <h2 className="text-center pt-md-5">{projectType.name}</h2>
          <ul className="list-unstyled">
            {projects && projects.map((project) =>
              <React.Fragment key={project.slug}>
                <a href={`/games/${game.slug}/${projectType.slug}/${project.slug}`}>
                  <ModMedia project={project}/>
                </a>
              </React.Fragment>
            )}
          </ul>
        </React.Fragment>
      ))}
      {errors}
    </div>
  </Layout>
);

ProjectTypePage.getInitialProps = async ({query: {game_slug, project_types_slug}}) => {
  try {
    if (typeof game_slug == "string" && typeof project_types_slug == "string") {
      const game = await getGamesBySlug(game_slug);
      const projectType = await getProjectTypesByGameSlugAndProjectTypeSlug(game_slug, project_types_slug);
      const projects = await getProjectsByGameSlugAndProjectTypeSlug(game_slug, project_types_slug);
      return {game, projectType, projects};
    }
    return {errors: 'Invalid slug'}
  } catch (err) {
    return {errors: err.message}
  }
};

export default ProjectTypePage
