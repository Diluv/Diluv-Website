import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { get } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { HasTheme, Project } from "../../../../../interfaces";
import ProjectInfo from "../../../../../components/project/ProjectInfo";
import { getTheme } from "../../../../../utils/theme";
import Link from "next/link";

export default function Files({ theme, project }: { project: Project } & HasTheme) {
    return (
        <Layout title={project.name} theme={theme}>
            <>
                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <ProjectInfo project={project} pageType={"members"}/>
                    <div id={"pageContent"}>
                        <div className={`py-4`}>
                            <div className={`w-1/2`}>
                                {project.contributors.map(value => {
                                    return <div key={value.userId} className={`grid col-gap-2 my-1 memberList`}>
                                        <img className={`w-16 h-16 area-avatar`} src={value.avatarURL}/>
                                        <Link href={`/author/[Name]`} as={`/author/${value.username}`}>
                                            <a className={`area-name`}>
                                                {value.displayName}
                                            </a>
                                        </Link>
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

    let data = await get(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}`);
    return {
        props: { theme, project: data.data } // will be passed to the page component as props
    };
}