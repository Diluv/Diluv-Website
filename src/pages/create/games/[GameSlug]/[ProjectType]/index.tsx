import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed, postAuthed } from "utils/request";
import { API_URL, SITE_URL } from "utils/api";
import { SlugName } from "interfaces";
import Layout from "components/Layout";
import React, { useState } from "react";
import Alert from "components/Alert";
import Markdown from "components/Markdown";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/router";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import TextEditorField from "components/ui/form/TextEditorField";
import SelectField from "components/ui/form/SelectField";
import * as yup from "yup";
import { DropZoneImageField } from "components/ui/form/DropZoneField";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import GridArea from "../../../../../components/misc/GridArea";

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

export default function Index({
    GameSlug,
    ProjectType,
    tags,
    session
}: {
    GameSlug: string;
    ProjectType: string;
    tags: SlugName[];
    session: Session;
}): JSX.Element {
    const router = useRouter();

    const [logoErrors, setLogoErrors] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState({ showEdit: true, showPreview: false });

    interface Values extends FormikValues {
        name: string;
        summary: string;
        tags: SlugName[];
        description: string;
    }

    return (
        <Layout
            title={`Create ${ProjectType}`}
            canonical={`/create/games/${GameSlug}${ProjectType}`}
            description={`Create project | Diluv`}
            image={`${SITE_URL}/static/diluv.png`}
            url={`/create/games/${GameSlug}${ProjectType}`}
        >
            <div className={`w-5/6 mx-auto mt-4 mb-8`}>
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
                        name: "",
                        summary: "",
                        tags: [],
                        description: ""
                    }}
                    onSubmit={async (values, { setSubmitting }: FormikHelpers<Values>) => {
                        const headers: { "Accept": string; "Authorization"?: string | undefined; "content-type": string } = {
                            "Accept": "application/json",
                            "content-type": "multipart/form-data"
                        };
                        const data = {
                            name: values.name,
                            summary: values.summary,
                            description: values.description,
                            tags: values.tags.map((value) => value.slug)
                        };

                        const formData = new FormData();
                        formData.set("logo", values.logo);
                        formData.set("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

                        postAuthed(`${API_URL}/v1/games/${GameSlug}/${ProjectType}`, formData, { headers: headers, session })
                            .then((value) => {
                                router.push(`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/`, `/games/${GameSlug}/${ProjectType}/${value.data.slug}`);
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
                                    {touched.name && errors.name ? <span className={`text-red-600 dark:text-red-500`}>{errors.name}</span> : null}
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
                                    {touched.tags && errors.tags ? <span className={`text-red-600 dark:text-red-500`}>{errors.tags}</span> : null}
                                </div>
                                <SelectField name={`tags`} iid={`tags`} options={tags} isMulti={true} closeOnSelect={false} filterOption={null} />
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
                                                viewMode.showEdit && viewMode.showPreview ? `w-full md:w-1/2 h-64 md:h-80 md:h-full` : `w-full h-full`
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
                                                viewMode.showEdit && viewMode.showPreview ? `w-full sm:w-1/2 h-64 sm:h-80 md:h-full` : `w-full h-full`
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
                                <button type={"submit"} className={`btn btn-diluv sm:w-auto`} disabled={isSubmitting}>
                                    Create project
                                </button>
                            </GridArea>
                        </Form>
                    )}
                </Formik>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType } = context.query;

    const session = await getSession(context);
    let tags = [];
    if (session) {
        const data = await getAuthed(`${API_URL}/v1/site/create/games/${GameSlug}/${ProjectType}`, { session });
        tags = data.data.tags;
    }
    return {
        props: { GameSlug, ProjectType, session, tags }
    };
};
