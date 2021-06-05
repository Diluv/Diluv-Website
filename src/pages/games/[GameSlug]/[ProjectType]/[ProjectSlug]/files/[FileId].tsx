import React from "react";
import Layout from "components/Layout";
import { Project, ProjectFile } from "../../../../../../interfaces";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import filesize from "filesize";
import SimpleBar from "simplebar-react";
import { FormattedDistanceTime } from "../../../../../../utils/dynamic";
import Link from "next/link";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { API_URL } from "../../../../../../utils/api";
import { getAuthed } from "../../../../../../utils/request";
import Markdown from "../../../../../../components/Markdown";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import Image from "next/image";
import DownloadLink from "../../../../../../components/ui/DownloadLink";
import { getSession } from "next-auth/client";

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
                    <ProjectInfo project={project} pageType={"file"} fileId={file.id} />
                    <div id={"pageContent"}>
                        <div className={`pb-4`}>
                            <SimpleBar autoHide={false} className={`py-2`}>
                                <div className={`mx-2 justify-between sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2`}>
                                    <div className={`mb-2 sm:my-0`}>
                                        <h3 className={`font-semibold`}>File Name</h3>
                                        <p className={``}>{file.name}</p>
                                    </div>
                                    <div className={`my-2 sm:my-0`}>
                                        <h3 className={`font-semibold`}>Size</h3>
                                        <p className={``}>{filesize(file.size)}</p>
                                    </div>
                                    <div className={`my-2 sm:my-0`}>
                                        <h3 className={`font-semibold`}>Downloads</h3>
                                        <p className={``}>{file.downloads}</p>
                                    </div>
                                    <div className={`my-2 sm:my-0`}>
                                        <h3 className={`font-semibold`}>Uploaded</h3>
                                        <FormattedDistanceTime start={file.createdAt} />
                                    </div>
                                    <div className={`my-2 sm:my-0`}>
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
                                                    <a href={file.downloadURL + ".asc"} download={true} target={"_blank"}>
                                                        <p className={`truncate w-64 sm:w-32 hover-link`}>{file.sha512}</p>
                                                    </a>
                                                </div>
                                            </Tippy>
                                        </div>
                                    </div>
                                    <div className={`my-2 sm:my-0`}>
                                        <h3 className={`font-semibold`}>Uploaded by</h3>
                                        <Link href={`/author/${file.user.username}`}>
                                            <a className={`hover:text-diluv-500`}>
                                                <div className={`inline-flex`}>
                                                    <Image
                                                        src={
                                                            project.contributors
                                                                .filter((value) => (value.userId = file.user.userId))
                                                                .map((value) => value.avatarURL)[0]
                                                        }
                                                        width={24}
                                                        height={24}
                                                    />
                                                    <p className={`ml-1`}>{file.user.displayName}</p>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className={`mt-4 sm:my-auto lg:row-start-1 lg:col-start-5`}>
                                        <DownloadLink
                                            url={file.downloadURL}
                                            className={`w-full text-center sm:text-left sm:w-auto btn btn-diluv inline-block`}
                                        >
                                            Download
                                        </DownloadLink>
                                    </div>
                                </div>
                                <div className={`my-2 mx-2`}>
                                    <h2 className={`font-semibold`}>Game Versions</h2>
                                    <div className={`flex flex-wrap gap-x-1 gap-y-1`}>
                                        {file.gameVersions.reverse().map((gv) => {
                                            return (
                                                <p
                                                    key={gv.version}
                                                    className={`p-1 bg-dark-200 dark:bg-dark-800 border border-dark-400 dark:border-dark-600`}
                                                >
                                                    {gv.version}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className={`my-2 mx-2`}>
                                    <h2 className={`font-semibold`}>Dependencies</h2>
                                    <div className={`flex flex-wrap gap-x-2 gap-y-2`}>
                                        {file.dependencies.map((fileDep) => {
                                            return (
                                                <div
                                                    className={`p-2 border border-dark-400 dark:border-dark-600 flex gap-x-2 bg-dark-200 dark:bg-dark-800`}
                                                >
                                                    <img src={fileDep.project.logo} className={`w-12 h-12`} />
                                                    <div className={`flex flex-col`}>
                                                        <span className={`font-semibold break-all`}>{fileDep.project.name}</span>
                                                        <span>{fileDep.type}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className={`my-2 mx-2`}>
                                    <h2 className={`font-semibold`}>Changelog</h2>
                                    <div className={`mt-2 pl-2 pt-2 border border-gray-400 dark:border-dark-600 bg-gray-300 dark:bg-dark-800`}>
                                        <Markdown markdown={file.changelog} />
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
    const data = await getAuthed(`${API_URL}/v1/site/games/${GameSlug}/${ProjectType}/${ProjectSlug}/files/${FileId}`, { session });
    return {
        props: { project: data.data.project, session, file: data.data.file } // will be passed to the page component as props
    };
};
