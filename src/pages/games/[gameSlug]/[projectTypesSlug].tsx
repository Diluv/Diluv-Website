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
      <div className={"w-full"}>
          <div style={{backgroundImage: "url(https://imja.red/diluv/minecraft-hero.png)"}} className={"bg-cover bg-center h-48"}/>
      </div>
      <div className="w-full px-5 sm:w-8/12 sm:mx-auto">
        <div className="flex py-2">
          <h1>{projectType.name}</h1>
          <div className="order-2 ml-auto my-auto">
            <Link href={`/games/${game.slug}/${projectType.slug}/create`}>
              <a className="btn-diluv">
                Create Project
              </a>
            </Link>
          </div>
        </div>
        <div>
          {projects.map((project) =>
            <React.Fragment key={project.slug}>
              <ProjectCard gameSlug={game.slug} projectTypeSlug={projectType.slug} project={project}/>
              <hr className="my-3"/>
            </React.Fragment>)}
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
