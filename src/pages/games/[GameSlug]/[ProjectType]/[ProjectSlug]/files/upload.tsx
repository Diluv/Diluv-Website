import React, { useState } from "react";
import Layout from "components/Layout";
import { Project, SlugName, UploadData } from "interfaces";
import ProjectInfo from "components/project/ProjectInfo";
import Select, { components, createFilter, ValueType } from "react-select";
import * as yup from "yup";
import { Field, Form, Formik, FormikErrors, FormikHelpers, FormikTouched, FormikValues, useField } from "formik";
import SelectField from "components/ui/form/SelectField";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { API_URL } from "utils/api";
import { getAuthed, postUploadAuthed } from "utils/request";
import { DropZoneFileField } from "components/ui/form/DropZoneField";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import AsyncSelect from "react-select/async";
import { reactSelectStyle } from "utils/theme";
import { OptionProps } from "react-select/src/components/Option";
import ProgressBar from "components/ui/ProgressBar";
import TextEditorField from "components/ui/form/TextEditorField";
import SimpleBar from "simplebar-react";
import Markdown from "components/Markdown";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { XCircleIcon } from "@heroicons/react/solid";

interface Filter extends SlugName {
    checked: boolean;
}

interface Dependency {
    projectName: string;
    projectId: number;
    type: SlugName;
    projectLogo: string;
}

interface Values extends FormikValues {
    version: string;
    releaseType: SlugName;
    gameVersions: SlugName[];
    loaders: SlugName[];
    changelog: string;
    file: any;
    dependencies: Dependency[];
}

const schema = yup.object({
    version: yup.string().max(20, "Must be 20 characters or less").required("Required"),
    releaseType: yup.object().shape({ name: yup.string(), slug: yup.string() }).required("Required"),
    gameVersions: yup
        .array()
        .of(
            yup.object().shape({
                name: yup.string(),
                slug: yup.string()
            })
        )
        .min(1, "Must have at-least 1 version")
        .required("Required"),
    loaders: yup
        .array()
        .of(
            yup.object().shape({
                name: yup.string(),
                slug: yup.string()
            })
        )
        .min(1, "Must have at-least 1 loader") // TODO do we want to enforce at-least one loader?
        .required("Required"),
    changelog: yup.string().max(2000, "Must be less than 2000 characters"),
    file: yup.mixed().required(),
    dependencies: yup.array().of(
        yup.object().shape({
            projectId: yup.number(),
            projectName: yup.string(),
            projectLogo: yup.string(),
            type: yup.object().shape({
                name: yup.string(),
                slug: yup.string()
            })
        })
    )
});

function VersionGroup({ touched, errors }: { touched: FormikTouched<Values>; errors: FormikErrors<Values> }) {
    return (
        <div className={`flex flex-col gap-y-2 md:w-1/2`}>
            <div className={`flex gap-x-2 justify-between`}>
                <label htmlFor={`version`} className={`font-medium`}>
                    Version
                </label>
                {touched.version && errors.version ? <span className={`text-red-600 dark:text-red-500`}>{errors.version}</span> : null}
            </div>
            <Field
                placeholder={`Enter version`}
                id={`version`}
                name={"version"}
                className={`p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 outline-none flex-grow dark:border-dark-700 dark-hover:border-dark-600 dark-focus:border-dark-600 dark:bg-dark-800`}
            />
        </div>
    );
}

function ReleaseGroup({ touched, errors, uploadData }: { touched: FormikTouched<Values>; errors: FormikErrors<Values>; uploadData: UploadData }) {
    return (
        <div className={`flex flex-col gap-y-2 md:w-1/2`}>
            <div className={`flex gap-x-2 justify-between`}>
                <label htmlFor={`releaseSelect`} className={`font-medium`}>
                    Release Type:
                </label>
                {touched.tags && errors.tags ? <span className={`text-red-600 dark:text-red-500`}>{errors.tags}</span> : null}
            </div>
            <SelectField
                name={`releaseType`}
                iid={`releaseType`}
                options={uploadData.releaseTypes}
                isMulti={false}
                filterOption={null}
                closeOnSelect={true}
            />
        </div>
    );
}

