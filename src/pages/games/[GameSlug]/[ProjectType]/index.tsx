import { NextPageContext } from "next";
import Layout from "components/Layout";
import React, { ChangeEvent, useState } from "react";
import { HasTheme, Project, ProjectType, SelectData, Sort, Tag } from "../../../../interfaces";
import { get } from "../../../../utils/request";

import { API_URL } from "../../../../utils/api";
import ProjectCard from "../../../../components/project/ProjectCard";
import Search from "../../../../components/icons/Search";
import { onBlur, onFocus } from "../../../../utils/util";
import Select, { ActionMeta } from "react-select";
import { getTheme, reactSelectStyle } from "../../../../utils/theme";
import { useRouter } from "next/router";
// @ts-ignore
import ReactPaginate from "@jaredlll08/react-paginate";
import NavigationMore from "../../../../components/icons/NavigationMore";
import CheveronLeft from "../../../../components/icons/CheveronLeft";
import CheveronRight from "../../../../components/icons/CheveronRight";
import { DebounceInput } from "react-debounce-input";
import Link from "next/link";

function buildURL(search: string, page: number, sort: string, version: string, tags: Tag[]) {
    let params = new URLSearchParams();

    if (search) {
        params.append("search", search);
    }
    if (page !== 1) {
        params.append("page", page + "");
    }
    if (sort !== "popular") {
        params.append("sort", sort);
    }
    if (version) {
        params.append("version", version);
    }
    if (tags && tags.length) {
        for (let tag of tags) {
            params.append("tags", tag.slug);
        }
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
    version: string,
    currentTags: string[]
}

export default function Projects({ theme, search, gameSlug, projectData, types, projects, sorts, currentSort, page, version, currentTags }: Props & HasTheme) {
    const [selectedField, setSelectedField] = useState("");
    // Fix for < 3 search killing things
    let [displaySearch] = useState(search);

    let router = useRouter();
    let maxPage = Math.ceil(projectData.projectCount / 20);
    page = Number(page);

    function getTagsFromCurrent(): Tag[] {
        let tagArr = [];
        for (let tag of projectData.tags) {
            if (currentTags.indexOf(tag.slug) >= 0) {
                tagArr.push(tag);
            }
        }
        return tagArr;
    }

    let [tagFilter, setTagFilter] = useState<SelectData[]>(getTagsFromCurrent().map(value => {
        return { value: value.slug, label: value.name };
    }));

    function updateTags(newData: SelectData[]) {
        setTagFilter(newData);
        let newUrl = buildURL(search, page, currentSort, version, newData.map(value => {
            return { slug: value.value, name: value.label };
        }));
        router.push(`/games/[GameSlug]/[ProjectType]${newUrl}`, `/games/${gameSlug}/${projectData.slug}${newUrl}`, { shallow: false });
    }

    function getSortFromCurrent(): Sort {
        for (let sort of sorts) {
            if (sort.slug === currentSort) {
                return sort;
            }
        }
        return sorts[0];
    }


    return <Layout title={projectData.name} theme={theme}>
        <div className={`container mx-auto`}>
            <div className={`w-11/12 mx-auto`}>
                <div id={"header"} className={`mb-4 mt-2`}>
                    <div className={`grid my-auto justify-between grid-cols-project-type-nav`}>
                        <div className={`flex flex-wrap`}>
                            {types.map(value => {
                                if (value.slug === projectData.slug) {
                                    return <h1 key={value.slug} className={`text-2xl mr-3 underline`}>{value.name}</h1>;
                                } else {
                                    return <Link key={value.slug} href={`/games/[GameSlug]/[ProjectType]`} as={`/games/${gameSlug}/${value.slug}`}>

                                        <a className={`text-2xl text-hsl-500 mr-3`}>
                                            {value.name}
                                        </a>

                                    </Link>;
                                }
                            })}
                        </div>
                        <div className={`p-2 bg-diluv-500 hover:bg-diluv-600 cursor-pointer inline-flex text-white font-medium`}>
                            <span className={`mx-auto text-center`}>
                                Create Project
                            </span>
                        </div>
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
                                    className={"p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 outline-none flex-grow indent-sm text-black"}
                                    minLength={3}
                                    debounceTimeout={500}
                                    placeholder={"Search projects"} id={"searchProjects"}
                                    value={displaySearch}
                                    onFocus={(event: React.FocusEvent<any>) => onFocus(
                                        setSelectedField,
                                        event)} onBlur={() => onBlur(setSelectedField)} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    let newUrl = buildURL(event.target.value, page, currentSort, version, getTagsFromCurrent());
                                    router.push(`/games/[GameSlug]/[ProjectType]${newUrl}`, `/games/${gameSlug}/${projectData.slug}${newUrl}`, { shallow: false });
                                }}/>
                            </div>
                        </div>
                        <div className={`flex`}>
                            <label htmlFor={`filterTags`} className={`flex-none my-auto mr-1`}>
                                Filter by tags
                            </label>
                            <div className={"my-auto flex-grow ml-1"}>
                                <Select isClearable={true} isMulti={true} inputId="filterTags" className={`text-black`} isSearchable={true}
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
                                                    updateTags(newData);
                                                    break;
                                                case "remove-value":
                                                    newData = [];
                                                    for (let key in tagFilter) {
                                                        if (tagFilter[key].value !== meta.removedValue?.value) {
                                                            newData.push(tagFilter[key]);
                                                        }
                                                    }
                                                    updateTags(newData);
                                                    break;
                                                case "clear":
                                                    updateTags([]);
                                                    break;
                                                case "pop-value":
                                                    newData = newData.slice(0, newData.length - 1);
                                                    updateTags(newData);
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
                                    let newUrl = buildURL(search, page, e.value, version, getTagsFromCurrent());
                                    router.push(`/games/[GameSlug]/[ProjectType]${newUrl}`, `/games/${gameSlug}/${projectData.slug}${newUrl}`, { shallow: false });
                                }}/>

                            </div>
                        </div>
                        <div className={`my-auto`}>
                            <ReactPaginate
                                previousLabel={<CheveronLeft className={`mx-auto`} width={`1rem`} height={`1rem`}/>}
                                nextLabel={<CheveronRight className={`mx-auto`} width={`1rem`} height={`1rem`}/>}
                                breakLabel={<NavigationMore className={`mx-auto`} width={`1rem`} height={`1rem`}/>}
                                pageCount={maxPage === 0 ? 1 : maxPage}
                                marginPagesDisplayed={1}
                                initialPage={page - 1}
                                forcePage={page - 1}
                                disableInitialCallback={true}
                                pageRangeDisplayed={3}
                                containerClassName={`grid grid-cols-pagination`}
                                activeClassName={`bg-gray-400 hover:bg-gray-400 dark:bg-dark-800 dark-hover:bg-dark-800`}
                                activeLinkClassName={`block`}
                                pageClassName={`block bg-gray-200 hover:bg-gray-300 dark-hover:bg-dark-600 dark:bg-dark-700 border dark:border-dark-600 text-center`}
                                pageLinkClassName={`block py-1`}

                                previousClassName={`border dark:border-dark-600 text-center px-auto ${page === 1 || (maxPage === 0) ? `bg-white dark:bg-dark-900` : `bg-gray-200 hover:bg-gray-300 dark:bg-dark-700`}`}
                                previousLinkClassName={`block fill-current py-2`}

                                breakClassName={`block bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 border dark:border-dark-600 text-center`}
                                breakLinkClassName={`block fill-current py-2`}

                                nextClassName={`block border dark:border-dark-600 text-center ${page === maxPage ? `bg-white dark:bg-dark-900` : `bg-gray-200 hover:bg-gray-300 dark:bg-dark-700`}`}
                                nextLinkClassName={`block fill-current py-2`}
                                asBuilder={(pageIndex: number) => {
                                    if (pageIndex === 1 && maxPage === 0) {
                                        return "";
                                    }
                                    let newUrl = buildURL(search, pageIndex, currentSort, version, []);
                                    return `/games/${gameSlug}/${projectData.slug}${newUrl}`;
                                }}
                                hrefBuilder={(pageIndex: number) => {
                                    if (pageIndex === 1 && maxPage === 0) {
                                        return "";
                                    }
                                    let newUrl = buildURL(search, pageIndex, currentSort, version, []);
                                    return `/games/[GameSlug]/[ProjectType]${newUrl}`;
                                }}
                            />
                        </div>
                    </div>
                </div>


                <div id={`projects`}>
                    {projects.map(value => {
                        return <ProjectCard gameSlug={gameSlug} projectTypeSlug={projectData.slug} project={value} key={value.slug}
                                            tagFilter={tagFilter} setTagFilter={updateTags}/>;
                    })}
                </div>
            </div>
        </div>
    </Layout>;
}

