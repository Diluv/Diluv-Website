import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { HasTheme } from "../../interfaces";
import { getTheme } from "../../utils/theme";

export default function ProjectIndex({ theme, name }: { name: string } & HasTheme) {

    return (
        <Layout title={name} theme={theme}>
            <>
                {name}
            </>
        </Layout>
    );
}


export async function getServerSideProps(context: NextPageContext) {
    let theme = getTheme(context);
    let { Name } = context.query;
    console.log(Name);
    return {
        props: { theme, name: Name } // will be passed to the page component as props
    };
}