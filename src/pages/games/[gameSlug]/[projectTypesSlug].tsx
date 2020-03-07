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
      <div className="w-full px-5 sm:w-8/12 sm:mx-auto">
        <div className="flex pt-5">
          <h1>{projectType.name}</h1>
          <div className="order-2 ml-auto">
            <Link href={`/games/${game.slug}/${projectType.slug}/create`}>
              <a className="btn-diluv">
                Create Project
              </a>
            </Link>
          </div>
        </div>
        <div>
          {projects.map((project) => 
            <>
              <ProjectCard key={project.slug} gameSlug={game.slug} projectTypeSlug={projectType.slug} project={project}/>
              <hr className="my-5"/>
            </>)}
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