export async function getServerSideProps(context: NextPageContext) {
    let theme = getTheme(context);
    let { GameSlug, ProjectType, page = 1, sort = "", version = "", search = "", tags } = context.query;
    page = Number(page);

    let params = new URLSearchParams();
    if (page) {
        params.append("page", `${page}`);
    }
    if (sort) {
        params.append("sort", `${sort}`);
    }
    if (version && version.length) {
        params.append("version", `${version}`);
    }
    if (search && search.length) {
        params.append("search", `${search}`);
    }
    let tagArr = [];
    if (tags && tags.length) {
        if (typeof tags === "string") {
            params.append("tags", tags);
            tagArr.push(tags);
        } else {
            for (let tag of tags) {
                tagArr.push(tag);
                params.append("tags", tag);
            }
        }

    }
    params.sort();
    let data = await get(`${API_URL}/v1/site/games/${GameSlug}/${ProjectType}/projects${params.toString() ? `?${params.toString()}` : ``}`); // got
    page = Math.min(Math.ceil(data.data.currentType.projectCount / 20), Math.max(1, page));
    return {
        props: {
            theme,
            search: search ?? ``,
            gameSlug: GameSlug,
            projectData: data.data.currentType,
            types: data.data.types,
            projects: data.data.projects,
            sorts: data.data.sorts,
            currentSort: sort.length ? sort : "popular",
            page: page,
            version: version.length ? version : "",
            currentTags: tagArr.length ? tagArr : []
        }
    };
}
