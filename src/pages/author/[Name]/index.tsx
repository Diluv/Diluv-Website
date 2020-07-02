import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { Author, HasTheme } from "../../../interfaces";
import { getTheme } from "../../../utils/theme";
import { get } from "../../../utils/request";
import { API_URL } from "../../../utils/api";
import moment from "moment";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";

export default function ProjectIndex({ theme, author }: { author: Author } & HasTheme) {
    return (<Layout title={author.displayName} theme={theme}>
            <div className={`container mx-auto my-8`}>
                <div className={`w-11/12 mx-auto`}>
                    <div className={`grid col-gap-2 row-gap-2 sm:row-gap-0 profilePageSmall sm:profilePageLarge`}>
                        <div className={`area-image`}>
                            <img src={author.avatarURL}/>
                        </div>
                        <div className={`area-summary`}>
                            <h3>{author.displayName}</h3>
                            <Tippy content={
                                <div
                                    className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
                                    {moment(author.createdAt).calendar()}
                                </div>} followCursor={true} plugins={[followCursor]} duration={0} hideOnClick={false}>
                                <div>
                                    Joined {moment(author.createdAt).fromNow()}
                                </div>
                            </Tippy>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}


export async function getServerSideProps(context: NextPageContext) {
    let theme = getTheme(context);
    let { Name } = context.query;

    let data = await get(`${API_URL}/v1/site/author/${Name}?page=1&limit=1&sort=new`);
    return {
        props: { theme, author: data.data } // will be passed to the page component as props
    };
}