import Layout from "components/Layout";
import SettingsMenu, { OPTIONS } from "components/project/settings/SettingsMenu";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProjectInfo from "components/project/ProjectInfo";
import { Project, SessionWithExtra, SlugName } from "interfaces";
import { API_URL } from "utils/api";
import { getAuthed, patchAuthed } from "utils/request";
import { canEditProject } from "utils/util";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import * as yup from "yup";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import Alert from "../../../../../../components/Alert";
import { AxiosError } from "axios";
import GridArea from "../../../../../../components/misc/GridArea";
import { DropZoneImageField } from "../../../../../../components/ui/form/DropZoneField";
import SelectField from "../../../../../../components/ui/form/SelectField";
import TextEditorField from "../../../../../../components/ui/form/TextEditorField";
import SimpleBar from "simplebar-react";
import Markdown from "../../../../../../components/Markdown";

const schema = yup.object({
    name: yup.string().min(5, "Must be 5 or more characters").max(70, "Must be 70 characters or less").required("Required"),
    summary: yup.string().min(10, "Must be 10 or more characters").max(250, "Must be 250 characters or less").required("Required"),
    tags: yup
        .array()
        .of(
            yup.object().shape({
                name: yup.string(),
                slug: yup.string()
            })
        )
        .min(1, "Must have at-least 1 tag")
        .max(4, "Cannot have more than 4 tags")
        .required("Required"),
    description: yup.string().min(50, "Must be more than 50 characters").max(10000, "Must be less than 10000 characters").required("Required")
});

interface Values extends FormikValues {
    name: string;
    summary: string;
    tags: SlugName[];
    description: string;
    logo: Blob | string;
}

