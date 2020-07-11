import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { getAuthed } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { HasSession, HasTheme, Project } from "../../../../../interfaces";
import ProjectInfo from "../../../../../components/project/ProjectInfo";
import { getTheme } from "../../../../../utils/theme";
import Link from "next/link";
// @ts-ignore
import { getSession } from "next-auth/client";

export default function Files({ theme, project, session }: { project: Project } & HasTheme & HasSession) {
    return (
        <Layout title={project.name} theme={theme} session={session}>
            <>
                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <ProjectInfo project={project} pageType={"members"}/>
                    <div id={"pageContent"}>
                        <div className={`py-4`}>
                            <div className={`w-1/2`}>
                                {project.contributors.map(value => {
                                    return <div key={value.userId} className={`grid col-gap-2 my-1 memberList`}>
                                        <Link href={`/author/[Name]`} as={`/author/${value.username}`}>
                                            <a>
                                                <img className={`w-16 h-16 area-avatar`} src={value.avatarURL}/>
                                            </a>
                                        </Link>
                                        <div className={`area-name`}>
                                            <Link href={`/author/[Name]`} as={`/author/${value.username}`}>
                                                <a className={` hover:text-diluv-600 dark-hover:text-diluv-500`}>
                                                    {value.displayName}
                                                </a>
                                            </Link>
                                        </div>
                                        <p className={`area-role`}>
                                            Role: {value.role}
                                        </p>
                                    </div>;
                                })}
                            </div>
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
    let data = await getAuthed(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}`, { session: session });
    return {
        props: { theme, project: data.data, session: session ?? null } // will be passed to the page component as props
    };
}