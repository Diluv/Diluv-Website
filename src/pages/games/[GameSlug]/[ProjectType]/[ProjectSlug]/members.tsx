import React from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "../../../../../utils/request";
import { API_URL, getSession } from "../../../../../utils/api";
import { Project } from "../../../../../interfaces";
import ProjectInfo from "../../../../../components/project/ProjectInfo";
import Link from "next/link";
import Image from "next/image";

import GridArea from "../../../../../components/misc/GridArea";
import Ads from "../../../../../components/ads/Ads";

export default function Members({ project }: { project: Project }): JSX.Element {
    return (
        <Layout
            title={project.name}
            canonical={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/members`}
            description={`${project.summary}`}
            image={`${project.logo}`}
            url={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/members`}
        >
            <div className={`lg:flex flex-row flex-row-reverse`}>
                <div className={`lg:ml-0 mx-auto w-5/6 lg:w-4/6`}>
                    <ProjectInfo project={project} pageType={"members"} />
                    <div id={"pageContent"}>
                        <div className={`py-4`}>
                            <div className={`w-1/2`}>
                                {project.contributors.map((value) => {
                                    return (
                                        <div key={value.userId} className={`grid gap-x-2 my-1 memberList`}>
                                            <Link href={`/author/${value.username}`}>
                                                <a>
                                                    <GridArea name={`avatar`}>
                                                        <Image width={64} height={64} src={value.avatarURL} alt={value.username + " avatar"} />
                                                    </GridArea>
                                                </a>
                                            </Link>
                                            <GridArea name={`name`}>
                                                <Link href={`/author/${value.username}`}>
                                                    <a className={`hover:text-diluv-600 dark-hover:text-diluv-500`}>{value.displayName}</a>
                                                </Link>
                                            </GridArea>
                                            <GridArea name={`role`}>
                                                <p>Role: {value.role}</p>
                                            </GridArea>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`w-1/12 lg:w-1/6`}>
                    <Ads />
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}`, { session });
    return {
        props: { project: data.data, session } // will be passed to the page component as props
    };
};
