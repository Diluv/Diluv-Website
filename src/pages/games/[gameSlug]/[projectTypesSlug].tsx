import React from 'react';

import { NextPageContext } from 'next';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { Game, Project, ProjectType } from '../../../interfaces';
import { getProjectsByGameSlugAndProjectTypeSlug, getProjectTypesByGameSlugAndProjectTypeSlug } from '../../../utils/projects';
import ProjectCard from '../../../components/project/ProjectCard';
import { getGamesBySlug } from "../../../utils/games";

type Props = {
  game: Game
  projectType: ProjectType
  projects: Project[]
  errors?: string
};

function ProjectTypePage({
  game, projectType, projects, errors,
}: Props) {
  return (
    <Layout title="Diluv">
      <div>
          <img src={"https://imja.red/diluv/minecraft-hero.png"} className={"w-full"}/>
      </div>
      <div className="w-5/6 mx-auto">
        <div className="">
          <h1 className="text-center font-bold ">{projectType.name}</h1>
        </div>
        <div className={"mb-3 mx-auto w-1/3"}>
          <Link href={`/games/${game.slug}/${projectType.slug}/create`}>
            <a className="btn-diluv text-center">
              Create Project
            </a>
          </Link>
        </div>
        <div className={"w-5/6 mx-auto"}>
          {projects.map((project) => <ProjectCard key={project.slug} gameSlug={game.slug} projectTypeSlug={projectType.slug} project={project}/>)}
          {errors}
        </div>
      </div>
    </Layout>
  );
}

ProjectTypePage.getInitialProps = async ({ query: { gameSlug, projectTypesSlug } }: NextPageContext) => {
  const projectType = await getProjectTypesByGameSlugAndProjectTypeSlug(gameSlug, projectTypesSlug);
  const projects = await getProjectsByGameSlugAndProjectTypeSlug(gameSlug, projectTypesSlug);
  const game = await getGamesBySlug(gameSlug);
  return { game, projectType, projects };
};

export default ProjectTypePage;
