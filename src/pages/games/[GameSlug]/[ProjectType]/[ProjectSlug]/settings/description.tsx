import Layout from "components/Layout";
import SettingsMenu, { OPTIONS } from "components/project/settings/SettingsMenu";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ensureAuthed } from "utils/auth";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import { Project, SelectData, SlugName } from "../../../../../../interfaces";
import { API_URL } from "../../../../../../utils/api";
import { getAuthed, patch, patchAuthed } from "../../../../../../utils/request";
import { canEditProject } from "../../../../../../utils/util";
import SimpleBar from "simplebar-react";
import Markdown from "../../../../../../components/Markdown";
import Loading from "../../../../../../components/icons/Loading";
import Alert from "../../../../../../components/Alert";
import TextEditor from "../../../../../../components/ui/TextEditor";
import Select from "react-select";
import { reactSelectStyle } from "../../../../../../utils/theme";

export default function Description({ project, tags }: { project: Project; tags: SlugName[] }): JSX.Element {
    const [session, loading] = useSession();
    const [canEdit, setCanEdit] = useState(false);
    const router = useRouter();

    ensureAuthed(session);

    useEffect(() => {
        if (canEditProject(project)) {
            setCanEdit(true);
        } else {
            router.push("/");
        }
    }, [project]);

    const [projectState, setProjectState] = useState(project);
    const [displayState, setDisplayState] = useState(project);

    const [validName, setValidName] = useState(project.name.length >= 5 && project.name.length <= 50);
    const [validSummary, setValidSummary] = useState(project.summary.length >= 10 && project.summary.length <= 250);
    const [validTags, setValidTags] = useState(project.tags.length > 0);
    const [validDescription, setValidDescription] = useState(project.description.length >= 50 && project.description.length <= 10000);
    const [viewMode, setViewMode] = useState({ showEdit: true, showPreview: false });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [errors, setErrors] = useState<string[]>([]);

    if (!session || !canEdit) {
        return <> </>;
    }
    return (
        <Layout
            title={`${displayState.name} Settings`}
            canonical={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/settings`}
            description={`${project.summary}`}
            image={`${displayState.logo}`}
            url={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/settings`}
        >
            <div className={`w-5/6 lg:w-4/6 mx-auto mt-4 mb-8`}>
                <ProjectInfo project={displayState} pageType={"settings"} />
                {errors.length > 0 ? (
                    <div className={`my-4`}>
                        {errors
                            .filter((item, index, array) => array.indexOf(item) === index)
                            .map((value) => {
                                return (
                                    <div key={value}>
                                        <Alert
                                            type={"danger"}
                                            canDismiss={true}
                                            onDismiss={() => {
                                                setErrors(errors.filter((item) => item !== value));
                                            }}
                                        >
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
                        currentOption={OPTIONS.DESCRIPTION}
                        gameSlug={project.game.slug}
                        projectType={project.projectType.slug}
                        projectSlug={project.slug}
                    />
                    <div className={`flex-grow`}>
                        <div className={`flex flex-col gap-y-2`}>
                            <div className={`flex flex-col gap-y-2`}>
                                <div className={`flex flex-col md:flex-row`}>
                                    <label htmlFor={`nameField`} className={`mb-1 md:my-auto`}>
                                        Project Name:
                                    </label>
                                    <input
                                        type={`text`}
                                        placeholder={`Enter Project Name`}
                                        id={`nameField`}
                                        defaultValue={projectState.name}
                                        className={`md:ml-2 p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 dark:border-dark-700 dark:bg-dark-800 flex-grow outline-none`}
                                        onChange={(event) => {
                                            setProjectState((prevState) => {
                                                return {
                                                    ...prevState,
                                                    name: event.target.value
                                                };
                                            });
                                            if (event.target.value.length >= 5 && event.target.value.length <= 50) {
                                                setValidName(true);
                                            } else {
                                                setValidName(false);
                                            }
                                        }}
                                        maxLength={50}
                                    />
                                </div>
                                <div className={`flex flex-col md:flex-row`}>
                                    <label htmlFor={`summaryField`} className={`mb-1 md:my-auto`}>
                                        Project summary:
                                    </label>
                                    <input
                                        type={`text`}
                                        placeholder={`Enter Project Summary`}
                                        id={`summaryField`}
                                        defaultValue={projectState.summary}
                                        className={`md:ml-2 p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 dark:border-dark-700 flex-grow dark:bg-dark-800 outline-none`}
                                        onChange={(event) => {
                                            setProjectState((prevState) => {
                                                return {
                                                    ...prevState,
                                                    summary: event.target.value
                                                };
                                            });
                                            if (event.target.value.length >= 10 && event.target.value.length <= 250) {
                                                setValidSummary(true);
                                            } else {
                                                setValidSummary(false);
                                            }
                                        }}
                                        maxLength={250}
                                    />
                                </div>

                                <div className={`flex flex-col md:flex-row`}>
                                    <label htmlFor={"tags"} className={`mb-1 md:my-auto`}>
                                        Tags:
                                    </label>
                                    <Select
                                        isSearchable={true}
                                        inputId="tags"
                                        options={tags.map((value) => {
                                            return { value: value.slug, label: value.name };
                                        })}
                                        defaultValue={displayState.tags.map((value) => {
                                            return { value: value.slug, label: value.name };
                                        })}
                                        isMulti={true}
                                        onChange={(event: any) => {
                                            if (!event) {
                                                setValidTags(false);
                                                return;
                                            }
                                            setProjectState((prevState) => {
                                                return {
                                                    ...prevState,
                                                    tags: event.map((value: any) => {
                                                        return { slug: value.value, name: value.label };
                                                    })
                                                };
                                            });
                                            setValidTags(event && event.length > 0);
                                        }}
                                        styles={reactSelectStyle}
                                        classNamePrefix={"select"}
                                        className={`md:ml-2 flex-grow`}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className={`grid border-b-2 border-gray-300 dark:border-dark-700 grid-cols-project-info`}>
                                    <div
                                        onClick={() =>
                                            setViewMode({
                                                showEdit: true,
                                                showPreview: false
                                            })
                                        }
                                        className={`cursor-pointer pb-1 -mb-0.125 border-b-2 ${
                                            viewMode.showEdit && !viewMode.showPreview
                                                ? `border-diluv-500 hover:border-diluv-500`
                                                : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`
                                        }`}
                                    >
                                        <span className={`select-none ${viewMode.showEdit && !viewMode.showPreview ? `text-diluv-600` : ``}`}>
                                            Edit Description
                                        </span>
                                    </div>
                                    <div
                                        onClick={() =>
                                            setViewMode({
                                                showEdit: false,
                                                showPreview: true
                                            })
                                        }
                                        className={`cursor-pointer px-2 pb-1 -mb-0.125 border-b-2 ${
                                            !viewMode.showEdit && viewMode.showPreview
                                                ? `border-diluv-500 hover:border-diluv-500`
                                                : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`
                                        }`}
                                    >
                                        <span className={`select-none ${!viewMode.showEdit && viewMode.showPreview ? `text-diluv-600` : ``}`}>
                                            Preview Description
                                        </span>
                                    </div>
                                    <div
                                        onClick={() =>
                                            setViewMode({
                                                showEdit: true,
                                                showPreview: true
                                            })
                                        }
                                        className={`cursor-pointer px-2 pb-1 -mb-0.125 border-b-2 ${
                                            viewMode.showEdit && viewMode.showPreview
                                                ? `border-diluv-500 hover:border-diluv-500`
                                                : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`
                                        }`}
                                    >
                                        <span className={`select-none ${viewMode.showEdit && viewMode.showPreview ? `text-diluv-600` : ``}`}>
                                            Split View
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        viewMode.showEdit && viewMode.showPreview ? `flex flex-col sm:flex-row` : ``
                                    } h-112 sm:h-80 md:h-112`}
                                >
                                    {viewMode.showEdit && (
                                        <TextEditor
                                            className={`border  dark:border-dark-700 bg-white dark:bg-dark-800 ${
                                                viewMode.showEdit && viewMode.showPreview ? `w-full sm:w-1/2 h-64 sm:h-80 md:h-full` : `w-full h-full`
                                            }`}
                                            innerClassName={`outline-none resize-none  w-full h-full p-1 dark:bg-dark-800`}
                                            onChange={(e) => {
                                                setProjectState((prevState) => {
                                                    return {
                                                        ...prevState,
                                                        description: e.target.value
                                                    };
                                                });
                                                if (e.target.value.length >= 50 && e.target.value.length <= 10000) {
                                                    setValidDescription(true);
                                                } else {
                                                    setValidDescription(false);
                                                }
                                            }}
                                            defaultValue={projectState.description}
                                            maxLength={10000}
                                        />
                                    )}

                                    {viewMode.showPreview && (
                                        <div
                                            className={`p-2 outline-none resize-none border dark:border-dark-700 break-all ${
                                                viewMode.showEdit && viewMode.showPreview ? `w-full sm:w-1/2 h-64 sm:h-80 md:h-full` : `w-full h-full`
                                            } bg-white dark:bg-dark-900`}
                                        >
                                            <SimpleBar className={`h-full`}>
                                                <Markdown markdown={projectState.description} />
                                            </SimpleBar>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    className={`btn-diluv sm:w-16 sm:h-10`}
                                    disabled={!validDescription || !validName || !validSummary || !validTags}
                                    onClick={(event) => {
                                        setSubmitting(true);
                                        const formData = new FormData();
                                        const data: { description?: string; name?: string; summary?: string; tags?: string[] } = {};
                                        if (projectState.description !== project.description) {
                                            data.description = projectState.description;
                                        }
                                        if (projectState.name !== project.name) {
                                            data.name = projectState.name;
                                        }
                                        if (projectState.summary !== project.summary) {
                                            data.summary = projectState.summary;
                                        }
                                        if (JSON.stringify(projectState.tags) !== JSON.stringify(project.tags)) {
                                            (projectState.tags as []).map((value: SelectData, index) => {
                                                if (!data.tags) {
                                                    data.tags = [];
                                                }
                                                data.tags[index] = value.slug;
                                            });
                                        }

                                        formData.set("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

                                        patchAuthed(
                                            `${API_URL}/v1/games/${project.game.slug}/${project.projectType.slug}/${project.slug}`,
                                            formData,
                                            { session: session }
                                        )
                                            .then((value) => {
                                                setSubmitting(false);
                                                setSubmitted(true);
                                                setErrors([]);

                                                setDisplayState(projectState);
                                                setTimeout(() => {
                                                    setSubmitted(false);
                                                }, 2000);
                                            })
                                            .catch((reason) => {
                                                setSubmitting(false);
                                                setErrors([...errors, reason.response.data.message]);
                                            });
                                    }}
                                >
                                    {submitting ? (
                                        <div className={`mx-auto text-center`}>
                                            <Loading className={`mx-auto`} />
                                        </div>
                                    ) : (
                                        <span>{submitted ? "Saved" : "Save"}</span>
                                    )}
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

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}/settings`, { session: session });
    return {
        props: { project: data.data.project, tags: data.data.tags, session: session ?? null } // will be passed to the page component as props
    };
};
