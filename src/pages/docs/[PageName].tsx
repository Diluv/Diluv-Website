import Layout from "../../components/Layout";
import Markdown from "../../components/Markdown";
import React from "react";
import { NextPageContext } from "next";
import { getTheme } from "../../utils/theme";
import { HasTheme, HasMarkdown, HasSession } from "../../interfaces";
import { readAsString } from "../../utils/files";
// @ts-ignore
import { getSession } from "next-auth/client";

export default function Feedback({ theme, title, pageContents, session }: HasTheme & HasMarkdown & HasSession) {

    return <Layout title={title} theme={theme} session={session}>
        <div className={`container mx-auto my-4`}>
            <div className={`w-11/12 mx-auto`}>
                <Markdown markdown={pageContents}/>
            </div>
        </div>
    </Layout>;
}

const validPages: Record<string, string> = {
    feedback: "Feedback",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    conduct: "Code of Conduct",
    disclosure: "Responsible Disclosure",
    formatting: "Formatting Guide"
};

export async function getServerSideProps(context: NextPageContext) {

    let { PageName = "" } = context.query;
    let pageFile = PageName.toString();
    let title = validPages[pageFile];

    let session = (await getSession(context));

    if (title) {
        let theme = getTheme(context);
        let pageContents = readAsString(`public/docs/${pageFile}.md`);
        return {
            props: { theme, title, pageContents, session: session ?? null }
        };
    }

    context.res?.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    context.res?.end();
    return { props: { error: `The page ${pageFile} could not be found.` } };
}