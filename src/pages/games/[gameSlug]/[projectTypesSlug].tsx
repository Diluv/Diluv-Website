import React, { useState } from 'react';

import { NextPageContext } from 'next';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { Game, Project, ProjectType } from '../../../interfaces';
import { getProjectsByGameSlugAndProjectTypeSlug, getProjectTypesByGameSlugAndProjectTypeSlug } from '../../../utils/projects';
import ProjectCard from '../../../components/project/ProjectCard';
import { getGamesBySlug } from "../../../utils/games";
import DropDown, { DropDownItem } from "../../../components/Dropdown";
import { useRouter } from "next/router";

type Props = {
  game: Game
  projectType: ProjectType
  projects: Project[]
  errors?: string
  gameVersion?: string
  category?: string
};

function ProjectTypePage({
  game, projectType, projects, errors, gameVersion, category
}: Props) {
  const [showCategories, setShowingCategories] = useState(true);
  const router = useRouter();
  return (
    <Layout title="Diluv">
      <div className={"w-full h-48 bg-cover bg-center flex "} style={{ backgroundImage: "url(https://imja.red/diluv/minecraft-hero.png)" }}>
        <h1 className={"text-white text-6xl my-auto ml-auto mx-auto"}>{projectType.name}</h1>
      </div>
      <div className={"mt-4 flex flex-row"}>
        <div className={"w-3/12 lg:w-2/12 px-3 ml-auto hidden md:block"}>
          <div className={"mx-3"}>
            <div className="flex py-3">
              <div className="w-full mx-auto my-auto">
                <Link href={`/games/${game.slug}/${projectType.slug}/create`}>
                  <a className="btn-diluv text-center">
                    Create Project
                  </a>
                </Link>
              </div>
            </div>
            <div className={"flex flex-row mb-2"}>
              <label htmlFor={"gameVersionSelect"} className={"text-center w-3/4 my-auto"}>Game Version:</label>
              <select defaultValue={gameVersion ? gameVersion : "all"} id={"gameVersionSelect"} className={"my-auto w-1/4 bg-transparent focus:outline-none focus:shadow-outline appearance-none py-2 px-2 block w-full text-black"} onChange={async event => {
                if (event.target.value !== "all") {
                  await router.push(location.pathname + "?gameVersion=" + event.target.value);
                }else{
                  await router.push(location.pathname);
                }
              }}>
                <option value={"all"}>
                  All versions
                </option>
                <option value={"1.12"}>
                  1.12
                </option>
                <option value={"1.14"}>
                  1.14
                </option>
              </select>
            </div>
            <hr className={"py-2"}/>
            <p className={"text-center mb-2"} onClick={() => setShowingCategories(!showCategories)}>Categories</p>
            <hr className={"py-2"}/>
            {showCategories && <div className={"mx-3 leading-relaxed"}>
              <Link href={`?category=magic`}>
                <a className={`p-2 block hover:text-diluv-500 transition-none hover:transition-colors duration-100 ease-in cursor-pointer ${category && category === "magic" ? "bg-diluv-200" : ""}`}>
                  Magic
                </a>
              </Link>
              <hr/>
              <Link href={`?category=tech`}>
                <a className={`p-2 block hover:text-diluv-500 transition-none hover:transition-colors duration-100 ease-in cursor-pointer ${category && category === "tech" ? "bg-diluv-200" : ""}`}>
                  Tech
                </a>
              </Link>
            </div>}
          </div>
        </div>
        <div className="w-full px-5 md:w-6/12 mx-auto md:mx-0 md:mr-auto">

          <div>
            {projects.map((project) =>
              <React.Fragment key={project.slug}>
                <ProjectCard gameSlug={game.slug} projectTypeSlug={projectType.slug} project={project}/>
                <hr className="my-3"/>
              </React.Fragment>)}
            {errors}
          </div>
        </div>
      </div>
    </Layout>
  );
}

ProjectTypePage.getInitialProps = async ({ query: { gameSlug, projectTypesSlug, gameVersion, category } }: NextPageContext) => {
  const projectType = await getProjectTypesByGameSlugAndProjectTypeSlug(gameSlug, projectTypesSlug);
  const projects = await getProjectsByGameSlugAndProjectTypeSlug(gameSlug, projectTypesSlug);
  const game = await getGamesBySlug(gameSlug);
  console.log(gameVersion);
  console.log(category);
  return { game, projectType, projects, gameVersion, category };
};

export default ProjectTypePage;
