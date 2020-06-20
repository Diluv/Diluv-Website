import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { get } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { HasTheme, Project, ProjectFile } from "../../../../../interfaces";
import ProjectInfo from "../../../../../components/project/ProjectInfo";
import moment from "moment";
import filesize from "filesize";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";
import SimpleBar from "simplebar-react";
import { getTheme } from "../../../../../utils/theme";

export default function Files({ project, files, theme }: { project: Project, files: ProjectFile[] } & HasTheme) {

    return (
        <Layout title={project.name} theme={theme}>
            <>
                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <ProjectInfo project={project} pageType={"files"}/>
                    <div id={"pageContent"}>
                        <div className={`py-4`}>
                            <SimpleBar autoHide={false} className={`py-2`}>
                                <table className={`table-fixed w-full border dark:border-dark-700`}>
                                    <tr className={`border bg-gray-100 dark:bg-dark-800 dark:border-dark-700`}>
                                        <th className={`border dark:border-dark-700 px-2 py-2 w-28`}>
                                            Status
                                        </th>
                                        <th className={`border dark:border-dark-700 px-2 py-2 w-64`}>
                                            Name
                                        </th>
                                        <th className={`border dark:border-dark-700 px-2 py-2 w-28`}>
                                            Size
                                        </th>
                                        <th className={`border dark:border-dark-700 px-2 py-2 w-40`}>
                                            Game Versions
                                        </th>
                                        <th className={`border dark:border-dark-700 px-2 py-2 w-28`}>
                                            Date
                                        </th>
                                    </tr>
                                    {files.map(value => {
                                        return <tr className={`even:bg-white odd:bg-diluv-100 dark-even:bg-black dark-odd:bg-diluv-900`} key={value.id}>
                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                {value.releaseType}
                                            </td>
                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                <pre>{value.name}</pre>
                                            </td>
                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                <pre>{filesize(value.size)}</pre>
                                            </td>
                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                            <span>
                                            {value.gameVersions[0].version}
                                            </span>
                                                {value.gameVersions.length > 1 ?
                                                    <Tippy content={
                                                        <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
                                                            <span>Supported versions:</span>
                                                            {value.gameVersions.map(value1 => <p key={value1.version}>{value1.version}</p>)}
                                                        </div>} followCursor={true} plugins={[followCursor]} duration={0} hideOnClick={false}>
                                                        <div className={`inline-flex`}>
                                                            <span className={`ml-2 py-1 px-2 border bg-gray-100 dark:bg-dark-800 dark:border-dark-700 cursor-default`}>{`+ ${value.gameVersions.length} more`}</span>
                                                        </div>
                                                    </Tippy>

                                                    : <></>}

                                            </td>
                                            <td className={`border dark:border-dark-700 px-2 py-2`}>
                                                {moment(value.createdAt).toNow()}
                                            </td>
                                        </tr>;
                                    })}
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

    let data = await get(`${API_URL}/v1/site/games/${GameSlug}/${ProjectType}/${ProjectSlug}/files`);
    return {
        props: { theme, project: data.data.project, files: data.data.files } // will be passed to the page component as props
    };
}