import Layout from "../../components/Layout";
import Markdown from '../../components/Markdown'
import React from "react";
import { NextPageContext } from "next";
import { getTheme } from "../../utils/theme";
import { HasTheme, HasMarkdown } from "../../interfaces";
import { readAsString } from '../../utils/files';

export default function Feedback({ theme, title, pageContents}: HasTheme & HasMarkdown) {

    return <Layout title={title} theme={theme}>
        <div className={`w-1/2 mx-auto my-4`}>
            <Markdown markdown = {pageContents}/>
        </div>
    </Layout>;
}

const validPages: Record<string, string> = {
    feedback: "Feedback",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    conduct: "Code of Conduct",
    disclosure: "Responsible Disclosure"
};

export async function getServerSideProps(context: NextPageContext) {

    let {PageName = ""} = context.query;
    let pageFile = PageName.toString();
    let title = validPages[pageFile];

    if (title) {
        let theme = getTheme(context);
        let pageContents = readAsString(`src/docs/${pageFile}.md`);
        return { props: { theme, title, pageContents} };
    }

    context.res?.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    context.res?.end();
    return { props: { error: `The page ${pageFile} could not be found.`} }
}