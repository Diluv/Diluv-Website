import React, { useRef, useState } from "react";
import Layout from "components/Layout";
import { Project, SelectData, SlugName, UploadData } from "../../../../../../interfaces";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { API_URL, getSession } from "../../../../../../utils/api";
import { getAuthed } from "../../../../../../utils/request";
import Uploady, {
    useBatchAddListener,
    useItemFinalizeListener,
    useItemProgressListener,
    useItemStartListener,
    useUploadyContext
} from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";
import UploadButton from "@rpldy/upload-button";
import ProgressBar from "../../../../../../components/ui/ProgressBar";
import { BatchItem } from "@rpldy/shared";
import XCirlce from "../../../../../../components/icons/XCirlce";
import filesize from "filesize";
import Select, { ActionMeta, createFilter } from "react-select";
import { reactSelectStyle } from "../../../../../../utils/theme";
import TextEditor from "../../../../../../components/ui/TextEditor";
import SimpleBar from "simplebar-react";
import Markdown from "../../../../../../components/Markdown";
import Alert from "../../../../../../components/Alert";

interface Filter extends SlugName {
    checked: boolean;
}

export default function Upload({ project, uploadData }: { project: Project; uploadData: UploadData }): JSX.Element {
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
                            <Uploady destination={{ url: "https://4567.imja.red/v1/games" }} autoUpload={false} noPortal={true} multiple={false}>
                                <Form uploadData={uploadData} />
                            </Uploady>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
}