function GameVersionGroup({ touched, errors, uploadData }: { touched: FormikTouched<Values>; errors: FormikErrors<Values>; uploadData: UploadData }) {
    const [filters, setFilters] = useState<Filter[]>(
        uploadData.filters.map((filter) => {
            return { slug: filter.slug, name: filter.name, checked: false };
        })
    );

    function getGameVersions(uploadData: UploadData, filters: Filter[]): SlugName[] {
        return uploadData.gameVersions
            .filter((value) => {
                for (const filter of filters) {
                    if (value.type === filter.slug) {
                        return filter.checked;
                    }
                }
                return true;
            })
            .sort((a, b) => {
                return b.releasedAt - a.releasedAt;
            })
            .map((value) => {
                return { slug: value.version, name: value.version };
            });
    }

    const [displayedVersions, setDisplayedVersions] = useState<SlugName[]>(getGameVersions(uploadData, filters));

    return (
        <div className={`flex flex-col gap-y-2 md:w-1/2`}>
            <div className={`flex gap-x-2 justify-between`}>
                <label htmlFor={`gameVersions`} className={`font-medium`}>
                    Game Versions:
                </label>
                {touched.tags && errors.tags ? <span className={`text-red-600 dark:text-red-500`}>{errors.tags}</span> : null}
            </div>
            <SelectField
                name={`gameVersions`}
                iid={`gameVersions`}
                options={displayedVersions}
                isMulti={true}
                closeOnSelect={false}
                filterOption={createFilter({ ignoreAccents: true })}
            />
            <div className={`flex flex-wrap -mt-2`}>
                {filters.map((filter) => {
                    return (
                        <div key={filter.slug} className={`mr-1`}>
                            <input
                                id={`check-${filter.slug}`}
                                className={`my-auto mr-1`}
                                type={`checkbox`}
                                onChange={(event) => {
                                    const newFilters = filters;
                                    for (const newFilter of newFilters) {
                                        if (newFilter.slug === filter.slug) {
                                            newFilter.checked = event.target.checked;
                                        }
                                    }
                                    setFilters(newFilters);
                                    setDisplayedVersions(getGameVersions(uploadData, filters));
                                }}
                            />
                            <label htmlFor={`check-${filter.slug}`} className={`my-auto`}>
                                {filter.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function LoaderGroup({ touched, errors, uploadData }: { touched: FormikTouched<Values>; errors: FormikErrors<Values>; uploadData: UploadData }) {
    return (
        <div className={`md:w-1/2`}>
            <div className={`flex flex-col gap-y-2`}>
                <div className={`flex gap-x-2 justify-between`}>
                    <label htmlFor={`loaders`} className={`font-medium`}>
                        Loaders:
                    </label>
                    {touched.tags && errors.tags ? <span className={`text-red-600 dark:text-red-500`}>{errors.tags}</span> : null}
                </div>
                <SelectField
                    name={`loaders`}
                    iid={`loaders`}
                    options={uploadData.loaders}
                    isMulti={true}
                    filterOption={createFilter({ ignoreAccents: true })}
                    closeOnSelect={false}
                />
            </div>
        </div>
    );
}

function FileGroup({ setErrors }: { setErrors: (errors: string[]) => void }) {
    return (
        <div>
            <label htmlFor="file" className={`font-medium`}>
                File
            </label>
            <div className={`md:flex mb-2 md:mb-0`}>
                <DropZoneFileField name={"file"} setErrors={setErrors} />
            </div>
        </div>
    );
}

function DependencyGroup({
    touched,
    errors,
    project,
    uploadData,
    session,
    name
}: {
    touched: FormikTouched<Values>;
    errors: FormikErrors<Values>;
    project: Project;
    uploadData: UploadData;
    session: Session;
    name: string;
}) {
    const [field, meta, helpers] = useField(name);

    const { error, value } = meta;
    const { setValue, setTouched } = helpers;
    let [addingDependency, setAddingDependency] = useState(false);

    const defaultDep = { projectId: -1, projectName: "", projectLogo: "", type: { slug: "", name: "" } };
    let [dependency, setDependency] = useState(defaultDep);
    const Option = (props: OptionProps<any, any>) => {
        return (
            <div className={`flex`}>
                <components.Option {...props}>
                    <div className={`flex gap-x-1`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={`h-8 w-8`} src={props.data.logo} alt={`${props.label} logo`} />
                        <span className={`my-auto`}>{props.label}</span>
                    </div>
                </components.Option>
            </div>
        );
    };

    return (
        <div className={`flex flex-col gap-y-2`}>
            <div className={`flex gap-x-2 justify-between`}>
                <label htmlFor={`version`} className={`font-medium`}>
                    Dependencies
                </label>
                {touched.version && errors.version ? <span className={`text-red-600 dark:text-red-500`}>{errors.version}</span> : null}
            </div>
            {(value || []).map((dep: Dependency) => {
                return (
                    <div className={`p-2 flex gap-x-2`} key={dep.projectId}>
                        <div
                            className={`my-auto hover:text-red-500 cursor-pointer`}
                            onClick={(event) => {
                                let newDependencies = value.filter((dep1: Dependency) => {
                                    return dep1.projectId !== dep.projectId;
                                });
                                setValue(newDependencies);
                            }}
                        >
                            <XCircleIcon className={`w-6 h-6`} />
                        </div>
                        {/*TODO This one could probably use next/image since we serve the logo */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={dep.projectLogo} className={"w-16 h-16"} alt={`Project Logo`} />
                        <div className={`flex flex-col gap-y-2`}>
                            <span>{dep.projectName}</span>
                            <span>{dep.type.name}</span>
                        </div>
                    </div>
                );
            })}
            {addingDependency ? (
                <div className={`p-4 w-96 h-64 bg-dark-800 relative border border-gray-300 dark:border-dark-700 flex flex-col`}>
                    <div className={`absolute top-4 right-4 cursor-pointer hover:text-red-500`} onClick={() => setAddingDependency(false)}>
                        <XCircleIcon className={`w-6 h-6`} />
                    </div>
                    <div className={`flex flex-col gap-y-2 flex-grow`}>
                        <div className={`flex flex-col gap-y-2`}>
                            Select Project
                            <AsyncSelect
                                cacheOptions={true}
                                isSearchable={true}
                                components={{ Option }}
                                loadOptions={(inputValue) => {
                                    return new Promise((resolve) => {
                                        getAuthed(
                                            `${API_URL}/v1/games/${project.game.slug}/${project.projectType.slug}/projects?search=${inputValue}`,
                                            {
                                                session
                                            }
                                        )
                                            .then((response) => {
                                                resolve(
                                                    response.data.projects
                                                        .filter((proj: Project) => {
                                                            return (value || []).map((dep: Dependency) => dep.projectId).indexOf(proj.id) === -1;
                                                        })
                                                        .map((proj: Project) => {
                                                            return { value: proj.id, label: proj.name, logo: proj.logo };
                                                        })
                                                );
                                            })
                                            .catch((reason) => {
                                                console.log(reason);
                                            });
                                    });
                                }}
                                inputId={`dependency-select`}
                                instanceId={`dependency-select`}
                                isClearable={true}
                                onChange={(option: ValueType<any, any>) => {
                                    if (option) {
                                        setDependency((prevState) => {
                                            return { ...prevState, projectId: option.value, projectLogo: option.logo, projectName: option.label };
                                        });
                                    } else {
                                        setDependency((prevState) => {
                                            return { ...prevState, projectId: -1, projectLogo: "", projectName: "" };
                                        });
                                    }
                                }}
                                noOptionsMessage={(obj) => {
                                    return "Type to load projects";
                                }}
                                styles={reactSelectStyle}
                                classNamePrefix={"select"}
                                className={`flex-grow`}
                                openMenuOnFocus={true}
                                closeMenuOnSelect={true}
                                tabSelectsValue={false}
                            />
                        </div>
                        <div className={`flex flex-col gap-y-2`}>
                            Dependency Type
                            <Select
                                isSearchable={true}
                                inputId={`dependency-type-select`}
                                instanceId={`dependency-type-select`}
                                isClearable={true}
                                options={uploadData.dependencyTypes.map((type: SlugName) => {
                                    return { label: type.name, value: type.slug };
                                })}
                                onChange={(option: ValueType<any, any>) => {
                                    if (option) {
                                        setDependency((prevState) => {
                                            return { ...prevState, type: { slug: option.value, name: option.label } };
                                        });
                                    } else {
                                        setDependency((prevState) => {
                                            return { ...prevState, type: { slug: "", name: "" } };
                                        });
                                    }
                                }}
                                styles={reactSelectStyle}
                                classNamePrefix={"select"}
                                className={`flex-grow`}
                                openMenuOnFocus={true}
                                closeMenuOnSelect={true}
                                tabSelectsValue={false}
                            />
                        </div>

                        <button
                            className={`btn btn-diluv text-center mt-auto`}
                            onClick={(event) => {
                                setAddingDependency(false);

                                let newValue = value || [];
                                newValue.push(dependency);
                                setValue(newValue);
                                setDependency(defaultDep);
                            }}
                            disabled={dependency.projectId === -1 || dependency.type.slug === ""}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <button className={`btn btn-diluv w-64`} onClick={(event) => setAddingDependency(true)}>
                        Add Dependency
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Upload({ project, uploadData, session }: { project: Project; uploadData: UploadData; session: Session }): JSX.Element {
    const [viewMode, setViewMode] = useState({ showEdit: true, showPreview: false });
    const [fileErrors, setFileErrors] = useState<string[]>([]);
    const router = useRouter();

    const [percentage, setPercentage] = useState(0);

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
                    <div className={`my-4`}>
                        <div>
                            <Formik
                                validationSchema={schema}
                                initialValues={{
                                    version: "",
                                    releaseType: { name: "Release", slug: "release" },
                                    gameVersions: [],
                                    loaders: [],
                                    changelog: "",
                                    file: undefined,
                                    dependencies: []
                                }}
                                onSubmit={async (values, { setSubmitting }: FormikHelpers<Values>) => {
                                    const headers: { "Accept": string; "Authorization"?: string | undefined; "content-type": string } = {
                                        "Accept": "application/json",
                                        "content-type": "multipart/form-data"
                                    };

                                    const data = {
                                        version: values.version,
                                        changelog: values.changelog,
                                        releaseType: values.releaseType.slug,
                                        classifier: "binary", // TODO remove
                                        gameVersions: values.gameVersions.map((value) => value.slug),
                                        loaders: values.loaders.map((value) => value.slug),
                                        dependencies: values.dependencies.map((dep) => {
                                            return {
                                                projectId: dep.projectId,
                                                type: dep.type.slug
                                            };
                                        })
                                    };
                                    const formData = new FormData();
                                    formData.set("file", values.file);
                                    formData.set("filename", values.file.name);
                                    formData.set("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
                                    setSubmitting(true);
                                    await postUploadAuthed(
                                        `${API_URL}/v1/projects/${project.id}/files`,
                                        formData,
                                        { headers: headers, session },
                                        (newPercentage) => {
                                            console.log(newPercentage);
                                            setPercentage(newPercentage);
                                        }
                                    )
                                        .then((value) => {
                                            console.log(value);
                                            router.push(
                                                `/games/[GameSlug]/[ProjectType]/[ProjectSlug]/files/[FileId]`,
                                                `/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/files/${value.data.id}`
                                            );
                                        })
                                        .catch((reason: AxiosError) => {
                                            console.log(reason.response?.data);
                                        });
                                }}
                            >
                                {({ touched, errors, isSubmitting, values, setErrors }) => (
                                    <Form>
                                        <div className={`flex flex-col gap-y-2`}>
                                            <div>
                                                <FileGroup setErrors={setFileErrors} />
                                            </div>
                                            <div className={`md:flex gap-x-4`}>
                                                <VersionGroup touched={touched} errors={errors} />
                                                <ReleaseGroup touched={touched} errors={errors} uploadData={uploadData} />
                                            </div>
                                            <div className={`md:flex gap-x-4`}>
                                                <GameVersionGroup touched={touched} errors={errors} uploadData={uploadData} />
                                                <LoaderGroup touched={touched} errors={errors} uploadData={uploadData} />
                                            </div>
                                            <div className={`flex flex-col gap-y-2`}>
                                                <div className={`gap-y-2`}>
                                                    <div>
                                                        <label className={`font-medium`} htmlFor={`changelog`}>
                                                            Changelog
                                                        </label>
                                                    </div>
                                                    <div style={{ gridArea: "changelog" }}>
                                                        <div
                                                            className={`grid border-b-2 border-gray-300 dark:border-dark-700 grid-cols-project-info`}
                                                        >
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
                                                                        : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`
                                                                }`}
                                                            >
                                                                <span
                                                                    className={`select-none ${
                                                                        viewMode.showEdit && !viewMode.showPreview ? `text-diluv-600` : ``
                                                                    }`}
                                                                >
                                                                    Edit Changelog
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
                                                                <span
                                                                    className={`select-none ${
                                                                        !viewMode.showEdit && viewMode.showPreview ? `text-diluv-600` : ``
                                                                    }`}
                                                                >
                                                                    Preview Changelog
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
                                                                <span
                                                                    className={`select-none ${
                                                                        viewMode.showEdit && viewMode.showPreview ? `text-diluv-600` : ``
                                                                    }`}
                                                                >
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
                                                                    maxLength={2000}
                                                                    minLength={0}
                                                                    id={`changelog`}
                                                                    name={`changelog`}
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
                                                                        <Markdown markdown={values.changelog} />
                                                                    </SimpleBar>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <DependencyGroup
                                                    touched={touched}
                                                    errors={errors}
                                                    project={project}
                                                    session={session}
                                                    uploadData={uploadData}
                                                    name={"dependencies"}
                                                />
                                            </div>
                                            <div className={`flex flex-col md:flex-row gap-y-4 gap-x-4`}>
                                                <button className={`btn btn-diluv sm:w-auto`} type={"submit"} disabled={isSubmitting}>
                                                    {isSubmitting ? `Submitting` : `Submit`}
                                                </button>
                                                {isSubmitting ? (
                                                    <div className={`w-full my-auto`}>
                                                        <ProgressBar completed={percentage} />
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/games/${GameSlug}/${ProjectType}/${ProjectSlug}`, { session });
    const uploadData = await getAuthed(`${API_URL}/v1/games/${GameSlug}/${ProjectType}/upload`, { session });
    return {
        props: { project: data.data, uploadData: uploadData.data, session } // will be passed to the page component as props
    };
};
