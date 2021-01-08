import React, { FC, ReactNode } from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "../../../../../../utils/request";
import { API_URL, getSession } from "../../../../../../utils/api";
import { Project, ProjectFile, SlugName } from "../../../../../../interfaces";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import filesize from "filesize";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";
import Download from "../../../../../../components/icons/Download";
import Link from "next/link";
import { FormattedDistanceTime } from "../../../../../../utils/dynamic";
import { Table, Thead, Tbody, Tr, Th, Td, Table as ResponsiveTable } from "react-super-responsive-table";

import DownloadLink from "../../../../../../components/ui/DownloadLink";

export default function Files({ project, files, currentSort, sorts }: {
    project: Project; files: ProjectFile[]; sorts: SlugName[];
    currentSort: string;
}): JSX.Element {

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
            title={project.name}
            canonical={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}
            description={`${project.summary}`}
            image={`${project.logo}`}
            url={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files`}
        >
            <>
                <div className={`mx-auto w-5/6 lg:w-4/6`}>
                    <ProjectInfo project={project} pageType={"files"} />
                    <div id={"pageContent"}>
                        <div className={`py-4`}>
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
                                                        <p className={`fill-current mx-auto lg:hidden block btn btn-diluv text-center`} >Download</p>

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
    // TODO When the api returns the maxCount, re-enable this
    // page = Math.min(Math.ceil(data.data.currentType.projectCount / 20), Math.max(1, page));

    return {
        props: { project: data.data.project, files: data.data.files, session, currentSort: sort.length ? sort : "new" } // will be passed to the page component as props
    };
};
