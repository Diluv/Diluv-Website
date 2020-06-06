import { NextPageContext } from "next";
import Layout from "components/Layout";
import React, { ChangeEvent, useState } from "react";
import { Project, ProjectType, SelectData, Sort } from "../../../../interfaces";
import { get } from "../../../../utils/request";

import { API_URL } from "../../../../utils/api";
import ProjectCard from "../../../../components/project/ProjectCard";
import Search from "../../../../components/icons/Search";
import { onBlur, onFocus } from "../../../../utils/util";
import Select, { ActionMeta } from "react-select";
import { reactSelectStyle } from "../../../../utils/theme";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import NavigationMore from "../../../../components/icons/NavigationMore";
import CheveronLeft from "../../../../components/icons/CheveronLeft";
import CheveronRight from "../../../../components/icons/CheveronRight";
import { DebounceInput } from "react-debounce-input";
import { type } from "os";
import Alert from "../../../../components/Alert";
import Link from "next/link";

function buildURL(search: string, page: number, sort: string, version: string) {
    let params = new URLSearchParams();

    if (search) {
        params.set("search", search);
    }

    if (page !== 1) {
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

interface Props {
    search: string
    gameSlug: string,
    projectData: ProjectType,
    types: ProjectType[],
    projects: Project[],
    sorts: Sort[],
    currentSort: string,
    page: number,
    version: string
}

export default function Projects({ search, gameSlug, projectData, types, projects, sorts, currentSort, page, version }: Props) {
    const [selectedField, setSelectedField] = useState("");
    let router = useRouter();
    let maxPage = Math.ceil(projectData.projectCount / 20);
    page = Number(page);

    let [tagFilter, setTagFilter] = useState<SelectData[]>([]);

    function getSortFromCurrent(): Sort {
        for (let sort of sorts) {
            if (sort.slug === currentSort) {
                return sort;
            }
        }
        return sorts[0];
    }

    return <Layout title={projectData.name}>
        <div className={`container mx-auto`}>
            <div className={`w-11/12 mx-auto`}>
                <div id={"header"} className={` my-4`}>
                    <div className={`grid grid-cols-auto my-auto`}>
                        {types.map(value => {
                            if (value.slug === projectData.slug) {
                                return <h1 className={`text-2xl`}>{value.name}</h1>;
                            } else {
                                return <Link href={`/games/[GameSlug]/[ProjectType]`} as={`/games/${gameSlug}/${value.slug}`}>

                                    <a className={`text-2xl text-hsl-500`}>
                                        {value.name}
                                    </a>

                                </Link>;
                            }
                        })}
                    </div>
                </div>

                <div id={`options`}>
                    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-project-4 gap-4 w-full`}>
                        <div className={`flex`}>
                            <label htmlFor={`searchProjects`} className={`flex-none my-auto mr-1`}>
                                Search
                            </label>
                            <div className={"flex flex-grow my-auto ml-1"}>
                                <Search
                                    className={`ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-opacity duration-300 ${search.trim().length ? `text-diluv-500` : `text-black`} ${selectedField === "searchProjects" ? "opacity-0 ease-out" : "opacity-100 ease-in"}`}
                                    width={"1rem"} height={"1rem"}/>
                                <DebounceInput
                                    className={"p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 outline-none flex-grow"}
                                    minLength={3}
                                    debounceTimeout={500}
                                    placeholder={"Search projects"} id={"searchProjects"}
                                    style={{ textIndent: "2rem" }} onFocus={(event: React.FocusEvent<any>) => onFocus(
                                    setSelectedField,
                                    event)} onBlur={() => onBlur(setSelectedField)} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    let newUrl = buildURL(event.target.value, page, currentSort, version);
                                    router.push(`/games/[GameSlug]/[ProjectType]${newUrl}`, `/games/${gameSlug}/${projectData.slug}${newUrl}`, { shallow: false });
                                }}/>
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
                                        value={[...tagFilter].map((value: SelectData) => {
                                            return { value: value.value, label: value.label };
                                        })}
                                        onChange={(e, meta: ActionMeta<SelectData>) => {
                                            let newData: SelectData[] = tagFilter;
                                            let valid = true;
                                            switch (meta.action) {
                                                case "select-option":
                                                    for (let data of tagFilter) {
                                                        if (data.value === meta.option?.value) {
                                                            valid = false;
                                                        }
                                                    }
                                                    if (valid)
                                                        newData = newData.concat({
                                                            value: meta.option?.value,
                                                            label: meta.option?.label
                                                        } as SelectData);
                                                    setTagFilter(newData);
                                                    break;
                                                case "remove-value":
                                                    newData = [];
                                                    for (let key in tagFilter) {
                                                        if (tagFilter[key].value !== meta.removedValue?.value) {
                                                            newData.push(tagFilter[key]);
                                                        }
                                                    }
                                                    setTagFilter(newData);
                                                    break;
                                                case "clear":
                                                    setTagFilter([]);
                                                    break;
                                                case "pop-value":
                                                    newData = newData.slice(0, newData.length - 1);
                                                    setTagFilter(newData);
                                                    break;
                                            }
                                        }}
                                        styles={reactSelectStyle}
                                />
                            </div>
                        </div>
                        <div className={`flex`}>
                            <label htmlFor={`sort`} className={`flex-none my-auto mr-1`}>
                                Sort
                            </label>
                            <div className={"relative my-auto flex-grow ml-1"}>
                                <Select isSearchable={true} inputId="sort"
                                        defaultValue={{ value: getSortFromCurrent().slug, label: getSortFromCurrent().displayName }}
                                        options={sorts.map(value => {
                                            return { value: value.slug, label: value.displayName };
                                        })}
                                        styles={reactSelectStyle} onChange={(e: any) => {
                                    let newUrl = buildURL(search, page, e.value, version);
                                    router.push(`/games/[GameSlug]/[ProjectType]${newUrl}`, `/games/${gameSlug}/${projectData.slug}${newUrl}`, { shallow: false });
                                }}/>

                            </div>
                        </div>
                        <div className={`my-auto`}>
                            <ReactPaginate
                                previousLabel={<CheveronLeft className={`mx-auto`} width={`1rem`} height={`1rem`}/>}
                                nextLabel={<CheveronRight className={`mx-auto`} width={`1rem`} height={`1rem`}/>}
                                breakLabel={<NavigationMore className={`mx-auto`} width={`1rem`} height={`1rem`}/>}
                                pageCount={maxPage}
                                marginPagesDisplayed={1}
                                initialPage={page - 1}
                                disableInitialCallback={true}
                                pageRangeDisplayed={2}
                                onPageChange={(e) => {
                                    let newUrl = buildURL(search, e.selected + 1, currentSort, version);
                                    router.push(`/games/[GameSlug]/[ProjectType]${newUrl}`, `/games/${gameSlug}/${projectData.slug}${newUrl}`, { shallow: false });
                                }}
                                containerClassName={`grid grid-cols-9-auto`}
                                activeClassName={`bg-gray-400 hover:bg-gray-400 dark:bg-gray-800 dark-hover:bg-gray-800`}
                                activeLinkClassName={`block`}
                                pageClassName={`block bg-gray-200 hover:bg-gray-300 dark-hover:bg-gray-600 dark:bg-gray-700 border dark:border-gray-600 text-center`}
                                pageLinkClassName={`block py-1`}

                                previousClassName={`border dark:border-gray-600 text-center px-auto ${page === 1 ? `bg-white dark:bg-gray-900` : `bg-gray-200 hover:bg-gray-300 dark:bg-gray-700`}`}
                                previousLinkClassName={`block fill-current py-2`}

                                breakClassName={`block bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 border dark:border-gray-600 text-center`}
                                breakLinkClassName={`block fill-current py-2`}

                                nextClassName={`block border dark:border-gray-600 text-center ${page === maxPage ? `bg-white dark:bg-gray-900` : `bg-gray-200 hover:bg-gray-300 dark:bg-gray-700`}`}
                                nextLinkClassName={`block fill-current py-2`}
                            />
                        </div>
                    </div>
                </div>


                <div id={`projects`}>
                    <div className={``}>
                        {projects.map(value => {
                            return <ProjectCard gameSlug={gameSlug} projectTypeSlug={projectData.slug} project={value} key={value.slug}
                                                tagFilter={tagFilter} setTagFilter={setTagFilter}/>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    </Layout>;
}

export async function getServerSideProps(context: NextPageContext) {
    let { GameSlug, ProjectType, page = 1, sort = "", version = "", search = "" } = context.query;
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
    if (search && search.length) {
        params.set("search", `${search}`);
    }
    let data = await get(`${API_URL}/v1/site/games/${GameSlug}/${ProjectType}/projects${params.toString() ? `?${params.toString()}` : ``}`); // got
    if (page > Math.ceil(data.data.currentType.projectCount / 20)) {
        page = Math.ceil(data.data.currentType.projectCount / 20);
    }
    return {
        props: {
            search: search ?? ``,
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