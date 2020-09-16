import React from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "../../../../../../utils/request";
import { API_URL } from "../../../../../../utils/api";
import { Project, ProjectFile } from "../../../../../../interfaces";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import filesize from "filesize";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";
import SimpleBar from "simplebar-react";
import Download from "../../../../../../components/icons/Download";
import Link from "next/link";
// @ts-ignore
import { getSession } from "next-auth/client";
import { FormattedDistanceTime } from "../../../../../../utils/dynamic";

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
                    <ProjectInfo project={project} pageType={"files"} />
                    <div id={"pageContent"}>
                        <div className={`py-4`}>
                            <SimpleBar autoHide={false} className={`py-2`}>
                                <table className={`table-auto w-full border dark:border-dark-700  cursor-default`}>
                                    <thead>
                                        <tr className={`border bg-gray-100 dark:bg-dark-800 dark:border-dark-700`}>
                                            <th className={`border dark:border-dark-700 px-2 py-2`}>Name</th>
                                            <th className={`border dark:border-dark-700 px-2 py-2`}>Game Versions</th>
                                            <th className={`border dark:border-dark-700 px-2 py-2`}>Size</th>
                                            <th className={`border dark:border-dark-700 px-2 py-2`}>Status</th>
                                            <th className={`border dark:border-dark-700 px-2 py-2`}>Date</th>
                                            <th className={`border dark:border-dark-700 px-2 py-2`}>
                                                <Download className={`fill-current mx-auto`} width={"1rem"} height={"1rem"} />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {files.map((value) => {
                                            return (
                                                <tr
                                                    className={`odd:bg-white even:bg-diluv-100 dark-odd:bg-black dark-even:bg-dark-850`}
                                                    key={value.id}
                                                >
                                                    <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                        <Link
                                                            href={`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files/[FileId]`}
                                                            as={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files/${value.id}`}
                                                        >
                                                            <a className={`cursor-pointer`}>
                                                                <pre>{value.name}</pre>
                                                            </a>
                                                        </Link>
                                                    </td>

                                                    <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                        <span className={`my-auto`}>
                                                            {value.gameVersions.length ? value.gameVersions[0].version : "NA"}
                                                        </span>
                                                        {value.gameVersions.length >= 1 ? (
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
                                                                        className={`px-2 border bg-gray-100 dark:bg-dark-800 dark:border-dark-700 cursor-default`}
                                                                    >{`+ ${value.gameVersions.length} more`}</span>
                                                                </div>
                                                            </Tippy>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </td>
                                                    <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                        <pre>{filesize(value.size)}</pre>
                                                    </td>
                                                    <td className={`border dark:border-dark-700 px-2 py-2`}>{value.releaseType}</td>
                                                    <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                        <FormattedDistanceTime start={value.createdAt} />
                                                    </td>
                                                    <td className={`border dark:border-dark-700`}>
                                                        <a
                                                            href={value.downloadURL}
                                                            className={`hover:text-diluv-600 dark-hover:text-diluv-500 cursor-pointer block px-2 py-3`}
                                                            download={true}
                                                        >
                                                            <Download className={`fill-current mx-auto`} width={"1rem"} height={"1rem"} />
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
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
    const data = await getAuthed(`${API_URL}/v1/site/games/${GameSlug}/${ProjectType}/${ProjectSlug}/files`, { session: session });
    return {
        props: { project: data.data.project, files: data.data.files, session: session ?? null } // will be passed to the page component as props
    };
};