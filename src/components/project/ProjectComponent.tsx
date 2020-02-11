import * as React from 'react'
import ProjectOverviewComponent from './ProjectOverviewComponent';
import Router from 'next/router'
import ProjectFilesComponent from "./ProjectFilesComponent";
import {Project, ProjectFiles} from "../../interfaces";
import Link from 'next/link';

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
    <div className="container pt-md-5">
      <div>
        <img className="mr-3" src={project.logoUrl} alt={`${project.name} Logo`}/>
        <div>
          <h2>{project.name}</h2>
          {project.summary}
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
