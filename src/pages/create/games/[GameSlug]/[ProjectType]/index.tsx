import { NextPageContext } from "next";
import { get } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { getTheme } from "../../../../../utils/theme";
import { HasTheme } from "../../../../../interfaces";
import Layout from "../../../../../components/Layout";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Alert from "../../../../../components/Alert";
import Markdown from "../../../../../components/Markdown";

export default function Index({ theme, GameSlug, ProjectType }: { GameSlug: string, ProjectType: string } & HasTheme) {
    let [content, setContent] = useState("");
    let [logo, setLogo] = useState("");
    let [logoErrors, setLogoErrors] = useState<string[]>([]);

    let [viewMode, setViewMode] = useState({ showEdit: true, showPreview: false });
    return <Layout title={`Create ${ProjectType}`} theme={theme}>
        <div className={`w-5/6 mx-auto my-4`}>
            <div className={`my-4`}>
                {logoErrors.map(value => {
                    return <div key={value}>
                        <Alert type={"danger"} canDismiss={true}>
                            {value}
                        </Alert>
                    </div>;
                })}
            </div>
            <div className={`grid`} style={{
                gridTemplateAreas: `"image name" "image space" "image summary" "image ." "description description" ". ." "create ."`,
                gridTemplateColumns: `16rem auto`,
                gridTemplateRows: `2rem 0.5rem 2rem 11.5rem minmax(28rem, auto) 3rem 2rem`
            }}>
                <div className={`w-64 h-64`} style={{ gridArea: "image" }}>
                    <Dropzone onDrop={acceptedFiles => {
                        let file = acceptedFiles[0];
                        let u = URL.createObjectURL(file);
                        let img = new Image;

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
                            <div {...getRootProps()} className={`w-64 h-64 border-2 box-content cursor-pointer`}>

                                <input {...getInputProps()} />
                                {logo.length ? <img src={logo} className={`w-64 h-64`}/> :
                                    <p className={`text-center select-none`}>Upload logo</p>}

                            </div>
                        )}
                    </Dropzone>
                </div>
                <div className={`flex ml-4`} style={{ gridArea: "name" }}>
                    <label htmlFor={`nameField`} className={`my-auto`}>
                        Project Name:
                    </label>
                    <input type={`text`} placeholder={`Enter Project Name`} id={`nameField`} className={`ml-2 p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 flex-grow text-black outline-none`}/>
                </div>
                <div className={`flex ml-4`} style={{ gridArea: "summary" }}>
                    <label htmlFor={`summaryField`} className={`my-auto`}>
                        Project summary:
                    </label>
                    <input type={`text`} placeholder={`Enter Project Summary`} id={`summaryField`} className={`ml-2 p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 flex-grow text-black outline-none`}/>

                </div>
                <div className={`mt-4`} style={{ gridArea: "description" }}>
                    <div className={`grid border-b-2 border-gray-300 dark:border-dark-700 grid-cols-project-info`}>
                        <div onClick={() => setViewMode({
                            showEdit: true,
                            showPreview: false
                        })} className={`cursor-pointer px-2 pb-1 -mb-0.125 border-b-2 ${viewMode.showEdit && !viewMode.showPreview ? `border-diluv-500 hover:border-diluv-500` : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}`}>
                            <span className={`select-none ${viewMode.showEdit && !viewMode.showPreview ? `text-diluv-600` : ``}`}>Edit Description</span>
                        </div>
                        <div onClick={() => setViewMode({
                            showEdit: false,
                            showPreview: true
                        })} className={`cursor-pointer px-2 pb-1 -mb-0.125 border-b-2 ${!viewMode.showEdit && viewMode.showPreview ? `border-diluv-500 hover:border-diluv-500` : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}`}>
                            <span className={`select-none ${!viewMode.showEdit && viewMode.showPreview ? `text-diluv-600` : ``}`}>Preview Description</span>
                        </div>
                        <div onClick={() => setViewMode({
                            showEdit: true,
                            showPreview: true
                        })} className={`cursor-pointer px-2 pb-1 -mb-0.125 border-b-2 ${viewMode.showEdit && viewMode.showPreview ? `border-diluv-500 hover:border-diluv-500` : `dark:border-dark-700 hover:border-diluv-300 dark-hover:border-diluv-700`}`}>
                            <span className={`select-none ${viewMode.showEdit && viewMode.showPreview ? `text-diluv-600` : ``}`}>Split View</span>
                        </div>

                    </div>
                    <div className={`${viewMode.showEdit && viewMode.showPreview ? `flex` : ``} h-full`}>
                        {viewMode.showEdit &&
                        <textarea className={`outline-none resize-none border ${viewMode.showEdit && viewMode.showPreview ? `w-1/2` : `w-full`} h-full p-1`} onChange={(e) => {
                            setContent(e.target.value);
                        }} defaultValue={content}/>}

                        {viewMode.showPreview &&
                        <div className={`p-2 outline-none resize-none border ${viewMode.showEdit && viewMode.showPreview ? `w-1/2` : `w-full`} h-full bg-white`}>
                            <Markdown markdown={content}/>
                        </div>}
                    </div>
                </div>
                <div className={``} style={{ gridArea: "create" }}>
                    <button className={`btn-diluv w-auto`}>
                        Create project
                    </button>
                </div>
            </div>

        </div>
    </Layout>;
}

export async function getServerSideProps(context: NextPageContext) {
    let { GameSlug, ProjectType } = context.query;

    let featured = await get(`${API_URL}/v1/site`);
    let theme = getTheme(context);
    return {
        props: { theme, GameSlug, ProjectType } // will be passed to the page component as props
    };
}
