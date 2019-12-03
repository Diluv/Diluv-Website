import * as React from 'react'
import {Media, Tab, Tabs} from 'react-bootstrap';
import ProjectOverviewComponent from './ProjectOverviewComponent';
import Router from 'next/router'
import ProjectFilesComponent from "./ProjectFilesComponent";
import {Project, ProjectFiles} from "../../interfaces";

type Props = {
  activeKey: string
  gameSlug: string
  projectTypesSlug: string
  projectSlug: string
  project: Project
  projectFiles?: ProjectFiles[]
}

const ProjectComponent: React.FunctionComponent<Props> = ({
                                                            activeKey = "overview",
                                                            gameSlug,
                                                            projectTypesSlug,
                                                            projectSlug,
                                                            project,
                                                            projectFiles
                                                          }) =>
  (
    <div className="container pt-md-5">
      <Media>
        <img className="mr-3" src={project.logoUrl} alt={`${project.name} Logo`}/>
        <Media.Body>
          <h2>{project.name}</h2>
          {project.summary}
        </Media.Body>
      </Media>
      <Tabs activeKey={activeKey} id={"project"}
            onSelect={(eventKey: string) => {
              if (eventKey === "overview")
                Router.push(`/games/${gameSlug}/${projectTypesSlug}/${projectSlug}`);
              else
                Router.push(`/games/${gameSlug}/${projectTypesSlug}/${projectSlug}/${eventKey}`)
            }}>
        <Tab eventKey="overview" title="Overview">
          <ProjectOverviewComponent description={project.description}/>
        </Tab>
        <Tab eventKey="files" title="Files">
          {projectFiles && <ProjectFilesComponent projectFiles={projectFiles}/>}
        </Tab>
        <Tab eventKey="issues" title="Issues">
        </Tab>
        <Tab eventKey="source" title="Source">
        </Tab>
      </Tabs>
    </div>
  );

export default ProjectComponent
