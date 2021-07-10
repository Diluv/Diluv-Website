import Layout from "components/Layout";
import SettingsMenu, { OPTIONS } from "components/project/settings/SettingsMenu";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ProjectInfo from "components/project/ProjectInfo";
import { Project, SessionWithExtra, SlugName } from "interfaces";
import { API_URL } from "utils/api";
import { deleteAuthed, getAuthed } from "utils/request";
import { getSession, useSession } from "next-auth/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Alert from "../../../../../../components/Alert";
import { conditionalRedirect } from "../../../../../../utils/util";

export default function Delete({ project, tags }: { project: Project; tags: SlugName[] }): JSX.Element {
    const [confirmed, setConfirmed] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState<string[]>([]);
    const [session] = useSession() as [SessionWithExtra, boolean];

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
                        currentOption={OPTIONS.DELETE}
                        project={project}
                        session={session}
                    />
                    <div className={`flex-grow grid h-full gap-y-2 sm:gap-y-0`}>
                        {errors ? <div className={`flex flex-col gap-y-2 mb-4`}>
                            {errors.map((value, index) => {
                                return <Alert type={"alert-danger"} key={index} canDismiss={true}> {value}</Alert>;
                            })}
                        </div> : <></>}

                        <div className={`m-auto p-4 bg-gray-200 dark:bg-dark-850 border border-gray-300 dark:border-gray-700`}>
                            <div className={`flex flex-col max-w-prose text-center gap-y-2`}>
                                <p className={`text-2xl border-b pb-1 border-dark-700`}>
                                    Are you sure you want to <span className={`text-red-600`}>delete</span> this project?
                                </p>

                                <p className={`text-lg`}>
                                    Once deleted, no one will be able to access the project and you will not be able to recover the project.
                                </p>

                                <p className={`text-lg`}>
                                    This action <span className={`text-bold text-red-600`}>cannot</span> be undone.
                                </p>

                                <p className={`text-lg`}>
                                    If you understand the implications and still wish to delete the project, then please
                                    type <code className={`p-1 bg-gray-300 dark:bg-dark-700 select-all break-none`}>{project.slug}</code> to confirm
                                    project
                                    deletion.
                                </p>

                                <input type={"text"} className={`p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 dark:border-dark-700 dark:bg-dark-800 outline-none`}
                                       onChange={(e) => setConfirmed(project.slug === e.target.value)} />

                                <button disabled={!confirmed} className={`btn btn-cancel`} onClick={event => {
                                    deleteAuthed(`${API_URL}/v1/games/${project.game.slug}/${project.projectType.slug}/${project.slug}`, { session }).then(value => {
                                        router.push(`/`);
                                    }).catch(reason => {
                                        setErrors(prevState => {
                                            return [...prevState, reason.response.data.message];
                                        });
                                    });
                                }}>
                                    Delete project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = (await getSession(context)) as SessionWithExtra;


    const data = await getAuthed(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}/settings`, { session });

    const project: Project = data.data.project;
    // TODO ideally an easier way to get the project owner
    let conRed = conditionalRedirect(project.authors.filter(value => value.role === "owner")[0].username !== session.user?.id, `/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/settings`, false);
    if (conRed.shouldRedirect) {
        return conRed.redirect;
    }

    return {
        props: { project: project, tags: data.data.tags, session }
    };
};
