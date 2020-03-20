import React, { useEffect, useRef, useState } from 'react';

import { NextPageContext } from 'next';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { Game, Project, ProjectType } from '../../../interfaces';
import {
  getProjects,
  getProjectsByGameSlugAndProjectTypeSlug,
  getProjectType,
  getProjectTypesByGameSlugAndProjectTypeSlug
} from '../../../utils/projects';
import ProjectCard from '../../../components/project/ProjectCard';
import { getGamesBySlug } from "../../../utils/games";
import DropDown, { DropDownItem } from "../../../components/Dropdown";
import { useRouter } from "next/router";
import Chart from "../../../components/icons/Chart";
import Search from "../../../components/icons/Search";
import CheveronLeft from "../../../components/icons/CheveronLeft";
import CheveronRight from "../../../components/icons/CheveronRight";
import NavigationMore from "../../../components/icons/NavigationMore";

type Props = {
  projectType: ProjectType
  projects: Project[]
  errors?: string
  gameVersion?: string
  category?: string
  page?: string
};

type FilterProps = {
  gameVersion: string
  category: string
  search: string
  page: number
}

function ProjectTypePage({
  projectType, projects, errors, gameVersion, category, page
}: Props) {
  const [showCategories, setShowingCategories] = useState(true);
  const router = useRouter();
  const filter = useRef<FilterProps>({ gameVersion: "all", category: "all", search: "", page: 0 });
  const [, forceUpdate] = useState({});
  useEffect(() => {
    filter.current.gameVersion = gameVersion ?? "all";
    filter.current.category = category ?? "";
    filter.current.page = page ? parseInt(page) : 0;
    forceUpdate({});
  }, []);


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
                <Link href={`/games/${projectType.gameSlug}/${projectType.slug}/create`}>
                  <a className="btn-diluv text-center">
                    Create Project
                  </a>
                </Link>
              </div>
            </div>
            <div className={"flex flex-row mb-2"}>
              <label htmlFor={"gameVersionSelect"} className={"text-center w-3/4 my-auto font-bold"}>Game Version:</label>
              <select defaultValue={filter.current.gameVersion} id={"gameVersionSelect"}
                      className={"my-auto bg-transparent focus:outline-none focus:shadow-outline py-2 px-2 ml-2 block w-full"}
                      onChange={async event => {
                        if (event.target.value !== "all") {
                          await router.push(location.pathname + "?gameVersion=" + event.target.value);
                        } else {
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
            <p className={"text-center mb-2 font-bold"} onClick={() => setShowingCategories(!showCategories)}>Categories</p>
            <hr className={"py-2"}/>
            {showCategories && <div className={"mx-3 leading-relaxed"}>
              <Link href={`?category=magic`}>
                <a
                  className={`p-2 block hover:text-diluv-500 transition-none hover:transition-colors duration-100 ease-in cursor-pointer ${filter.current.category === "magic" ? "bg-diluv-200" : ""}`}>
                  Magic
                </a>
              </Link>
              <hr/>
              <Link href={`?category=tech`}>
                <a
                  className={`p-2 block hover:text-diluv-500 transition-none hover:transition-colors duration-100 ease-in cursor-pointer ${filter.current.category === "tech" ? "bg-diluv-200" : ""}`}>
                  Tech
                </a>
              </Link>
            </div>}
          </div>
        </div>
        <div className="w-full px-5 md:w-6/12 mx-auto md:mx-0 md:mr-auto">

          <div>
            <div className={"py-5"}>
              <div className={"flex flex-row"}>
                <div className={"flex flex-row flex-shrink"}>
                  <label className={"p-1 pr-2 my-auto font-bold"} htmlFor={"searchBox"}>Search {projectType.name}: </label>
                  <div className={"relative my-auto"}>
                    <Search className={"absolute pointer-events-none ml-2 my-2"} width={"1rem"} height={"1rem"}/>
                    <input className={"p-1 bg-transparent "} type={"text"} placeholder={"Search"} id={"searchBox"} style={{ textIndent: "1.5rem" }}/>
                  </div>
                </div>
                <div className={"items-end ml-auto"}>
                  <div className={"flex-grow"}>
                    <div className={"flex flex-row text-center justify-between "}>
                      {filter.current.page > 1 ?
                        <Link href={`?page=${Math.max(1, filter.current.page - 1)}`}>
                          <a>
                            <CheveronLeft width={"1rem"} height={"2rem"} className={"mr-1 my-auto hover:bg-diluv-300"}/>
                          </a>
                        </Link> :
                        <CheveronLeft width={"1rem"} height={"2rem"} className={"mr-1 my-auto hover:bg-diluv-300"}/>
                      }

                      <Link href={"?page=1"}>
                        <a className={"mr-1 p-1 bg-diluv-200 hover:bg-diluv-300"}>
                          1
                        </a>
                      </Link>
                      <Link href={"?page=2"}>
                        <a className={"mr-1 p-1 hover:bg-diluv-300"}>
                          2
                        </a>
                      </Link>
                      <Link href={"?page=3"}>
                        <a className={"mr-1 p-1 hover:bg-diluv-300"}>
                          3
                        </a>
                      </Link>
                      <Link href={"?page=4"}>
                        <a className={"mr-1 p-1 hover:bg-diluv-300"}>
                          4
                        </a>
                      </Link>
                      <div className={""}>
                        <NavigationMore width={"1rem"} height={"2rem"} className={"mr-1 my-auto"}/>
                      </div>
                      <div className={"mr-1 p-1 hover:bg-diluv-300"}>
                        500
                      </div>
                      <Link href={`?page=${filter.current.page + 1}`}>
                        <a>
                          <CheveronRight width={"1rem"} height={"2rem"} className={"mr-1 my-auto hover:bg-diluv-300"}/>
                        </a>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>


            </div>
            <hr className={"py-2"}/>
            {projects.map((project) =>
              <React.Fragment key={project.slug}>
                <ProjectCard gameSlug={projectType.gameSlug} projectTypeSlug={projectType.slug} project={project}/>
                <hr className="my-3"/>
              </React.Fragment>)}
            {errors}
          </div>
        </div>
      </div>
    </Layout>
  );
}

ProjectTypePage.getInitialProps = async ({ query: { gameSlug, projectTypesSlug, gameVersion, category, page } }: NextPageContext) => {
  const projectType = await getProjectType(gameSlug as string, projectTypesSlug as string);
  const projects = await getProjects(gameSlug as string, projectTypesSlug as string, page ? parseInt(page as string) : 1);
  return { projectType, projects, gameVersion, category, page };
};

export default ProjectTypePage;
