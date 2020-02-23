import React from 'react';

import Link from 'next/link';
import { Project } from '../../interfaces';

const ago = require('s-ago');

type Props = {
  activeKey: string
  gameSlug: string
  projectTypesSlug: string
  projectSlug: string
  project: Project
  permissions: string
  children: any
};

function getClass(activeName: string, key: string) {
  const css = 'inline-block border-l border-t border-r rounded-t py-2 px-4 font-bold ';
  if (activeName === key) {
    return `${css}text-diluv-600`;
  }

  return `${css}hover:text-white`;
}

function ProjectComponent({
  activeKey = '',
  gameSlug,
  projectTypesSlug,
  projectSlug,
  project,
  permissions,
  children,
}: Props) {
  return (
    <div className="container mx-auto pt-6">
      <div className="max-w-sm lg:max-w-full lg:flex pb-4">
        <div
          className="h-48 lg:h-40 lg:w-40 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url('${project.logo}'` }}
          title={project.name}
        />
        <div className="w-full lg:rounded-r p-4 pt-3 flex flex-col justify-between leading-normal pr-0">
          <div className="mb-2 flex">
            <div className="flex-grow font-bold text-3xl mb-2">{project.name}</div>
            {
              permissions === 'all' && (
                <Link href={`/games/${gameSlug}/${projectTypesSlug}/${projectSlug}/upload`}>
                  <a className="bg-diluv-500 hover:bg-diluv-700 text-white font-bold py-2 px-3 rounded m-1">
                    Upload file
                  </a>
                </Link>
              )
            }
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-base">{project.summary}</p>
              <p>
                {`Created: ${new Date(project.createdAt).toLocaleString()}`}
              </p>
              <p>
                {`Last Updated: ${ago(new Date(project.updatedAt))}`}
              </p>
              <p>
                {`Downloads: ${project.cachedDownloads}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ul className="flex border-b">
        <li className="-mb-px mr-1" key="overview">
          <Link href={`/games/${gameSlug}/${projectTypesSlug}/${projectSlug}/`}>
            <a className={getClass(activeKey, '')}>Overview</a>
          </Link>
        </li>
        <li className="-mb-px mr-1" key="files">
          <Link href={`/games/${gameSlug}/${projectTypesSlug}/${projectSlug}/files`}>
            <a className={getClass(activeKey, 'files')}>Files</a>
          </Link>
        </li>
      </ul>
      {children}
    </div>
  );
}

export default ProjectComponent;
