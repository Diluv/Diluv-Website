import React, { useState } from "react";
import Layout from "components/Layout";
import { Project } from "../../../../../../interfaces";
import ProjectInfo from "../../../../../../components/project/ProjectInfo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { API_URL, getSession } from "../../../../../../utils/api";
import { getAuthed } from "../../../../../../utils/request";
import Uploady, { useItemFinalizeListener, useItemProgressListener, useItemStartListener } from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";
import UploadButton from "@rpldy/upload-button";
import ProgressBar from "../../../../../../components/ui/ProgressBar";
import { BatchItem } from "@rpldy/shared";

export default function Upload({ project }: { project: Project; }): JSX.Element {
    let [progress, setProgress] = useState(0);
    let [uploading, setUploading] = useState(false);
    let [uploaded, setUploaded] = useState(false);

    let [item, setItem] = useState<BatchItem>();
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
                        <label htmlFor={`uploadButton`}>{uploading ?
                            <span> Uploading <code className={`inline`}>{item?.file.name}</code></span> : uploaded ?
                                <span> Uploaded <code className={`inline`}>{item?.file.name}</code></span> : `Upload File`}</label>
                        <Uploady destination={{ url: "https://4567.imja.red/v1/games" }} autoUpload={true} noPortal={true} multiple={false}>
                            <Watcher setItem={(item) => setItem(item)} setProgress={(progress) => setProgress(progress)} setUploading={(uploading) => setUploading(uploading)} setUploaded={(uploaded) => setUploaded(uploaded)} />
                            <UploadDropZone onDragOverClassName="drag-over">
                                <UploadButton id={`uploadButton`} className={`btn border w-auto bg-gray-200 dark:bg-dark-800 border-gray-300 dark:border-dark-700 mt-2`} text={"Select file"} />
                            </UploadDropZone>
                        </Uploady>
                    </div>

                    <div className={`w-full p-2 ${uploading ? `block` : `hidden`}`}>
                        <ProgressBar completed={progress} />
                    </div>
                </div>
            </>
        </Layout>
    );
}

const Watcher = ({ setProgress, setUploading, setUploaded, setItem }: { setProgress: (progress: number) => void, setUploading: (uploading: boolean) => void, setUploaded: (uploaded: boolean) => void, setItem: (item: BatchItem) => void }) => {
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

    return null;
};
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/games/${GameSlug}/${ProjectType}/${ProjectSlug}`, { session });
    return {
        props: { project: data.data, session } // will be passed to the page component as props
    };
};
