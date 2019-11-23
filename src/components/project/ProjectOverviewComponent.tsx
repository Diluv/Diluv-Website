import * as React from 'react'
import Markdown from 'markdown-to-jsx';

type Props = {
  description: string
}

const ProjectOverviewComponent: React.FunctionComponent<Props> = ({description}) =>
  (
    <div className="container pt-md-5">
      <Markdown>
        {description}
      </Markdown>
    </div>
  );

export default ProjectOverviewComponent
