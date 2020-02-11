import * as React from 'react'
import {Project, ProjectFiles} from "../../interfaces";
import Link from 'next/link';

const ago = require('s-ago');

type Props = {
  activeKey: string
  gameSlug: string
  projectTypesSlug: string
  projectSlug: string
  project: Project
  projectFiles?: ProjectFiles[]
  children: any
}

function getClass(activeName: string, key: string) {
  const css = "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold ";
  if (activeName == key) {
    return css + 'text-blue-700';
  }

  return css + 'text-blue-400 hover:text-blue-800';
}

const tabs = [{name: "Overview", key: ""}, {name: "Files", key: "files"}];
const ProjectComponent: React.FunctionComponent<Props> = ({
                                                            activeKey = "",
                                                            gameSlug,
                                                            projectTypesSlug,
                                                            projectSlug,
                                                            project,
                                                            children
                                                          }) =>
  (
    <div className="container mx-auto pt-6">
      <div className="max-w-sm lg:max-w-full lg:flex pb-2">
          <div className="h-48 lg:h-40 lg:w-40 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
               style={{backgroundImage: `url('https://via.placeholder.com/150'`}}
               title={project.name}>
          </div>
        <div
          className="w-full lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-3">
              <div className="font-bold text-3xl mb-2">{project.name}</div>
            <p className="text-base">{project.summary}</p>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="">Last Updated: {ago(new Date(project.updatedAt))}</p>
              <p className="">Downloads: {project.cachedDownloads}</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="flex border-b">
        {
          tabs.map(value => {
            return (
              <li className="-mb-px mr-1" key={value.key}>
                <Link href={`/games/${gameSlug}/${projectTypesSlug}/${projectSlug}/${value.key}`}>
                  <a className={getClass(activeKey, value.key)}>{value.name}</a>
                </Link>
              </li>
            )
          })
        }
      </ul>
      {children}
    </div>
  );

export default ProjectComponent
