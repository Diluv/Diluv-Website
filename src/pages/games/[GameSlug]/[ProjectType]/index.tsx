import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Layout from "components/Layout";
import React, { ChangeEvent, useState } from "react";
import { Project, ProjectType, SelectData, SlugName } from "../../../../interfaces";
import { getAuthed } from "../../../../utils/request";

import { API_URL, getSession, Session, SITE_URL } from "../../../../utils/api";
import ProjectCard from "../../../../components/project/ProjectCard";
import Search from "../../../../components/icons/Search";
import { onBlur, onFocus } from "../../../../utils/util";
import Select, { ActionMeta } from "react-select";
import { reactSelectStyle } from "../../../../utils/theme";
import { useRouter } from "next/router";
import { DebounceInput } from "react-debounce-input";
import Link from "next/link";
import Pagination, { buildURL } from "../../../../components/misc/Pagination";
import AuthorizedLink from "../../../../components/auth/AuthorizedLink";

interface Props {
    search: string;
    gameSlug: string;
    projectData: ProjectType;
    types: ProjectType[];
    projects: Project[];
    sorts: SlugName[];
    currentSort: string;
    page: number;
    version: string;
    currentTags: string[];
    session: Session | undefined | null;
}

export default function Projects({
    search,
    gameSlug,
    projectData,
    types,
    projects,
    sorts,
    currentSort,
    page,
    version,
    currentTags,
    session
}: Props): JSX.Element {
    const [selectedField, setSelectedField] = useState("");
    // Fix for < 3 search killing things
    const [displaySearch] = useState(search);

    const router = useRouter();
    const maxPage = Math.ceil(projectData.projectCount / 20);
    page = Number(page);

    function getTagsFromCurrent(): SlugName[] {
        const tagArr = [];
        for (const tag of projectData.tags) {
            if (currentTags.indexOf(tag.slug) >= 0) {
                tagArr.push(tag);
            }
        }
        return tagArr;
    }

    const [tagFilter, setTagFilter] = useState<SelectData[]>(
        getTagsFromCurrent().map((value) => {
            return { value: value.slug, label: value.name };
        })
    );

    function updateTags(newData: SelectData[]) {
        setTagFilter(newData);
        const newUrl = buildURL({
            search: search,
            page: page,
            sort: currentSort,
            version: version,
            tags: newData.map((value) => {
                return { slug: value.value, name: value.label };
            })
        });
        router.push(`/games/[GameSlug]/[ProjectType]${newUrl}`, `/games/${gameSlug}/${projectData.slug}${newUrl}`, { shallow: false });
    }

    function getSortFromCurrent(): SlugName {
        for (const sort of sorts) {
            if (sort.slug === currentSort) {
                return sort;
            }
        }
        return sorts[0];
    }

    return (
        <Layout
            title={projectData.name}
            canonical={`/games/${gameSlug}/${projectData.slug}`}
            description={`${gameSlug} ${projectData.name} | Diluv`}
            image={`${SITE_URL}/static/diluv.png`}
            url={`/games/${gameSlug}/${projectData.slug}${page > 1 ? `?page=${page}` : ``}`}
        >
            <div className={`container mx-auto`}>
                <div className={`w-11/12 mx-auto`}>
                    <div id={"header"} className={`mb-4 mt-2`}>
                        <div className={`grid my-auto justify-between grid-cols-1 sm:grid-cols-project-type-nav`}>
                            <div className={`flex flex-wrap`}>
                                {types.map((value) => {
                                    if (value.slug === projectData.slug) {
                                        return (
                                            <h1 key={value.slug} className={`text-2xl mr-3`}>
                                                {value.name}
                                            </h1>
                                        );
                                    } else {
                                        return (
                                            <Link key={value.slug} href={`/games/${gameSlug}/${value.slug}`}>
                                                <a className={`text-2xl text-hsl-500 mr-3`}>{value.name}</a>
                                            </Link>
                                        );
                                    }
                                })}
                            </div>
                            {session && (
                                <div
                                    className={`w-full sm:w-auto p-2 bg-diluv-500 hover:bg-diluv-600 cursor-pointer inline-flex text-white font-medium`}
                                >
                                    <AuthorizedLink href={`/create/games/${gameSlug}/${projectData.slug}/`} className={`mx-auto text-center`}>
                                        Create Project
                                    </AuthorizedLink>
                                </div>
                            )}
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
                                        className={`ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-opacity duration-300 ${
                                            search.trim().length ? `text-diluv-500` : ``
                                        } ${selectedField === "searchProjects" ? "opacity-0 ease-out" : "opacity-100 ease-in"}`}
                                        width={"1rem"}
                                        height={"1rem"}
                                    />
                                    <DebounceInput
                                        className={
                                            "p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 outline-none flex-grow indent-sm dark:border-dark-700 dark-hover:border-dark-600 dark-focus:border-dark-600 dark:bg-dark-800"
                                        }
                                        minLength={3}
                                        debounceTimeout={500}
                                        placeholder={"Search projects"}
                                        id={"searchProjects"}
                                        value={displaySearch}
                                        onFocus={(event: React.FocusEvent<any>) => onFocus(setSelectedField, event)}
                                        onBlur={() => onBlur(setSelectedField)}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            const newUrl = buildURL({
                                                search: event.target.value,
                                                page: page,
                                                sort: currentSort,
                                                version: version,
                                                tags: getTagsFromCurrent()
                                            });

                                            router.push(
                                                `/games/[GameSlug]/[ProjectType]${newUrl}`,
                                                `/games/${gameSlug}/${projectData.slug}${newUrl}`,
                                                { shallow: false }
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={`flex`}>
                                <label htmlFor={`filterTags`} className={`flex-none my-auto mr-1`}>
                                    Filter by tags
                                </label>
                                <div className={"my-auto flex-grow ml-1"}>
                                    <Select
                                        isClearable={true}
                                        isMulti={true}
                                        inputId="filterTags"
                                        className={`text-black`}
                                        isSearchable={true}
                                        options={projectData.tags.map((value) => {
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
                                                    for (const data of tagFilter) {
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
                                                    for (const key in tagFilter) {
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
                                        classNamePrefix={"select"}
                                    />
                                </div>
                            </div>
                            <div className={`flex`}>
                                <label htmlFor={`sort`} className={`flex-none my-auto mr-1`}>
                                    Sort
                                </label>
                                <div className={"relative my-auto flex-grow ml-1"}>
                                    <Select
                                        isSearchable={false}
                                        inputId="sort"
                                        defaultValue={{ value: getSortFromCurrent().slug, label: getSortFromCurrent().name }}
                                        options={sorts.map((value) => {
                                            return { value: value.slug, label: value.name };
                                        })}
                                        styles={reactSelectStyle}
                                        onChange={(e: any) => {
                                            const newUrl = buildURL({
                                                search: search,
                                                page: page,
                                                sort: e.value,
                                                version: version,
                                                tags: getTagsFromCurrent()
                                            });
                                            router.push(
                                                `/games/[GameSlug]/[ProjectType]${newUrl}`,
                                                `/games/${gameSlug}/${projectData.slug}${newUrl}`,
                                                { shallow: false }
                                            );
                                        }}
                                        classNamePrefix={"select"}
                                    />
                                </div>
                            </div>
                            <div className={`my-auto`}>
                                <Pagination
                                    maxPage={maxPage}
                                    page={page}
                                    asBuilder={(pageIndex: number) => {
                                        const newUrl = buildURL({
                                            search: search,
                                            page: pageIndex,
                                            sort: currentSort,
                                            version: version,
                                            tags: []
                                        });
                                        return `/games/${gameSlug}/${projectData.slug}${newUrl}`;
                                    }}
                                    hrefBuilder={(pageIndex: number) => {
                                        const newUrl = buildURL({
                                            search: search,
                                            page: pageIndex,
                                            sort: currentSort,
                                            version: version,
                                            tags: []
                                        });
                                        return `/games/[GameSlug]/[ProjectType]${newUrl}`;
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div id={`projects`}>
                        {projects.map((value) => {
                            return (
                                <ProjectCard
                                    gameSlug={gameSlug}
                                    projectTypeSlug={projectData.slug}
                                    project={value}
                                    key={value.slug}
                                    tagFilter={tagFilter}
                                    setTagFilter={updateTags}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let { GameSlug, ProjectType, page = 1, sort = "", version = "", search = "", tags } = context.query;
    page = Number(page);

    const params = new URLSearchParams();
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
    const tagArr: string[] = [];
    if (tags && tags.length) {
        if (typeof tags === "string") {
            params.append("tags", tags);
            tagArr.push(tags);
        } else {
            for (const tag of tags) {
                tagArr.push(tag);
                params.append("tags", tag);
            }
        }
    }
    params.sort();
    const session = await getSession(context);
    return await getAuthed(`${API_URL}/v1/site/games/${GameSlug}/${ProjectType}/projects${params.toString() ? `?${params.toString()}` : ``}`, {
        session
    })
        .then((data) => {
            // @ts-ignore
            page = Math.min(Math.ceil(data.data.currentType.projectCount / 20), Math.max(1, page));

            return {
                props: {
                    search: search ?? ``,
                    gameSlug: GameSlug,
                    projectData: data.data.currentType,
                    types: data.data.types,
                    projects: data.data.projects,
                    sorts: data.data.sorts,
                    currentSort: sort.length ? sort : "popular",
                    page,
                    version: version ?? ``,
                    currentTags: tagArr.length ? tagArr : [],
                    session
                }
            };
        })
        .catch(() => {
            context.res?.writeHead(302, {
                "Location": `/games/${GameSlug}/`,
                "Content-Type": "text/html; charset=utf-8"
            });
            context.res?.end();
            return {
                props: {}
            };
        });
};
