import Layout from "../../components/Layout";
import Markdown from "../../components/Markdown";
import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { HasMarkdown } from "../../interfaces";
import { readAsString } from "../../utils/files";
// @ts-ignore
import { getSession } from "next-auth/client";
import { SITE_URL } from "../../utils/api";

export default function Feedback({ title, pageContents, PageName }: HasMarkdown & { PageName: string }): JSX.Element {
    return (
        <Layout
            title={title}
            canonical={`/${PageName}`}
            description={`${title} | Diluv`}
            image={`${SITE_URL}/static/diluv.png`}
            url={`/${PageName}`}
        >
            <div className={`container mx-auto my-4`}>
                <div className={`w-11/12 mx-auto`}>
                    <Markdown markdown={pageContents} />
                </div>
            </div>
        </Layout>
    );
}

const validPages: Record<string, string> = {
    feedback: "Feedback",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    conduct: "Code of Conduct",
    disclosure: "Responsible Disclosure",
    formatting: "Formatting Guide"
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { PageName = "" } = context.query;
    const pageFile = PageName.toString();
    const title = validPages[pageFile];

    const session = await getSession(context);

    if (title) {
        const pageContents = readAsString(`public/docs/${pageFile}.md`);
        return {
            props: { PageName, title, pageContents, session: session ?? null }
        };
    }

    context.res?.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    context.res?.end();
    return { props: { error: `The page ${pageFile} could not be found.` } };
};
