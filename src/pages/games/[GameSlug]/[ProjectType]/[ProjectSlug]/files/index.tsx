import React, { FC, ReactNode } from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "../../../../../../utils/request";
import { API_URL, getSession } from "../../../../../../utils/api";
import { Project, ProjectFile } from "../../../../../../interfaces";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import filesize from "filesize";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";
import SimpleBar from "simplebar-react";
import Download from "../../../../../../components/icons/Download";
import Link from "next/link";
import { FormattedDistanceTime } from "../../../../../../utils/dynamic";
import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from "../../../../../../components/ui/Table";
import DownloadLink from "../../../../../../components/ui/DownloadLink";

export default function Files({ project, files }: { project: Project; files: ProjectFile[] }): JSX.Element {
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
                    <ProjectInfo project={project} pageType={"files"}/>
                    <div id={"pageContent"}>
                        <div className={`py-4`}>
                            <SimpleBar autoHide={false} className={`py-2`}>
                                <Table>
                                    <TableHead>
                                        <TableHeader>Name</TableHeader>
                                        <TableHeader>Game Versions</TableHeader>
                                        <TableHeader>Size</TableHeader>
                                        <TableHeader>Status</TableHeader>
                                        <TableHeader>Date</TableHeader>
                                        <TableHeader>Downloads</TableHeader>
                                        <TableHeader>
                                            <Download className={`fill-current mx-auto`} width={"1rem"} height={"1rem"}/>
                                        </TableHeader>
                                    </TableHead>
                                    <TableBody>
                                        {files.map((value) => {
                                            return (
                                                <TableRow key={value.id}>
                                                    <TableData>
                                                        <Link href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files/${value.id}`}>
                                                            <a className={`cursor-pointer hover:text-diluv-600 dark-hover:text-diluv-500`}>
                                                                <pre>{value.name}</pre>
                                                            </a>
                                                        </Link>
                                                    </TableData>
                                                    <TableData>
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
                                                    </TableData>
                                                    <TableData>
                                                        <pre>{filesize(value.size)}</pre>
                                                    </TableData>
                                                    <TableData>{value.releaseType}</TableData>
                                                    <TableData>
                                                        <FormattedDistanceTime start={value.createdAt}/>
                                                    </TableData>
                                                    <TableData>
                                                        {value.downloads}
                                                    </TableData>
                                                    <TableData>
                                                        <DownloadLink url={value.downloadURL}>
                                                            <Download className={`fill-current mx-auto`} width={"1rem"} height={"1rem"}/>
                                                        </DownloadLink>
                                                    </TableData>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </SimpleBar>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/games/${GameSlug}/${ProjectType}/${ProjectSlug}/files`, { session });
    return {
        props: { project: data.data.project, files: data.data.files, session } // will be passed to the page component as props
    };
};
