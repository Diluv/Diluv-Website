import { NextPageContext } from "next";
import Layout from "components/Layout";
import React, { ChangeEvent, useState } from "react";
import { Project, ProjectType } from "../../../../interfaces";
import { get } from "../../../../utils/request";

import { API_URL } from "../../../../utils/api";
import ProjectCard from "../../../../components/project/ProjectCard";
import Search from "../../../../components/icons/Search";
import { onBlur, onFocus } from "../../../../utils/util";

export default function Projects({ gameSlug, projectData, types, projects }: { gameSlug: string, projectData: ProjectType, types: ProjectType[], projects: Project[] }) {
    let [search, setSearch] = useState("");
    let [tags, setTags] = useState("");
    const [selectedField, setSelectedField] = useState("");
    return <Layout title={"test"}>
        <div>
            <div className={`w-full lg:w-5/6 mx-auto`}>
                <div id={"header"} className={`text-center my-4 `}>
                    <h1 className={`text-3xl`}>{projectData.name}</h1>
                </div>

                <div id={`options`}>
                    <div className={`flex w-4/6 mx-auto`}>
                        <div className={`flex`}>
                            <label htmlFor={`searchProjects`} className={`flex-none my-auto`}>
                                Search
                            </label>
                            <div className={"relative my-auto flex-grow ml-1"}>
                                <Search className={`ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-opacity duration-300 ${search.trim().length ? `text-diluv-500` : `text-black`} ${selectedField === "searchProjects" ? "opacity-0 ease-out" : "opacity-100 ease-in"}`} width={"1rem"} height={"1rem"}/>
                                <input className={"p-1 bg-transparent"} type={"text"} placeholder={"Search projects"} id={"searchProjects"} style={{ textIndent: "2rem" }} onFocus={event => onFocus(
                                    setSelectedField,
                                    event)} onBlur={() => onBlur(setSelectedField)} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(
                                    event.target.value)}/>
                            </div>
                        </div>
                        <div className={`flex`}>
                            <label htmlFor={`filterTags`} className={`flex-none my-auto`}>
                                Filter by tags
                            </label>
                            <div className={"relative my-auto flex-grow ml-1"}>
                                <Search className={`ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-opacity duration-300 ${tags.trim().length ? `text-diluv-500` : `text-black`} ${selectedField === "filterTags" ? "opacity-0 ease-out" : "opacity-100 ease-in"}`} width={"1rem"} height={"1rem"}/>
                                <input className={"p-1 bg-transparent"} type={"text"} placeholder={"Filter tags"} id={"filterTags"} style={{ textIndent: "2rem" }} onFocus={event => onFocus(
                                    setSelectedField,
                                    event)} onBlur={() => onBlur(setSelectedField)} onChange={(event: ChangeEvent<HTMLInputElement>) => setTags(event.target.value)}/>
                            </div>
                        </div>
                        <div className={`flex`}>
                            <label htmlFor={`filterTags`} className={`flex-none my-auto`}>
                                Sort
                            </label>
                            <div className={"relative my-auto flex-grow ml-1"}>
                                <select className={`p-1 bg-transparent`} id={`sort`}>
                                    <option>
                                        popularity
                                    </option>
                                    <option>
                                        new
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>


                <div id={`projects`}>
                    <div className={`w-4/6 mx-auto`}>
                        {projects.map(value => {
                            return <ProjectCard gameSlug={gameSlug} projectTypeSlug={projectData.slug} project={value} key={value.slug}/>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    </Layout>;
}

export async function getServerSideProps(context: NextPageContext) {
    let { GameSlug, ProjectType, page = 0, sort = "POPULARITY", version = "" } = context.query;
    let params = new URLSearchParams();
    if (page) {
        params.set("page", `${page}`);
    }
    if (sort && (sort as string).toLowerCase() !== "popularity") {
        params.set("sort", `${sort}`);
    }
    if (version && version.length) {
        params.set("version", `${version}`);
    }
    let projectData = await get(`${API_URL}/v1/games/${GameSlug}/${ProjectType}`); // got
    let types = await get(`${API_URL}/v1/games/${GameSlug}/`); // got
    let projects = await get(`${API_URL}/v1/games/${GameSlug}/${ProjectType}/projects${params.toString() ? `?${params.toString()}` : ``}`); // got
    return { props: { gameSlug: GameSlug, projectData: projectData.data, types: types.data, projects: projects.data } };
}
