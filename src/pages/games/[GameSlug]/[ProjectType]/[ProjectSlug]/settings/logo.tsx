import Layout from "components/Layout";
import SettingsMenu, { OPTIONS } from "components/project/settings/SettingsMenu";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { StateManager } from "react-select/src/stateManager";
import { ensureAuthed } from "utils/auth";
import Alert from "../../../../../../components/Alert";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import { Project, SlugName } from "../../../../../../interfaces";
import { API_URL, getSession, Session } from "../../../../../../utils/api";
import { getAuthed } from "../../../../../../utils/request";
import { canEditProject } from "../../../../../../utils/util";

export default function Logo({ project, tags, session }: { project: Project; tags: SlugName[]; session: Session }): JSX.Element {
    const [canEdit, setCanEdit] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (canEditProject(project)) {
            setCanEdit(true);
        } else {
            router.push("/");
        }
    }, [project]);

    const [content, setContent] = useState(project.description);
    const [logo, setLogo] = useState(project.logo);
    const [logoFile, setLogoFile] = useState<File>();
    const [logoErrors, setLogoErrors] = useState<string[]>([]);

    const refName = useRef<HTMLInputElement>(null);
    const [validName, setValidName] = useState(false);
    const refSummary = useRef<HTMLInputElement>(null);
    const [validSummary, setValidSummary] = useState(false);
    const refDescription = useRef<HTMLTextAreaElement>(null);
    const [validDescription, setValidDescription] = useState(false);
    const refTags = useRef<StateManager>(null);
    const [validTags, setValidTags] = useState(false);
    const [viewMode, setViewMode] = useState({ showEdit: true, showPreview: false });

    function canSubmit(): boolean {
        return validName && validSummary && validDescription && !!logoFile && validTags;
    }

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
                <ProjectInfo project={project} pageType={"settings"}/>
                {logoErrors.length > 0 ? (
                    <div className={`my-4`}>
                        {" "}
                        {logoErrors.map((value) => {
                            return (
                                <div key={value}>
                                    <Alert type={"alert-danger"} canDismiss={true}>
                                        {value}
                                    </Alert>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <> </>
                )}
                <div className={`flex lg:flex-row flex-col gap-x-4 lg:mt-4`}>
                    <SettingsMenu
                        currentOption={OPTIONS.LOGO}
                        gameSlug={project.game.slug}
                        projectType={project.projectType.slug}
                        projectSlug={project.slug}
                    />
                    <div className={`flex-grow grid gap-y-2 sm:gap-y-0 createFormSmall sm:createFormMedium md:createFormLarge`}></div>
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    if (!ensureAuthed(session, context.res, `/api/login`)) {
        return { props: {} };
    }
    const data = await getAuthed(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}/settings`, { session });
    return {
        props: { project: data.data.project, tags: data.data.tags, session } // will be passed to the page component as props
    };
};
