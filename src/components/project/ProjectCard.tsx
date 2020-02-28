import React from 'react';
import { Project } from '../../interfaces';

const ago = require('s-ago');

type Props = {
  gameSlug: string
  projectTypeSlug: string
  project: Project
};

function ProjectCard({ gameSlug, projectTypeSlug, project }: Props) {
  return (
    <div className="max-w-sm lg:max-w-full lg:flex pb-2">
      <a key={project.slug} href={`/games/${gameSlug}/${projectTypeSlug}/${project.slug}`}>
        <div
          className="h-48 lg:h-40 lg:w-40 flex-none border-l border-t border-b border-r
          bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url('${project.logo}'` }}
          title={project.name}
        />
      </a>
      <div
        className="border-r border-b border-l border-gray-400 lg:border-l-0
        lg:border-t lg:border-gray-400 rounded-b lg:rounded-b-none lg:rounded-r p-4 pt-3 flex flex-col justify-between leading-normal"
      >
        <div className=" mb-2">
          <a key={project.slug} href={`/games/${gameSlug}/${projectTypeSlug}/${project.slug}`}>
            <div className=" hover:text-diluv-500 font-bold text-xl mb-1 transition-colors duration-100 ease-in">{project.name}</div>
          </a>
          <p className=" text-base">{project.summary}</p>
        </div>
        <div className=" flex items-center">
          <div className=" text-sm">
            <p>
              {`Created: ${new Date(project.createdAt).toLocaleString()}`}
            </p>
            <p>
              {`Last Updated: ${ago(new Date(project.updatedAt))}`}
            </p>
            <p>
              {`Downloads: ${project.downloads}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