function Form({ uploadData }: { uploadData: UploadData }) {
    const uploadyContext = useUploadyContext();
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const [item, setItem] = useState<BatchItem | null>();

    const uploadRef = useRef(null);
    const [viewMode, setViewMode] = useState({ showEdit: true, showPreview: false });

    const [errors, setErrors] = useState<string[]>([]);

    const [filters, setFilters] = useState<Filter[]>(
        uploadData.filters.map((filter) => {
            return { slug: filter.slug, name: filter.name, checked: false };
        })
    );

    function getLoaders() {
        return uploadData.loaders.map((value) => {
            return { value: value.slug, label: value.name };
        });
    }

    function getGameVersions() {
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
                return { value: value.version, label: value.version };
            });
    }

    const [displayedVersions, setDisplayedVersions] = useState(getGameVersions());

    const [displayedLoaders, setDisplayedLoaders] = useState(getLoaders());

    const versionSelectRef = useRef<Select>(null);
    const loaderSelectRef = useRef<Select>(null);

    const [changelog, setChangelog] = useState("");

    const [validFile, setValidFile] = useState(false);
    const [validVersion, setValidVersion] = useState(false);
    const [validReleaseType, setValidReleaseType] = useState(false);
    const [validGameVersions, setValidGameVersions] = useState(false);
    const [validLoaders, setValidLoaders] = useState(false);
    const [validChangelog, setValidChangelog] = useState(false);

    function canSubmit(): boolean {
        return validFile && validVersion && validReleaseType && validGameVersions && validLoaders && validChangelog;
    }

    return (
        <div>
            {errors &&
                errors.map((value) => {
                    return (
                        <Alert
                            key={value}
                            type={"alert-danger"}
                            canDismiss={true}
                            onDismiss={() => {
                                setErrors(errors.filter((item) => item !== value));
                            }}
                        >
                            {value}
                        </Alert>
                    );
                })}
            <Watcher
                setItem={(item) => {
                    setItem(item);
                    setValidFile(!!item);
                }}
                setProgress={(progress) => setProgress(progress)}
                setUploading={(uploading) => setUploading(uploading)}
                setUploaded={(uploaded) => setUploaded(uploaded)}
            />
            <label htmlFor={"file-select"} className={`font-medium`}>
                File
            </label>
            <UploadDropZone onDragOverClassName="drag-over">
                <div className={`md:flex mb-2 md:mb-0`}>
                    <UploadButton
                        id={`file-select`}
                        className={`btn border w-auto bg-gray-200 dark:bg-dark-800 border-gray-300 dark:border-dark-700 my-2 break-all`}
                        text={item ? item.file.name : "No file selected"}
                    />
                    {item ? (
                        <span
                            className={`md:my-auto md:ml-2 hover:text-red-300 transition-colors cursor-pointer`}
                            onClick={(event) => {
                                setItem(null);
                                setValidFile(false);
                            }}
                        >
                            <XCirlce className={`hidden md:block`} />
                            <div className={`btn btn-cancle text-center md:hidden`}> Clear file</div>
                        </span>
                    ) : (
                        <></>
                    )}
                </div>
            </UploadDropZone>
            {item ? (
                <div className={`flex flex-col gap-y-2`}>
                    <span className={`font-medium`}>
                        File Name: <pre className={`break-all whitespace-pre-wrap`}>{item?.file.name}</pre>
                    </span>
                    <span className={`font-medium`}>
                        File Size: <pre>{filesize(item?.file.size)}</pre>
                    </span>
                </div>
            ) : (
                <> </>
            )}
            <div className={`flex flex-col gap-y-2`}>
                <div className={`md:flex gap-x-4`}>
                    <div className={`flex flex-col gap-y-2 md:w-1/2`}>
                        <div>
                            <label htmlFor={`version`} className={`font-medium`}>
                                Version
                            </label>
                        </div>
                        <input
                            className={`p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 outline-none flex-grow dark:border-dark-700 dark-hover:border-dark-600 dark-focus:border-dark-600 dark:bg-dark-800`}
                            placeholder={`Enter version`}
                            id={"version"}
                            onChange={(event) => {
                                setValidVersion(event.target.value.length <= 20);
                            }}
                        />
                    </div>

                    <div className={`flex flex-col gap-y-2 md:w-1/2`}>
                        <div>
                            <label htmlFor={`releaseSelect`} className={`font-medium`}>
                                Release Type
                            </label>
                        </div>
                        <Select
                            isSearchable={true}
                            inputId="releaseSelect"
                            options={uploadData.releaseTypes.map((value) => {
                                return { value: value.slug, label: value.name };
                            })}
                            styles={reactSelectStyle}
                            classNamePrefix={"select"}
                            className={``}
                            ref={versionSelectRef}
                            openMenuOnFocus={true}
                            onChange={(e, meta: ActionMeta<SelectData>) => {
                                setValidReleaseType(e);
                            }}
                            filterOption={createFilter({ ignoreAccents: true }) /* This apparently makes it a bit faster */}
                        />
                    </div>
                </div>

                <div className={`md:flex gap-x-4`}>
                    <div className={`flex flex-col gap-y-2 md:w-1/2`}>
                        <div>
                            <label className={`font-medium`} htmlFor={"versionSelect"}>
                                Game Versions
                            </label>
                        </div>
                        <Select
                            isMulti={true}
                            isSearchable={true}
                            inputId="versionSelect"
                            options={displayedVersions}
                            styles={reactSelectStyle}
                            classNamePrefix={"select"}
                            className={``}
                            ref={versionSelectRef}
                            closeMenuOnSelect={false}
                            openMenuOnFocus={true}
                            onChange={(e: any) => {
                                setValidGameVersions(e && e.length > 0);
                            }}
                            filterOption={createFilter({ ignoreAccents: true }) /* This apparently makes it a bit faster */}
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
                                                setDisplayedVersions(getGameVersions());
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

                    <div className={`flex flex-col gap-y-2 md:w-1/2`}>
                        <div>
                            <label className={`font-medium`} htmlFor={"loaderSelect"}>
                                Loaders
                            </label>
                        </div>
                        <Select
                            isMulti={true}
                            isSearchable={true}
                            inputId="loaderSelect"
                            options={displayedLoaders}
                            styles={reactSelectStyle}
                            classNamePrefix={"select"}
                            className={``}
                            ref={loaderSelectRef}
                            closeMenuOnSelect={false}
                            openMenuOnFocus={true}
                            onChange={(e: any) => {
                                setValidLoaders(e && e.length > 0);
                            }}
                            filterOption={createFilter({ ignoreAccents: true }) /* This apparently makes it a bit faster */}
                        />
                    </div>
                </div>

                <div className={`gap-y-2`}>
                    <div>
                        <label className={`font-medium`} htmlFor={`changelog`}>
                            Changelog
                        </label>
                    </div>
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
                            <span className={`select-none ${!viewMode.showEdit && viewMode.showPreview ? `text-diluv-600` : ``}`}>
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
                            <span className={`select-none ${viewMode.showEdit && viewMode.showPreview ? `text-diluv-600` : ``}`}>Split View</span>
                        </div>
                    </div>
                    <div className={`${viewMode.showEdit && viewMode.showPreview ? `flex flex-col md:flex-row` : ``} h-112 md:h-80 md:h-112`}>
                        {viewMode.showEdit && (
                            <TextEditor
                                className={`border dark:border-dark-700 bg-white dark:bg-dark-800 ${
                                    viewMode.showEdit && viewMode.showPreview ? `w-full md:w-1/2 h-64 md:h-80 md:h-full` : `w-full h-full`
                                }`}
                                innerClassName={`outline-none resize-none w-full h-full p-1 dark:bg-dark-800`}
                                onChange={(e) => {
                                    setChangelog(e.target.value);
                                    if (e.target.value.length <= 2000) {
                                        setValidChangelog(true);
                                    } else {
                                        setValidChangelog(false);
                                    }
                                }}
                                maxLength={2000}
                                defaultValue={changelog}
                                id={`changelog`}
                            />
                        )}

                        {viewMode.showPreview && (
                            <div
                                className={`p-2 outline-none resize-none border dark:border-dark-700 break-all ${
                                    viewMode.showEdit && viewMode.showPreview ? `w-full md:w-1/2 h-64 md:h-80 md:h-full` : `w-full h-full`
                                } bg-white dark:bg-dark-900`}
                            >
                                <SimpleBar className={`h-full`}>
                                    <Markdown markdown={changelog} />
                                </SimpleBar>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button
                className={`btn btn-diluv w-auto mt-4`}
                onClick={(event) => {
                    uploadyContext.processPending();
                }}
                disabled={!canSubmit()}
            >
                Submit
            </button>
            <div className={`w-full p-2 ${uploading ? `block` : `hidden`}`}>
                <ProgressBar completed={progress} />
            </div>
        </div>
    );
}

const Watcher = ({
    setProgress,
    setUploading,
    setUploaded,
    setItem
}: {
    setProgress: (progress: number) => void;
    setUploading: (uploading: boolean) => void;
    setUploaded: (uploaded: boolean) => void;
    setItem: (item: BatchItem) => void;
}) => {
    useItemProgressListener((item) => {
        setProgress(item.completed);
        setItem(item);
    });
    useItemStartListener((item) => {
        setUploading(true);
        setUploaded(false);
    });
    useItemFinalizeListener((item) => {
        setUploading(false);
        setUploaded(true);
    });

    useBatchAddListener((batch) => {
        setItem(batch.items[0]);
    });

    return null;
};
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/games/${GameSlug}/${ProjectType}/${ProjectSlug}`, { session });
    const uploadData = await getAuthed(`${API_URL}/v1/games/${GameSlug}/${ProjectType}/upload`, { session });
    return {
        props: { project: data.data, uploadData: uploadData.data, session } // will be passed to the page component as props
    };
};
