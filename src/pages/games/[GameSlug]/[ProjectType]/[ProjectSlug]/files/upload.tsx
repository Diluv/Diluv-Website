import React from "react";
import Layout from "components/Layout";
import { Project } from "../../../../../../interfaces";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { API_URL, getSession } from "../../../../../../utils/api";
import { getAuthed } from "../../../../../../utils/request";

export default function Upload({ project }: { project: Project; }): JSX.Element {
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
                    <ProjectInfo project={project} pageType={"uploadFile"} />
                </div>
            </>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/games/${GameSlug}/${ProjectType}/${ProjectSlug}`, { session });
    return {
        props: { project: data.data, session } // will be passed to the page component as props
    };
};
