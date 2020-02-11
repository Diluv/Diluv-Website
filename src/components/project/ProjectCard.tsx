import * as React from 'react'
import {Project} from "../../interfaces";

const ago = require('s-ago');

type Props = {
  gameSlug: string
  projectTypeSlug: string
  project: Project
}

const ProjectCard: React.FunctionComponent<Props> = ({gameSlug, projectTypeSlug, project}) =>
  (
    <div className="max-w-sm lg:max-w-full lg:flex pb-2">
      <a key={project.slug} href={`/games/${gameSlug}/${projectTypeSlug}/${project.slug}`}>
        <div className="h-48 lg:h-40 lg:w-40 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
             style={{backgroundImage: `url('https://via.placeholder.com/150'`}}
             title={project.name}>
        </div>
      </a>
      <div
        className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-3">
          <a key={project.slug} href={`/games/${gameSlug}/${projectTypeSlug}/${project.slug}`}>
            <div className="text-gray-900 font-bold text-xl mb-2">{project.name}</div>
          </a>
          <p className="text-gray-700 text-base">{project.summary}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900">Last Updated: {ago(new Date(project.updatedAt))}</p>
            <p className="text-gray-900">Downloads: {project.cachedDownloads}</p>
          </div>
        </div>
      </div>
    </div>
  );

export default ProjectCard
