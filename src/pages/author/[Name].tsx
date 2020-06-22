import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { Author, HasTheme } from "../../interfaces";
import { getTheme } from "../../utils/theme";
import { get } from "../../utils/request";
import { API_URL } from "../../utils/api";

export default function ProjectIndex({ theme, author }: {author: Author} & HasTheme) {
    console.log(author);
    return (
        <Layout title={author.displayName} theme={theme}>
            <div>

            </div>
        </Layout>
    );
}


export async function getServerSideProps(context: NextPageContext) {
    let theme = getTheme(context);
    let { Name } = context.query;

    let data = await get(`${API_URL}/v1/site/author/${Name}`);
    return {
        props: { theme, author: data.data } // will be passed to the page component as props
    };
}