import remark from "remark";
// @ts-ignore
import reactRenderer from "remark-react";
import merge from "deepmerge";
import github from "hast-util-sanitize/lib/github.json";
import html from "remark-html";
// @ts-ignore
import slug from "remark-slug";
// @ts-ignore
import headings from "remark-autolink-headings";
// @ts-ignore
import underline from "remark-underline";
// @ts-ignore
import spoiler from "remark-spoiler";
// @ts-ignore
import admonitions from "remark-admonitions";
import React from "react";

type Props = {
    markdown: string;
};

const schema = merge(github, {
    clobberPrefix: "",
    attributes: { "*": ["className"] } // Allows className through the filter
});

function Markdown({ markdown }: Props): JSX.Element {
    return (
        <div className={`markdown break-words`}>
            <>
                {
                    remark()
                        .use(slug) // GitHub like anchor slugs for headings.
                        .use(headings) // Applies references for slug anchors. May be an issue here with how it's being applied as it throws a console error.
                        .use(admonitions) // Adds support for notices/admonitions
                        .use(underline) // Adds underlined text support
                        .use(spoiler, {
                            classNames: `bg-black text-black hover:bg-transparent dark:text-white dark:bg-white dark-hover:bg-transparent`
                        }) // Adds spoiler text support
                        .use(html) // Renders previous stuff into HTML where appropriate
                        .use(reactRenderer, {
                            // Renders to react fragments.
                            sanitize: schema
                        })
                        .processSync(markdown).result
                }
            </>
        </div>
    );
}

export default Markdown;
