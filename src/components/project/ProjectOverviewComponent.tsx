import * as React from 'react'

const marked = require('marked');

//TODO We need sanitization

type Props = {
  description: string
}

const ProjectOverviewComponent: React.FunctionComponent<Props> = ({description}) =>
  (
    <div className="container pt-md-5">
      <div dangerouslySetInnerHTML={{__html: marked(description)}}>
      </div>
    </div>
  );

export default ProjectOverviewComponent
