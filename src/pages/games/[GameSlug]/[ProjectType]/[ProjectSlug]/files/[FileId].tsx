import React from "react";
import Layout from "components/Layout";
import { Project, ProjectFile } from "../../../../../../interfaces";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import filesize from "filesize";
import SimpleBar from "simplebar-react";
// @ts-ignore
import { FormattedDistanceTime } from "../../../../../../utils/dynamic";
import Link from "next/link";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { API_URL } from "../../../../../../utils/api";
import { getAuthed } from "../../../../../../utils/request";
// @ts-ignore
import { getSession } from "next-auth/client";
import Markdown from "../../../../../../components/Markdown";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import ChartBar from "../../../../../../components/icons/ChartBar";

export default function File({ project, file }: { project: Project; file: ProjectFile }): JSX.Element {
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
                    <ProjectInfo project={project} pageType={"file"} />
                    <div id={"pageContent"}>
                        <div className={`pb-4`}>
                            <SimpleBar autoHide={false} className={`py-2`}>
                                <div className={`flex flex-col sm:flex-row justify-between`}>
                                    <div className={`my-2 mx-4`}>
                                        <h3 className={`font-semibold`}>File Name</h3>
                                        <p className={``}>{file.name}</p>
                                    </div>
                                    <div className={`my-2 mx-4`}>
                                        <h3 className={`font-semibold`}>Size</h3>
                                        <p className={``}>{filesize(file.size)}</p>
                                    </div>
                                    <div className={`my-2 mx-4`}>
                                        <h3 className={`font-semibold`}>Downloads</h3>
                                        <p className={``}>{file.downloads}</p>
                                    </div>
                                    <div className={`my-2 mx-4`}>
                                        <h3 className={`font-semibold`}>Uploaded</h3>
                                        <FormattedDistanceTime start={file.createdAt} />
                                    </div>
                                    <div className={`my-2 mx-4`}>
                                        <h3 className={`font-semibold`}>Uploaded by</h3>
                                        <Link href={`/author/[Name]`} as={`/author/${file.uploaderUsername}`}>
                                            <a>
                                                <div className={`flex`}>
                                                    <img className={`w-6 h-6 mr-1`} src={"https://images.placeholders.dev/?width=400&height=400"} />
                                                    <p>{file.uploaderDisplayName}</p>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className={`my-2 mx-4 my-auto`}>
                                        <button className={`btn btn-diluv`}>Download</button>
                                    </div>
                                </div>
                                <div className={``}>
                                    <div className={`my-2 mx-4`}>
                                        <h2 className={`font-semibold`}>Game Versions</h2>
                                        <div className={`flex flex-wrap`}>
                                            {file.gameVersions.map((gv) => {
                                                return (
                                                    <p key={gv.version} className={`mr-1`}>
                                                        {gv.version}
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className={``}>
                                    <div className={`my-2 mx-4 `}>
                                        <h2 className={`font-semibold`}>SHA512</h2>
                                        <div className={`flex flex-wrap`}>
                                            <Tippy
                                                content={
                                                    <div
                                                        className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center flex flex-wrap break-all`}
                                                    >
                                                        <p className={``}>{file.sha512}</p>
                                                    </div>
                                                }
                                                followCursor={true}
                                                plugins={[followCursor]}
                                                duration={0}
                                                hideOnClick={false}
                                            >
                                                <div>
                                                    <a href={file.downloadURL + ".asc"}>
                                                        <p className={`truncate w-64 hover:text-diluv-600 dark-hover:text-diluv-500`}>
                                                            {file.sha512}
                                                        </p>
                                                    </a>
                                                </div>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>

                                <div className={``}>
                                    <div className={`my-2 mx-4`}>
                                        <h2 className={`font-semibold`}>Changelog</h2>
                                        <div className={`mt-2`}>
                                            <Markdown markdown={file.changelog} />
                                        </div>
                                    </div>
                                </div>
                            </SimpleBar>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug, FileId } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/site/games/${GameSlug}/${ProjectType}/${ProjectSlug}/files/${FileId}`, { session: session });
    return {
        props: { project: data.data.project, session: session ?? null, file: data.data.file } // will be passed to the page component as props
    };
};
