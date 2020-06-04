import { NextPageContext } from "next";
import Layout from "components/Layout";
import React, { ChangeEvent, useState } from "react";
import { Project, ProjectType } from "../../../../interfaces";
import { get } from "../../../../utils/request";

import { API_URL } from "../../../../utils/api";
import ProjectCard from "../../../../components/project/ProjectCard";
import Search from "../../../../components/icons/Search";
import { onBlur, onFocus } from "../../../../utils/util";
import Select from "react-select";
import { reactSelectStyle } from "../../../../utils/theme";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import NavigationMore from "../../../../components/icons/NavigationMore";
import CheveronLeft from "../../../../components/icons/CheveronLeft";
import CheveronRight from "../../../../components/icons/CheveronRight";
import Link from "next/link";

function buildURL(page: number, sort: string, version: string) {
    let params = new URLSearchParams();

    if (page !== 0) {
        params.set("page", page + "");
    }
    if (sort !== "POPULARITY") {
        params.set("sort", sort);
    }
    if (version) {
        params.set("version", version);
    }
    params.sort();
    if (params.toString().length) {
        return `?${params.toString()}`;
    }
    return ``;
}

function buildPageNumbers(currentPage: number, maxPages: number) {
    let numbers: number[] = [];
    let endPages = 3;
    let startPages = 2;
    if (currentPage < 4) {
        endPages = 6 - currentPage;
    } else if (currentPage > maxPages - 3) {
        startPages = 4 - currentPage;
    }

    for (let i = Math.max(currentPage - startPages, 1); i < Math.min(Number(currentPage) + endPages, maxPages + 1); i++) {
        numbers.push(i);
    }

    return numbers;
}

interface Props {
    gameSlug: string,
    projectData: ProjectType,
    types: ProjectType[],
    projects: Project[],
    sorts: string[],
    currentSort: string,
    page: number,
    version: string
}

