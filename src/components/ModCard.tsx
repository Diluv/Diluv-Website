import React, { useContext } from "react";
import { Theme } from "../utils/context";
import { Contributors } from "../interfaces";

type Props = {
    name: string
    contributors: Contributors[]
    screenshot: string
    summary: string
};

function ModCard({
    name = "This is the default title",
    contributors = [],
    screenshot = "https://images.placeholders.dev/?width=348&height=225",
    summary = "This is the summary"
}: Props) {
    const theme = useContext(Theme);
    return (
        <div className={"flex border border-darken-200 " + (theme.theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-black")}>
            <div className={"flex flex-col w-full"}>
                <p className={"font-light text-xs text-center py-2 border-b border-darken-200 bg-darken-200"}><span
                    className="font-bold text-lg">{name}</span> by <span
                    className={"text-sm"}>{contributors.filter(value => value.role = "Owner").shift()?.username}</span></p>
                <div className={"flex flex-row"}>
                    <img
                        className="w-5/12 mr-2"
                        alt="game/mod name"
                        src={screenshot}
                    />
                    <div className="w-7/12 mt-1">
                        <p className={"text-sm"}>{summary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModCard;
