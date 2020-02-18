import * as React from 'react'
import Layout from '../../../components/Layout'
import {NextPage} from 'next'
import {Project, ProjectType} from "../../../interfaces";
import {getProjectsByGameSlugAndProjectTypeSlug, getProjectTypesByGameSlugAndProjectTypeSlug} from "../../../utils/projects";
import ProjectCard from "../../../components/project/ProjectCard";
import Link from 'next/link';

type Props = {
  gameSlug: string
  projectType: ProjectType
  projects: Project[]
  errors?: string
}

const ProjectTypePage: NextPage<Props> = ({gameSlug, projectType, projects, errors}) => (
  <Layout title="Diluv">
    <div className="container mx-auto">
      <div className="flex">
        <h2 className="flex-grow text-center text-4xl font-bold pb-2">{projectType.name}</h2>
        <Link href={`/games/${gameSlug}/${projectType.slug}/create`}>
          <button className="bg-blue-700 hover:bg-blue-500 text-diluv-200 hover:text-white font-bold py-2 px-4 m-4 duration-200 ease-in">
            Create Project
          </button>
        </Link>
      </div>
      <ul>
        {projects.map((project) =>
          <ProjectCard key={project.slug} gameSlug={gameSlug} projectTypeSlug={projectType.slug} project={project}/>
        )}
      </ul>
      {errors}
    </div>
  </Layout>
);

ProjectTypePage.getInitialProps = async ({query: {game_slug, project_types_slug}}) => {
  const gameSlug = Array.isArray(game_slug) ? game_slug[0] : game_slug;
  const projectTypesSlug = Array.isArray(project_types_slug) ? project_types_slug[0] : project_types_slug;

  const projectType = await getProjectTypesByGameSlugAndProjectTypeSlug(gameSlug, projectTypesSlug);
  const projects = await getProjectsByGameSlugAndProjectTypeSlug(gameSlug, projectTypesSlug);
  return {gameSlug, projectType, projects};
};

export default ProjectTypePage
