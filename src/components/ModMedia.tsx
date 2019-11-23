import * as React from 'react'
import {Media} from 'react-bootstrap';
import {Project} from "../interfaces";

type Props = {
  project: Project
}

const ModCard: React.FunctionComponent<Props> = ({project}) =>
  (
    <Media as="li">
      <img
        width={64}
        height={64}
        className="mr-3"
        src={project.logoUrl}
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>{project.name}</h5>
        <p>
          {project.summary}
        </p>
      </Media.Body>
    </Media>
  );

export default ModCard