export default function Description({ project, tags, session }: { project: Project; tags: SlugName[]; session: SessionWithExtra }): JSX.Element {
    const [canEdit, setCanEdit] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (canEditProject(project)) {
            setCanEdit(true);
        } else {
            router.push("/");
        }
    }, [project, router]);

    const [displayState, setDisplayState] = useState(project);

    const [logoErrors, setLogoErrors] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState({ showEdit: true, showPreview: false });

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
                <div className={`flex lg:flex-row flex-col gap-x-4 lg:mt-4`}>
                    <SettingsMenu
                        currentOption={OPTIONS.DESCRIPTION}
                        project={project}
                        session={session}
                    />
                    <div className={`flex-grow`}>
                        {logoErrors.length > 0 ? (
                            <div className={`my-4`}>
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

                        <Formik
                            validationSchema={schema}
                            initialValues={{
                                name: project.name,
                                summary: project.summary,
                                tags: project.tags,
                                description: project.description,
                                logo: project.logo.sources[0].src
                            }}
                            onSubmit={async (values, { setSubmitting }: FormikHelpers<Values>) => {
                                const headers: { "Accept": string; "Authorization"?: string | undefined; "content-type": string } = {
                                    "Accept": "application/json",
                                    "content-type": "multipart/form-data"
                                };
                                const formData = new FormData();
                                const data: { description?: string; name?: string; summary?: string; tags?: string[] } = {};

                                if (project.description !== values.description) {
                                    data.description = values.description;
                                }
                                if (project.name !== values.name) {
                                    data.name = values.name;
                                }
                                if (project.summary !== values.summary) {
                                    data.summary = values.summary;
                                }
                                if (JSON.stringify(values.tags) !== JSON.stringify(project.tags)) {
                                    (values.tags as []).map((value: SlugName, index) => {
                                        if (!data.tags) {
                                            data.tags = [];
                                        }
                                        data.tags[index] = value.slug;
                                    });
                                }

                                formData.set("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
                                if (project.logo.sources[0].src !== values.logo) {
                                    formData.set("logo", values.logo);
                                }
                                //TODO
                                patchAuthed(`${API_URL}/v1/games/${project.game.slug}/${project.projectType.slug}/${project.slug}`, formData, {
                                    headers: headers,
                                    session
                                })
                                    .then(() => {
                                        // TODO *should* this redirect to the main page, I'm thinking no redirects and just add a "project saved" alert.
                                        router.push(`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}`);
                                    })
                                    .catch((reason: AxiosError) => {
                                        console.log(reason.response?.data);
                                    });
                            }}
                        >
                            {({ touched, errors, isSubmitting, values }) => (
                                <Form className={`grid gap-y-2 sm:gap-y-0 createForm`}>
                                    <GridArea name={"image"} className={`w-64 h-64 mx-auto sm:mx-0`}>
                                        <DropZoneImageField
                                            name={"logo"}
                                            setErrors={(errors1) => {
                                                setLogoErrors(errors1);
                                            }}
                                        />
                                    </GridArea>
                                    <GridArea name={"name"} className={`flex flex-col sm:ml-4 gap-y-2`}>
                                        <div className={`flex gap-x-2 justify-between`}>
                                            <label htmlFor={`name`} className={`mb-1 md:my-auto`}>
                                                Project Name:
                                            </label>
                                            {touched.name && errors.name ? (
                                                <span className={`text-red-600 dark:text-red-500`}>{errors.name}</span>
                                            ) : null}
                                        </div>
                                        <Field
                                            id={`name`}
                                            name={`name`}
                                            placeholder={`Enter Project Name`}
                                            className={`p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 dark:border-dark-700 dark:bg-dark-800 flex-grow outline-none`}
                                            maxLength={50}
                                        />
                                    </GridArea>
                                    <GridArea name={"summary"} className={`flex flex-col sm:ml-4 gap-y-2`}>
                                        <div className={`flex gap-x-2 justify-between`}>
                                            <label htmlFor={`summary`} className={`mb-1 md:my-auto`}>
                                                Project summary:
                                            </label>
                                            {touched.summary && errors.summary ? (
                                                <span className={`text-red-600 dark:text-red-500`}>{errors.summary}</span>
                                            ) : null}
                                        </div>
                                        <Field
                                            placeholder={`Enter Project Summary`}
                                            id={`summary`}
                                            name={"summary"}
                                            className={`p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 dark:border-dark-700 flex-grow dark:bg-dark-800 outline-none`}
                                            maxLength={250}
                                        />
                                    </GridArea>
                                    <GridArea name={"tags"} className={`flex flex-col sm:ml-4 gap-y-2`}>
                                        <div className={`flex gap-x-2 justify-between`}>
                                            <label htmlFor={`summary`} className={`mb-1 md:my-auto`}>
                                                Tags:
                                            </label>
                                            {touched.tags && errors.tags ? (
                                                <span className={`text-red-600 dark:text-red-500`}>{errors.tags}</span>
                                            ) : null}
                                        </div>
                                        <SelectField
                                            name={`tags`}
                                            iid={`tags`}
                                            options={tags}
                                            isMulti={true}
                                            closeOnSelect={false}
                                            filterOption={null}
                                        />
                                    </GridArea>

                                    <GridArea name={"description"} className={`mt-4`}>
                                        <div className={`grid border-b-2 border-gray-300 dark:border-dark-700 grid-cols-project-info`}>
                                            <div
                                                onClick={() =>
                                                    setViewMode({
                                                        showEdit: true,
                                                        showPreview: false
                                                    })
                                                }
                                                className={`cursor-pointer px-2 pb-1 -mb-0.125 border-b-2 ${
                                                    viewMode.showEdit && !viewMode.showPreview
                                                        ? `border-diluv-500 hover:border-diluv-500`
                                                        : `dark:border-dark-700 hover:border-diluv-300 dark:hover:border-diluv-700`
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
                                                        : `dark:border-dark-700 hover:border-diluv-300 dark:hover:border-diluv-700`
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
                                                        : `dark:border-dark-700 hover:border-diluv-300 dark:hover:border-diluv-700`
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
                                                <TextEditorField
                                                    className={`border dark:border-dark-700 bg-white dark:bg-dark-800 ${
                                                        viewMode.showEdit && viewMode.showPreview
                                                            ? `w-full md:w-1/2 h-64 md:h-80 md:h-full`
                                                            : `w-full h-full`
                                                    }`}
                                                    innerClassName={`outline-none resize-none w-full h-full p-1 dark:bg-dark-800`}
                                                    maxLength={10000}
                                                    minLength={50}
                                                    id={`description`}
                                                    name={`description`}
                                                />
                                            )}

                                            {viewMode.showPreview && (
                                                <div
                                                    className={`p-2 outline-none resize-none border dark:border-dark-700 break-all ${
                                                        viewMode.showEdit && viewMode.showPreview
                                                            ? `w-full sm:w-1/2 h-64 sm:h-80 md:h-full`
                                                            : `w-full h-full`
                                                    } bg-white dark:bg-dark-900`}
                                                >
                                                    <SimpleBar className={`h-full`}>
                                                        <Markdown markdown={values.description} />
                                                    </SimpleBar>
                                                </div>
                                            )}
                                        </div>
                                    </GridArea>
                                    <GridArea name={"create"}>
                                        <button type={"submit"} className={`btn-diluv sm:w-auto`} disabled={isSubmitting}>
                                            Create project
                                        </button>
                                    </GridArea>
                                </Form>
                            )}
                        </Formik>
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
