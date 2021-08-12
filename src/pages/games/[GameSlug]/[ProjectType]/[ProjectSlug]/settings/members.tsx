import Layout from "components/Layout";
import SettingsMenu, { OPTIONS } from "components/project/settings/SettingsMenu";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProjectInfo from "components/project/ProjectInfo";
import { Project, SessionWithExtra, SlugName } from "interfaces";
import { API_URL } from "utils/api";
import { canEditProject } from "utils/util";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "utils/request";
import Image from "next/image";
import { getSession } from "next-auth/client";

export default function Members({ project, tags, session }: { project: Project; tags: SlugName[]; session: SessionWithExtra }): JSX.Element {
    const [canEdit, setCanEdit] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (canEditProject(project)) {
            setCanEdit(true);
        } else {
            router.push("/");
        }
    }, [project, router]);

    if (!session || !canEdit) {
        return <> </>;
    }
    return (
        <Layout
            title={`${project.name} Settings`}
            canonical={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/settings`}
            description={`${project.summary}`}
            image={`${project.logo}`}
            url={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/settings`}
        >
            <div className={`w-5/6 lg:w-4/6 mx-auto mt-4 mb-8`}>
                <ProjectInfo project={project} pageType={"settings"} />
                <div className={`flex lg:flex-row flex-col gap-x-4 lg:mt-4`}>
                    <SettingsMenu
                        currentOption={OPTIONS.TEAM_MEMBERS}
                        project={project}
                        session={session}
                    />
                    <div className={`flex-grow grid gap-y-2 sm:gap-y-0`}>
                        <div className={`flex flex-col gap-y-2`}>
                            {project.authors.map((user) => {
                                return (
                                    <div className={`flex gap-x-2`} key={user.userId}>
                                        <Image src={user.avatar.sources[0].src} alt={user.username} width={48} height={48} quality={100} />
                                        <div className={`flex flex-grow gap-y-2`}>
                                            <div className={`flex flex-col justify-between flex-grow`}>
                                                <div className={`font-semibold`}>{user.role}</div>
                                                <div>{user.displayName}</div>
                                            </div>
                                            {user.role !== "owner" && (
                                                <div className={`bg-diluv-600 btn w-auto px-4 my-auto cursor-pointer`}>Edit</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}/settings`, { session });
    return {
        props: { project: data.data.project, tags: data.data.tags, session } // will be passed to the page component as props
    };
};
