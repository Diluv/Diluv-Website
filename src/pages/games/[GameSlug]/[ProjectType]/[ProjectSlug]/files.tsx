import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { get, getAuthed } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { HasSession, HasTheme, Project, ProjectFile } from "../../../../../interfaces";
import ProjectInfo from "../../../../../components/project/ProjectInfo";
import filesize from "filesize";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";
import SimpleBar from "simplebar-react";
import { getTheme } from "../../../../../utils/theme";
import Download from "../../../../../components/icons/Download";
import formatDistance from "date-fns/formatDistance";
// @ts-ignore
import { getSession } from "next-auth/client";

export default function Files({ project, files, theme, session }: { project: Project, files: ProjectFile[] } & HasTheme & HasSession) {
    return (
        <Layout title={project.name} theme={theme} session={session}>
            <>
                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <ProjectInfo project={project} pageType={"files"}/>
                    <div id={"pageContent"}>
                        <div className={`py-4`}>
                            <SimpleBar autoHide={false} className={`py-2`}>
                                <table className={`table-auto w-full border dark:border-dark-700  cursor-default`}>
                                    <thead>
                                    <tr className={`border bg-gray-100 dark:bg-dark-800 dark:border-dark-700`}>
                                        <th className={`border dark:border-dark-700 px-2 py-2`}>
                                            Name
                                        </th>
                                        <th className={`border dark:border-dark-700 px-2 py-2`}>
                                            Game Versions
                                        </th>
                                        <th className={`border dark:border-dark-700 px-2 py-2`}>
                                            Size
                                        </th>
                                        <th className={`border dark:border-dark-700 px-2 py-2`}>
                                            Status
                                        </th>
                                        <th className={`border dark:border-dark-700 px-2 py-2`}>
                                            Date
                                        </th>
                                        <th className={`border dark:border-dark-700 px-2 py-2`}>
                                            <Download className={`fill-current mx-auto`} width={"1rem"} height={"1rem"}/>
                                        </th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {files.map(value => {
                                        return <tr className={`odd:bg-white even:bg-diluv-100 dark-odd:bg-black dark-even:bg-dark-850`}
                                                   key={value.id}>
                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                <pre>{value.name}</pre>
                                            </td>

                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                {value.releaseType}
                                            </td>
                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                            <span>
                                            {value.gameVersions.length ? value.gameVersions[0].version : "NA"}
                                            </span>
                                                {value.gameVersions.length > 1 ?
                                                    <Tippy content={
                                                        <div
                                                            className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
                                                            <span>Supported versions:</span>
                                                            {value.gameVersions.map(value1 => <p key={value1.version}>{value1.version}</p>)}
                                                        </div>} followCursor={true} plugins={[followCursor]} duration={0} hideOnClick={false}>
                                                        <div className={`inline-flex`}>
                                                            <span
                                                                className={`ml-2 py-1 px-2 border bg-gray-100 dark:bg-dark-800 dark:border-dark-700 cursor-default`}>{`+ ${value.gameVersions.length} more`}</span>
                                                        </div>
                                                    </Tippy>

                                                    : <></>}

                                            </td>
                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                <pre>{filesize(value.size)}</pre>
                                            </td>
                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                {formatDistance(new Date(value.createdAt), new Date(), { addSuffix: true })}
                                            </td>
                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                <a href={value.downloadURL}
                                                   className={`hover:text-diluv-600 dark-hover:text-diluv-500 cursor-pointer`} download={true}>
                                                    <Download className={`fill-current mx-auto`} width={"1rem"} height={"1rem"}/>
                                                </a>
                                            </td>
                                        </tr>;
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


export async function getServerSideProps(context: NextPageContext) {
    let theme = getTheme(context);
    let { GameSlug, ProjectType, ProjectSlug } = context.query;

    let session = (await getSession(context));
    let data = await getAuthed(`${API_URL}/v1/site/games/${GameSlug}/${ProjectType}/${ProjectSlug}/files`, { session: session });
    return {
        props: { theme, project: data.data.project, files: data.data.files, session: session ?? null } // will be passed to the page component as props
    };
}