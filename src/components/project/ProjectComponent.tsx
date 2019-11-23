import * as React from 'react'
import {Tab, Tabs} from 'react-bootstrap';
import ProjectOverviewComponent from './ProjectOverviewComponent';
import Router from 'next/router'
import ProjectFilesComponent from "./ProjectFilesComponent";
import {Project} from "../../interfaces";

type Props = {
  activeKey?: string
  project: Project
}

const ProjectComponent: React.FunctionComponent<Props> = ({
                                                            activeKey = "overview",
                                                            project
                                                          }) =>
  (
    <div className="container pt-md-5">
      <div>
        Card data
      </div>
      {/* TODO Fix currently hard coded*/}
      <Tabs activeKey={activeKey} id={"project"}
            onSelect={(eventKey: string) => {
              if (eventKey === "overview")
                Router.push(`/games/${'minecraft'}/${'mods'}/${'bookshelf'}`);
              else
                Router.push(`/games/${'minecraft'}/${'mods'}/${'bookshelf'}/${eventKey}`)
            }}>
        <Tab eventKey="overview" title="Overview">
          <ProjectOverviewComponent description={project.description}/>
        </Tab>
        <Tab eventKey="files" title="Files">
          <ProjectFilesComponent/>
        </Tab>
        <Tab eventKey="issues" title="Issues">
        </Tab>
        <Tab eventKey="source" title="Source">
        </Tab>
      </Tabs>
    </div>
  );

export default ProjectComponent
