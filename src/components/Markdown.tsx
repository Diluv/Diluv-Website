// @ts-ignore
import reactRenderer from "remark-react";
// @ts-ignore
import slug from "remark-slug";
// @ts-ignore
import headings from "remark-autolink-headings";
import directive from "remark-directive";
import gfm from "remark-gfm";
import React from "react";
import ReactMarkdown from "react-markdown";
import visit from "unist-util-visit";
import h from "hastscript";
import { Node } from "unist";

const admonition = (className: string, type: string) => {
    // eslint-disable-next-line react/display-name
    return (elem: any) => {
        return (
            <div className={"admonition alert " + className}>
                <div className="admonition-heading"><h5><span className="admonition-icon"></span>{elem.title || type}</h5></div>
                <div className="admonition-content">{elem.children}</div>
            </div>
        );
    };
};
const components = {
    important: admonition("admonition-important alert--info", "important"),
    tip: admonition("admonition-tip alert--success", "tip"),
    note: admonition("admonition-note alert--secondary", "note"),
    warning: admonition("admonition-warning alert--danger", "warning"),
    caution: admonition("admonition-caution alert--warning", "caution")
};

function htmlDirectives() {
    return transform;

    function transform(tree: Node) {
        visit(tree, ["textDirective", "leafDirective", "containerDirective"], onDirective);
    }

    function onDirective(node: Node) {
        var data = node.data || (node.data = {});
        // @ts-ignore
        var hast = h(node.name, node.attributes);

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
    }
}


function Markdown({ markdown }: { markdown: string; }): JSX.Element {
    return (
        <div className={`markdown break-words`}>
            {/*@ts-ignore*/}
            <ReactMarkdown components={components}
                           remarkPlugins={[[gfm, { singleTilde: false }], slug, headings, directive, htmlDirectives]}>
                {markdown}
            </ReactMarkdown>
        </div>
    );
}

export default Markdown;
