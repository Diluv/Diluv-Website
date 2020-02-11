import * as React from 'react'
import {Project} from "../../interfaces";
import Link from 'next/link';

const ago = require('s-ago');

type Props = {
  activeKey: string
  gameSlug: string
  projectTypesSlug: string
  projectSlug: string
  project: Project
  children: any
}

function getClass(activeName: string, key: string) {
  const css = "inline-block border-l border-t border-r rounded-t py-2 px-4 font-semibold ";
  if (activeName == key) {
    return css + 'text-diluv-600';
  }

  return css + 'hover:text-white';
}

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
      <div className="max-w-sm lg:max-w-full lg:flex pb-4">
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
              <p>Created: {new Date(project.createdAt).toLocaleString()}</p>
              <p>Last Updated: {ago(new Date(project.updatedAt))}</p>
              <p>Downloads: {project.cachedDownloads}</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="flex border-b">
        <li className="-mb-px mr-1" key="overview">
          <Link href={`/games/${gameSlug}/${projectTypesSlug}/${projectSlug}/`}>
            <a className={getClass(activeKey, "")}>Overview</a>
          </Link>
        </li>
        <li className="-mb-px mr-1" key="files">
          <Link href={`/games/${gameSlug}/${projectTypesSlug}/${projectSlug}/files`}>
            <a className={getClass(activeKey, "files")}>Files</a>
          </Link>
        </li>
      </ul>
      {children}
    </div>
  );

export default ProjectComponent
