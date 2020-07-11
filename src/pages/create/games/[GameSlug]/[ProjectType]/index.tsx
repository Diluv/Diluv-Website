import { NextPageContext } from "next";
import { get, post, postAuthed } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { getTheme } from "../../../../../utils/theme";
import { HasSession, HasTheme } from "../../../../../interfaces";
import Layout from "../../../../../components/Layout";
import React, { useContext, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import Alert from "../../../../../components/Alert";
import Markdown from "../../../../../components/Markdown";
import SimpleBar from "simplebar-react";
// @ts-ignore
import { getSession } from "next-auth/client";
import { ensureAuthed } from "../../../../../utils/auth";
import { Auth } from "../../../../../utils/context";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

export default function Index({ theme, GameSlug, ProjectType, session }: { GameSlug: string, ProjectType: string } & HasTheme & HasSession) {

    ensureAuthed(session);

    let [content, setContent] = useState("");
    let [logo, setLogo] = useState("");
    let [logoFile, setLogoFile] = useState<File>();
    let [logoErrors, setLogoErrors] = useState<string[]>([]);

    let refName = useRef<HTMLInputElement>(null);
    let [validName, setValidName] = useState(false);
    let refSummary = useRef<HTMLInputElement>(null);
    let [validSummary, setValidSummary] = useState(false);
    let refDescription = useRef<HTMLTextAreaElement>(null);
    let [validDescription, setValidDescription] = useState(false);
    let [viewMode, setViewMode] = useState({ showEdit: true, showPreview: false });
    let router = useRouter();

    function canSubmit(): boolean {
        return validName && validSummary && validDescription && logoFile;
    }

    return <Layout title={`Create ${ProjectType}`} theme={theme} session={session}>
        <div className={`w-5/6 mx-auto mt-4 mb-8`}>

            {logoErrors.length > 0 ? <div className={`my-4`}>  {logoErrors.map(value => {
                return <div key={value}>
                    <Alert type={"danger"} canDismiss={true}>
                        {value}
                    </Alert>
                </div>;
            })}</div> : <> </>}
            <div className={`grid row-gap-2 sm:row-gap-0 createFormSmall sm:createFormMedium md:createFormLarge`}>
                <div className={`w-64 h-64 mx-auto sm:mx-0`} style={{ gridArea: "image" }}>
                    <Dropzone onDrop={acceptedFiles => {
                        let file = acceptedFiles[0];
                        let u = URL.createObjectURL(file);
                        let img = new Image;
                        setLogoFile(file);
                        img.onload = function () {
                            let newLogoErrors = [];
                            if (img.width !== img.height) {
                                newLogoErrors.push(`Project Logo does not have a dimension ratio of 1:1!`);
                            }
                            if (img.width > 1024 * 8 || img.height > 1024 * 8) {
                                newLogoErrors.push(`Project Logo can not be bigger than ${1024 * 8}!`);
                            }
                            setLogoErrors(newLogoErrors);
                            if (!newLogoErrors.length) {
                                setLogo(URL.createObjectURL(acceptedFiles[0]));
                            } else {
                                setLogo("");
                            }

                        };

                        img.src = u;
                    }} accept={["image/gif", "image/jpeg", "image/png", "image/webp"]}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className={`w-64 h-64 mx-auto sm:mx-0 border-2 dark:border-dark-700 box-content cursor-pointer`}>

                                <input {...getInputProps()} />
                                {logo.length ? <img src={logo} className={`w-64 h-64 mx-auto sm:mx-0`}/> :
                                    <p className={`text-center select-none`}>Upload logo</p>}

                            </div>
                        )}
                    </Dropzone>
                </div>
                <div className={`flex flex-col md:flex-row sm:ml-4`} style={{ gridArea: "name" }}>
                    <label htmlFor={`nameField`} className={`mb-1 md:my-auto`}>
                        Project Name:
                    </label>
                    <input type={`text`} placeholder={`Enter Project Name`} id={`nameField`} ref={refName}
                           className={`md:ml-2 p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 dark:border-dark-700 dark:bg-dark-800 flex-grow outline-none`}
                           onChange={event => {
                               if (event.target.value.length >= 5 && event.target.value.length <= 50) {
                                   setValidName(true);
                               } else {
                                   setValidName(false);
                               }
                           }} maxLength={50}/>
                </div>
                <div className={`flex flex-col md:flex-row sm:ml-4`} style={{ gridArea: "summary" }}>
                    <label htmlFor={`summaryField`} className={`mb-1 md:my-auto`}>
                        Project summary:
                    </label>
                    <input type={`text`} placeholder={`Enter Project Summary`} id={`summaryField`} ref={refSummary}
                           className={`md:ml-2 p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 dark:border-dark-700 flex-grow dark:bg-dark-800 outline-none`}
                           onChange={event => {
                               if (event.target.value.length >= 10 && event.target.value.length <= 250) {
                                   setValidSummary(true);
                               } else {
                                   setValidSummary(false);
                               }
                           }} maxLength={250}/>

                </div>
                <div className={`mt-4`} style={{ gridArea: "description" }}>
                    <div className={`grid border-b-2 border-gray-300 dark:border-dark-700 grid-cols-project-info`}>
                        <div onClick={() => setViewMode({
                            showEdit: true,
                            showPreview: false
                        })}
                             className={`cursor-pointer px-2 pb-1 -mb-0.125 border-b-2 ${viewMode.showEdit && !viewMode.showPreview ? `border-diluv-500 hover:border-diluv-500` : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}`}>
                            <span
                                className={`select-none ${viewMode.showEdit && !viewMode.showPreview ? `text-diluv-600` : ``}`}>Edit Description</span>
                        </div>
                        <div onClick={() => setViewMode({
                            showEdit: false,
                            showPreview: true
                        })}
                             className={`cursor-pointer px-2 pb-1 -mb-0.125 border-b-2 ${!viewMode.showEdit && viewMode.showPreview ? `border-diluv-500 hover:border-diluv-500` : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}`}>
                            <span
                                className={`select-none ${!viewMode.showEdit && viewMode.showPreview ? `text-diluv-600` : ``}`}>Preview Description</span>
                        </div>
                        <div onClick={() => setViewMode({
                            showEdit: true,
                            showPreview: true
                        })}
                             className={`cursor-pointer px-2 pb-1 -mb-0.125 border-b-2 ${viewMode.showEdit && viewMode.showPreview ? `border-diluv-500 hover:border-diluv-500` : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}`}>
                            <span className={`select-none ${viewMode.showEdit && viewMode.showPreview ? `text-diluv-600` : ``}`}>Split View</span>
                        </div>

                    </div>
                    <div className={`${viewMode.showEdit && viewMode.showPreview ? `flex flex-col sm:flex-row` : ``} h-112 sm:h-80 md:h-112`}>
                        {viewMode.showEdit &&
                        <textarea
                            className={`outline-none resize-none border dark:border-dark-700 ${viewMode.showEdit && viewMode.showPreview ? `w-full sm:w-1/2 h-64 sm:h-80 md:h-full` : `w-full h-full`} p-1 dark:bg-dark-800`}
                            onChange={(e) => {
                                setContent(e.target.value);
                                if (e.target.value.length >= 50 && e.target.value.length <= 1000) {
                                    setValidDescription(true);
                                } else {
                                    setValidDescription(false);
                                }
                            }} defaultValue={content}
                            ref={refDescription}
                            maxLength={1000}
                        />}

                        {viewMode.showPreview &&
                        <div
                            className={`p-2 outline-none resize-none border dark:border-dark-700 break-all ${viewMode.showEdit && viewMode.showPreview ? `w-full sm:w-1/2 h-64 sm:h-80 md:h-full` : `w-full h-full`} bg-white dark:bg-dark-900`}>
                            <SimpleBar className={`h-full`}>
                                <Markdown markdown={content}/>
                            </SimpleBar>
                        </div>}
                    </div>
                </div>
                <div className={``} style={{ gridArea: "create" }}>
                    <button className={`btn-diluv sm:w-auto`} disabled={!canSubmit()} onClick={event => {
                        let headers: { Accept: string, Authorization?: string | undefined, "content-type": string } = {
                            Accept: "application/json",
                            "content-type": "multipart/form-data"
                        };
                        let formData = new FormData();
                        formData.set("name", refName.current?.value ?? "");
                        formData.set("summary", refSummary.current?.value ?? "");
                        formData.set("description", refDescription.current?.value ?? "");
                        formData.set("logo", logoFile ?? "");
                        postAuthed(`${API_URL}/v1/games/${GameSlug}/${ProjectType}`, formData, { headers: headers, session: session }).then(value => {
                            console.log(value);
                            router.push(`/games/[GameSlug]/[ProjectType]/[ProjectSlug]/`, `/games/${GameSlug}/${ProjectType}/${value.data.slug}`);
                        }).catch((reason: AxiosError) => {
                            console.log(reason.response?.data);
                        });
                    }}>
                        Create project
                    </button>
                </div>
            </div>

        </div>
    </Layout>;
}

export async function getServerSideProps(context: NextPageContext) {
    let { GameSlug, ProjectType } = context.query;

    let theme = getTheme(context);
    let session = (await getSession(context));
    return {
        props: { theme, GameSlug, ProjectType, session: session ?? null } // will be passed to the page component as props
    };
}
