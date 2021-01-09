import React, { useMemo } from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "../../../../../../utils/request";
import { API_URL, getSession } from "../../../../../../utils/api";
import { Project, ProjectFile, SlugName, Version } from "../../../../../../interfaces";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import filesize from "filesize";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";
import Download from "../../../../../../components/icons/Download";
import Link from "next/link";
import { FormattedDistanceTime } from "../../../../../../utils/dynamic";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

import DownloadLink from "../../../../../../components/ui/DownloadLink";
import Select from "react-select";
import { reactSelectStyle } from "../../../../../../utils/theme";
import Pagination, { buildURL } from "../../../../../../components/misc/Pagination";
import { useRouter } from "next/router";

export default function Files({ project, files, currentSort, sorts, page, fileCount }: {
    project: Project; files: ProjectFile[]; sorts: SlugName[];
    currentSort: string;
    page: number;
    fileCount: number;

}): JSX.Element {

    const router = useRouter();
    const maxPage = Math.ceil(fileCount / 20);

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
        files.map(file => file.gameVersions).forEach((value) => {
            value.forEach(value1 => {
                if (versions.indexOf(value1) === -1)
                    versions.push(value1);
            });
        });
        return versions;
    }, files);




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
                                <label htmlFor={`sort`} className={`flex-none my-auto mr-1`}>
                                    Sort
                                </label>
                                <div className={"relative my-auto flex-grow ml-1"}>
                                    <Select
                                        isSearchable={true}
                                        inputId="sort"
                                        defaultValue={{ value: getSortFromCurrent().slug, label: getSortFromCurrent().name }}
                                        options={sorts.map((value) => {
                                            return { value: value.slug, label: value.name };
                                        })}
                                        styles={reactSelectStyle}
                                        onChange={(e: any) => {
                                            const newUrl = buildURL({
                                                page: page,
                                                sort: e.value,
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
                            <div className={`flex hidden`}>
                                <label htmlFor={`sort`} className={`flex-none my-auto mr-1`}>
                                    Game version
                                </label>
                                <div className={"relative my-auto flex-grow ml-1"}>
                                    <Select
                                        isClearable={true}
                                        isSearchable={true}
                                        inputId="gameVersion"
                                        options={gameVersions.map(value => {
                                            return { value: value.version, label: value.version };
                                        })}
                                        styles={reactSelectStyle}
                                        placeholder={`Select version`}
                                        onChange={(e: any) => {
                                            // const newUrl = buildURL({
                                            //     page: page,
                                            //     sort: e.value
                                            // });
                                            // router.push(
                                            //     `/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files${newUrl}`,
                                            //     `/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files${newUrl}`,
                                            //     { shallow: false }
                                            // );
                                        }}
                                        classNamePrefix={"select"}
                                    />
                                </div>
                            </div>
                            <div className={`my-auto col-start-4`}>
                                <Pagination
                                    maxPage={maxPage}
                                    page={page}
                                    asBuilder={(pageIndex: number) => {
                                        const newUrl = buildURL({
                                            page: pageIndex,
                                            sort: currentSort,
                                            defaultSort: "new"
                                        });
                                        return `/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files${newUrl}`;
                                    }}
                                    hrefBuilder={(pageIndex: number) => {
                                        const newUrl = buildURL({
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
                                            <Download className={`fill-current mx-auto hidden lg:block`} width={"1rem"} height={"1rem"} />
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {files.map((value) => {
                                        return (
                                            <Tr key={value.id} className={`table-body-row-diluv`}>
                                                <Td className={`table-data-diluv`}>
                                                    <Link href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files/${value.id}`}>
                                                        <a className={`cursor-pointer hover:text-diluv-600 dark-hover:text-diluv-500`}>
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
                                                <Td className={`table-data-diluv`}>
                                                    <pre>{filesize(value.size)}</pre>
                                                </Td>
                                                <Td className={`table-data-diluv`}>{value.releaseType}</Td>
                                                <Td className={`table-data-diluv`}>
                                                    <FormattedDistanceTime start={value.createdAt} />
                                                </Td>
                                                <Td className={`table-data-diluv`}>
                                                    {value.downloads}
                                                </Td>
                                                <Td className={`table-data-diluv td-full`}>
                                                    <DownloadLink url={value.downloadURL} className={`hover:text-diluv-600 dark-hover:text-diluv-500 cursor-pointer block px-2 py-3`}>
                                                        <Download className={`fill-current mx-auto hidden lg:block`} width={"1rem"} height={"1rem"} />
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
    let { GameSlug, ProjectType, ProjectSlug, sort = "", page = 1 } = context.query;
    page = Number(page);

    const params = new URLSearchParams();
    if (page) {
        params.append("page", `${page}`);
    }
    if (sort) {
        params.append("sort", `${sort}`);
    }

    params.sort();

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/games/${GameSlug}/${ProjectType}/${ProjectSlug}/files${params.toString() ? `?${params.toString()}` : ``}`, { session });
    page = Math.min(Math.ceil(data.data.fileCount / 20), Math.max(1, page));

    return {
        props: {
            project: data.data.project,
            files: data.data.files,
            session,
            currentSort: sort.length ? sort : "new",
            sorts: data.data.sorts,
            page,
            fileCount: data.data.fileCount
        } // will be passed to the page component as props
    };
};
