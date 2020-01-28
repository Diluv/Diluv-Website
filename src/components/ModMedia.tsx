import * as React from 'react'
import {Project} from "../interfaces";

type Props = {
  project: Project
}

const ModCard: React.FunctionComponent<Props> = ({project}) =>
  (
    <div></div>
    // <Media as="li">
    //   <img
    //     width={64}
    //     height={64}
    //     className="mr-3"
    //     src={project.logoUrl}
    //     alt="Generic placeholder"
    //   />
    //   <Media.Body>
    //     <h5>{project.name}</h5>
    //     <p>
    //       {project.summary}
    //     </p>
    //   </Media.Body>
    // </Media>
  );

export default ModCard
