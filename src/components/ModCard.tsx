import React, { useContext } from 'react';
import { Theme } from "../utils/context";

type Props = {
  name: string
  author: string
  screenshot: string
  summary: string
};

function ModCard({
  name = 'This is the default title',
  author = "Creator",
  screenshot = 'https://images.placeholders.dev/?width=348&height=225',
  summary = "This is the summary"
}: Props) {
  const theme = useContext(Theme);
  return (
    <div className={"flex border " + (theme.theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-100 shadow-light" : "bg-gray-300 border-gray-500 text-black shadow")}>
      <div className={"flex flex-col w-full"}>
        <p className={"font-light text-xs text-center py-2 border-b border-darken-200 bg-darken-200"}><span className="font-bold text-lg">{name}</span> by <span className={"text-sm"}>{author}</span></p>
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
