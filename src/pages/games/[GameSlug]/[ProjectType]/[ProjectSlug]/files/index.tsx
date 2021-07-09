import React, { ChangeEvent, useMemo, useState } from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "utils/request";
import { API_URL } from "utils/api";
import { Project, ProjectFile, SlugName, Version } from "interfaces";
import ProjectInfo from "components/project/ProjectInfo";
import filesize from "filesize";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { FormattedTimeDistance } from "utils/dynamic";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import DownloadLink from "components/ui/DownloadLink";
import Select from "react-select";
import { reactSelectStyle } from "utils/theme";
import Pagination, { buildURL } from "components/misc/Pagination";
import { useRouter } from "next/router";
import { DebounceInput } from "react-debounce-input";
import { onBlur, onFocus } from "utils/util";
import { getSession } from "next-auth/client";
import { DownloadIcon, SearchIcon } from "@heroicons/react/solid";

export default function Files({
    project,
    files,
    currentSort,
    sorts,
    page,
    fileCount,
    version,
    search
}: {
    project: Project;
    files: ProjectFile[];
    sorts: SlugName[];
    currentSort: string;
    page: number;
    fileCount: number;
    version: string;
    search: string;
}): JSX.Element {
    const router = useRouter();
    const maxPage = Math.ceil(fileCount / 20);
    // Fix for < 3 search killing things
    const [displaySearch] = useState(search);
    const [selectedField, setSelectedField] = useState("");

    function getSortFromCurrent(): SlugName {
        for (const sort of sorts) {
            if (sort.slug === currentSort) {
                return sort;
            }
        }
        return sorts[0];
    }

    const gameVersions = useMemo(() => {
        let versions: Version[] = [];
        files
            .map((file) => file.gameVersions)
            .forEach((value) => {
                value.forEach((value1) => {
                    if (versions.indexOf(value1) === -1) versions.push(value1);
                });
            });
        return versions;
    }, [files]);

    return (
        <Layout
            title={project.name}
            canonical={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}
            description={`${project.summary}`}
            image={`${project.logo}`}
            url={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}
        >
            <>
                <div className={`mx-auto w-5/6 lg:w-4/6`}>
                    <ProjectInfo project={project} pageType={"files"} />
                    <div id={`options`}>
                        <div className={`grid grid-cols-1 xl:grid-cols-file gap-4 w-full py-2`}>
                            <div className={`flex`}>
                                <label htmlFor={`searchFiles`} className={`flex-none my-auto mr-1`}>
                                    Search
                                </label>
                                <div className={"flex flex-grow my-auto ml-1"}>
                                    <SearchIcon
                                        className={`ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-opacity duration-300 ${
                                            search.trim().length ? `text-diluv-500` : ``
                                        } ${selectedField === "searchFiles" ? "opacity-0 ease-out" : "opacity-100 ease-in"}`}
                                        width={"1rem"}
                                        height={"1rem"}
                                    />
                                    <DebounceInput
                                        className={
                                            "p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 outline-none flex-grow indent-sm dark:border-dark-700 dark:hover:border-dark-600 dark:focus:border-dark-600 dark:bg-dark-800"
                                        }
                                        minLength={3}
                                        debounceTimeout={500}
                                        placeholder={"Search files"}
                                        id={"searchFiles"}
                                        value={displaySearch}
                                        onFocus={(event: React.FocusEvent<any>) => onFocus(setSelectedField, event)}
                                        onBlur={() => onBlur(setSelectedField)}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            const newUrl = buildURL({
                                                search: event.target.value,
                                                page: page,
                                                sort: currentSort,
                                                version: version,
                                                defaultSort: "new"
                                            });

                                            router.push(
                                                `/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files${newUrl}`,
                                                `/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files${newUrl}`,
                                                { shallow: false }
                                            );
                                        }}
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
                                                search: displaySearch,
                                                page: page,
                                                sort: e.value,
                                                version: version,
                                                defaultSort: "new"
                                            });
                                            router.push(
                                                `/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files${newUrl}`,
                                                `/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files${newUrl}`,
                                                { shallow: false }
                                            );
                                        }}
                                        classNamePrefix={"select"}
                                    />
                                </div>
                            </div>
                            {/* TODO make this shown when I have the data */}
                            <div className={`flex hidden`}>
                                <label htmlFor={`sort`} className={`flex-none my-auto mr-1`}>
                                    Game version
                                </label>
                                <div className={"relative my-auto flex-grow ml-1"}>
                                    <Select
                                        isClearable={true}
                                        isSearchable={true}
                                        inputId="gameVersion"
                                        options={gameVersions.map((value) => {
                                            return { value: value.version, label: value.version };
                                        })}
                                        styles={reactSelectStyle}
                                        placeholder={`Select version`}
                                        onChange={(e: any) => {
                                            const newUrl = buildURL({
                                                search: displaySearch,
                                                page: page,
                                                sort: currentSort,
                                                version: e ? e.value : ``,
                                                defaultSort: "new"
                                            });
                                            router.push(
                                                `/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files${newUrl}`,
                                                `/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files${newUrl}`,
                                                { shallow: false }
                                            );
                                        }}
                                        classNamePrefix={"select"}
                                    />
                                </div>
                            </div>
                            <div className={`my-auto xl:col-start-5`}>
                                <Pagination
                                    maxPage={maxPage}
                                    page={page}
                                    asBuilder={(pageIndex: number) => {
                                        const newUrl = buildURL({
                                            search: displaySearch,
                                            page: pageIndex,
                                            sort: currentSort,
                                            defaultSort: "new"
                                        });
                                        return `/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files${newUrl}`;
                                    }}
                                    hrefBuilder={(pageIndex: number) => {
                                        const newUrl = buildURL({
                                            search: displaySearch,
                                            page: pageIndex,
                                            sort: currentSort,
                                            defaultSort: "new"
                                        });
                                        return `/games/[GameSlug]/[ProjectType]/[GameSlug]/files${newUrl}`;
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div id={"pageContent"}>
                        <div className={`pb-4`}>
                            <Table className={`table-diluv`}>
                                <Thead>
                                    <Tr className={`table-head-row-diluv`}>
                                        <Th className={`table-head-diluv`}>Name</Th>
                                        <Th className={`table-head-diluv`}>Game Versions</Th>
                                        <Th className={`table-head-diluv`}>Size</Th>
                                        <Th className={`table-head-diluv`}>Status</Th>
                                        <Th className={`table-head-diluv`}>Date</Th>
                                        <Th className={`table-head-diluv`}>Downloads</Th>
                                        <Th className={`table-head-diluv`}>
                                            <DownloadIcon className={`fill-current mx-auto hidden lg:block`} width={"1rem"} height={"1rem"} />
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {files.map((value) => {
                                        return (
                                            <Tr key={value.id} className={`table-body-row-diluv`}>
                                                <Td className={`table-data-diluv`}>
                                                    <Link
                                                        href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files/${value.id}`}
                                                    >
                                                        <a className={`cursor-pointer hover-link`}>
                                                            <pre className={`whitespace-pre-line`}>{value.name}</pre>
                                                        </a>
                                                    </Link>
                                                </Td>
                                                <Td className={`table-data-diluv`}>
                                                    <span className={`my-auto`}>
                                                        {value.gameVersions.length ? value.gameVersions[0].version : "NA"}
                                                    </span>
                                                    {value.gameVersions.length > 1 ? (
                                                        <Tippy
                                                            content={
                                                                <div
                                                                    className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}
                                                                >
                                                                    <span>Supported versions:</span>
                                                                    {value.gameVersions.map((value1) => (
                                                                        <p key={value1.version}>{value1.version}</p>
                                                                    ))}
                                                                </div>
                                                            }
                                                            followCursor={true}
                                                            plugins={[followCursor]}
                                                            duration={0}
                                                            hideOnClick={false}
                                                        >
                                                            <div className={`inline-flex float-right`}>
                                                                <span
                                                                    className={`px-2 border bg-gray-100 dark:bg-dark-800 dark:border-dark-600 cursor-default`}
                                                                >{`+ ${value.gameVersions.length} more`}</span>
                                                            </div>
                                                        </Tippy>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Td>
                                                <Td className={`table-data-diluv text-center`}>
                                                    <pre>{filesize(value.size)}</pre>
                                                </Td>
                                                <Td className={`table-data-diluv text-center`}>{value.releaseType}</Td>
                                                <Td className={`table-data-diluv`}>
                                                    <FormattedTimeDistance start={value.createdAt} />
                                                </Td>
                                                <Td className={`table-data-diluv`}>{value.downloads}</Td>
                                                <Td className={`table-data-diluv td-full`}>
                                                    <DownloadLink url={value.downloadURL} className={`hover-link cursor-pointer block px-2 py-3`}>
                                                        <DownloadIcon
                                                            className={`fill-current mx-auto hidden lg:block`}
                                                            width={"1rem"}
                                                            height={"1rem"}
                                                        />
                                                        <p className={`fill-current mx-auto lg:hidden block btn btn-diluv text-center`}>Download</p>
                                                    </DownloadLink>
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let { GameSlug, ProjectType, ProjectSlug, sort = "", page = 1, version = "", search = "" } = context.query;
    page = Number(page);

    const params = new URLSearchParams();
    if (page) {
        params.append("page", `${page}`);
    }
    if (sort) {
        params.append("sort", `${sort}`);
    }
    if (version) {
        params.append("game_version", `${version}`);
    }
    if (search && search.length) {
        params.append("search", `${search}`);
    }

    params.sort();
    const session = await getSession(context);
    const data = await getAuthed(
        `${API_URL}/v1/games/${GameSlug}/${ProjectType}/${ProjectSlug}/files${params.toString() ? `?${params.toString()}` : ``}`,
        { session }
    );
    page = Math.min(Math.ceil(data.data.fileCount / 20), Math.max(1, page));

    return {
        props: {
            search: search ?? ``,
            project: data.data.project,
            files: data.data.files,
            session,
            currentSort: sort.length ? sort : "new",
            sorts: data.data.sorts,
            page,
            version: version ?? ``,
            fileCount: data.data.fileCount
        } // will be passed to the page component as props
    };
};
