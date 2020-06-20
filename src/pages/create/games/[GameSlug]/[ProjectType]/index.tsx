import { NextPageContext } from "next";
import { get } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { getTheme } from "../../../../../utils/theme";
import { HasTheme } from "../../../../../interfaces";
import Layout from "../../../../../components/Layout";
import React from "react";

export default function Index({ theme, GameSlug, ProjectType }: { GameSlug: string, ProjectType: string } & HasTheme) {
    return <Layout title={`Create ${ProjectType}`} theme={theme}>
        <div className={`w-5/6 mx-auto my-4`}>
            <div className={`grid`} style={{ gridTemplateAreas: `"image name" "image summary" "description description"`, gridTemplateColumns: `16rem auto`, gridTemplateRows: `8rem 8rem auto`}}>
                <div className={`bg-red-500 w-64 h-64`} style={{ gridArea: "image" }}>
                    Image
                </div>
                <div className={`bg-blue-500`} style={{ gridArea: "name" }}>
                    Name
                </div>
                <div className={`bg-green-500`} style={{ gridArea: "summary" }}>
                    Summary
                </div>
                <div className={`bg-purple-500`} style={{ gridArea: "description" }}>
                    description
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