export default function Projects({ gameSlug, projectData, types, projects, sorts, currentSort, page, version }: Props) {
    let [search, setSearch] = useState("");
    const [selectedField, setSelectedField] = useState("");
    let router = useRouter();
    let maxPage = Math.ceil(projectData.projectCount / 20);
    page = Number(page);
    return <Layout title={projectData.name}>
        <div className={`container mx-auto`}>
            <div className={`w-11/12 mx-auto`}>
                <div id={"header"} className={`text-center my-4 `}>
                    <h1 className={`text-3xl`}>{projectData.name}</h1>
                </div>

                <div id={`types`} className={`grid grid-cols-4 border-b my-2 pb-2`}>
                    {types.map(value => <Link href={`/games/[GameSlug]/[ProjectType]/`} as={`/games/minecraft-je/${value.slug}`}><a  key={value.gameSlug} className={`${value.slug === projectData.slug ? `bg-red-500` : ``}`}>{value.name}</a></Link>)}
                </div>
                <div id={`options`}>
                    <div className={`grid gap-4 w-4/6 w-full`} style={{ gridTemplateColumns: "0.25fr 0.5fr auto auto" }}>
                        <div className={`flex`}>
                            <label htmlFor={`searchProjects`} className={`flex-none my-auto mr-1`}>
                                Search
                            </label>
                            <div className={"flex flex-grow my-auto ml-1"}>
                                <Search
                                    className={`ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-opacity duration-300 ${search.trim().length ? `text-diluv-500` : `text-black`} ${selectedField === "searchProjects" ? "opacity-0 ease-out" : "opacity-100 ease-in"}`}
                                    width={"1rem"} height={"1rem"}/>
                                <input className={"p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 outline-none flex-grow"}
                                       placeholder={"Search projects"} id={"searchProjects"}
                                       style={{ textIndent: "2rem" }} onFocus={event => onFocus(
                                    setSelectedField,
                                    event)} onBlur={() => onBlur(setSelectedField)} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(
                                    event.target.value)}/>
                            </div>
                        </div>
                        <div className={`flex`}>
                            <label htmlFor={`filterTags`} className={`flex-none my-auto mr-1`}>
                                Filter by tags
                            </label>
                            <div className={"my-auto flex-grow ml-1"}>
                                <Select isClearable={true} isMulti={true} inputId="filterTags" isSearchable={true}
                                        options={projectData.tags.map(value => {
                                            return { value: value.slug, label: value.name };
                                        })}
                                        styles={reactSelectStyle}
                                />
                            </div>
                        </div>
                        <div className={`flex`}>
                            <label htmlFor={`sort`} className={`flex-none my-auto mr-1`}>
                                Sort
                            </label>
                            <div className={"relative my-auto flex-grow ml-1"}>
                                <Select isSearchable={true} inputId="sort" defaultValue={{ value: currentSort, label: currentSort }}
                                        options={sorts.map(value => {
                                            return { value: value, label: value };
                                        })}
                                        styles={reactSelectStyle} onChange={(e: any) => {
                                    router.push(`/games/[GameSlug]/[ProjectType]?sort=${e.value}`, `/games/${gameSlug}/${projectData.slug}?sort=${e.value}`, { shallow: false });
                                }}/>

                            </div>
                        </div>
                        <div className={``}>
                            <ReactPaginate
                                previousLabel={<CheveronLeft className={`mx-auto`}/>}
                                nextLabel={<CheveronRight className={`mx-auto`}/>}
                                breakLabel={<NavigationMore className={`mx-auto`}/>}
                                pageCount={maxPage}
                                marginPagesDisplayed={1}
                                initialPage={page - 1}
                                disableInitialCallback={true}
                                pageRangeDisplayed={2}
                                onPageChange={(e) => {
                                    router.push(`/games/[GameSlug]/[ProjectType]${buildURL(e.selected + 1, currentSort, version)}`, `/games/${gameSlug}/${projectData.slug}${buildURL(e.selected + 1, currentSort, version)}`, { shallow: false });
                                }}
                                containerClassName={`grid grid-cols-9-auto`}
                                activeClassName={`bg-gray-400 hover:bg-gray-400 dark:bg-gray-800 dark-hover:bg-gray-800`}
                                activeLinkClassName={`block`}
                                pageClassName={` block bg-gray-200 hover:bg-gray-300 dark-hover:bg-gray-600 dark:bg-gray-700 border dark:border-gray-600 text-center`}
                                pageLinkClassName={`block py-2`}
                                nextClassName={`border dark:border-gray-600 text-center px-auto ${page === maxPage ? `bg-white dark:bg-gray-900` : `bg-gray-200 hover:bg-gray-300 dark:bg-gray-700`}`}
                                nextLinkClassName={`mx-auto fill-current py-2 `}
                                previousClassName={`border dark:border-gray-600 text-center ${page === 1 ? `bg-white dark:bg-gray-900` : `bg-gray-200 hover:bg-gray-300 dark:bg-gray-700`}`}
                                previousLinkClassName={`block fill-current py-2 `}
                                breakClassName={`bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 border dark:border-gray-600 text-center`}
                                breakLinkClassName={`block fill-current py-2 `}
                            />
                        </div>
                    </div>
                </div>


                <div id={`projects`}>
                    <div className={``}>
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
    let { GameSlug, ProjectType, page = 1, sort = "", version = "" } = context.query;
    let params = new URLSearchParams();
    if (page) {
        params.set("page", `${page}`);
    }
    if (sort) {
        params.set("sort", `${sort}`);
    }
    if (version && version.length) {
        params.set("version", `${version}`);
    }
    let data = await get(`${API_URL}/v1/site/games/${GameSlug}/${ProjectType}/projects${params.toString() ? `?${params.toString()}` : ``}`); // got
    if (page > Math.ceil(data.data.currentType.projectCount / 20)) {
        page = Math.ceil(data.data.currentType.projectCount / 20);
    }
    return {
        props: {
            gameSlug: GameSlug,
            projectData: data.data.currentType,
            types: data.data.types,
            projects: data.data.projects,
            sorts: data.data.sorts,
            currentSort: sort.length ? sort : "POPULARITY",
            page: page,
            version: version.length ? version : ""
        }
    };
}
