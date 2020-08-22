import React from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { HasSession, HasTheme, Project } from "../../../../../interfaces";
import ProjectInfo from "../../../../../components/project/ProjectInfo";
import { getTheme } from "../../../../../utils/theme";
import Link from "next/link";
// @ts-ignore
import { getSession } from "next-auth/client";
import GridArea from "../../../../../components/misc/GridArea";

export default function Files({ theme, project, session }: { project: Project } & HasTheme & HasSession): JSX.Element {
    return (
        <Layout
            title={project.name}
            theme={theme}
            session={session}
            canonical={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/members`}
            description={`${project.summary}`}
            image={`${project.logo}`}
            url={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/members`}
        >
            <>
                <div className={`mx-auto w-5/6`}>
                    <ProjectInfo project={project} pageType={"members"} />
                    <div id={"pageContent"}>
                        <div className={`py-4`}>
                            <div className={`w-1/2`}>
                                {project.contributors.map((value) => {
                                    return (
                                        <div key={value.userId} className={`grid col-gap-2 my-1 memberList`}>
                                            <Link href={`/author/[Name]`} as={`/author/${value.username}`}>
                                                <a>
                                                    <GridArea name={`avatar`}>
                                                        <img className={`w-16 h-16`} src={value.avatarURL} />
                                                    </GridArea>
                                                </a>
                                            </Link>
                                            <GridArea name={`name`}>
                                                <Link href={`/author/[Name]`} as={`/author/${value.username}`}>
                                                    <a className={` hover:text-diluv-600 dark-hover:text-diluv-500`}>{value.displayName}</a>
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
            </>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const theme = getTheme(context);
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}`, { session: session });
    return {
        props: { theme, project: data.data, session: session ?? null } // will be passed to the page component as props
    };
};
