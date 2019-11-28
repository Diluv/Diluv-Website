import * as React from 'react'

const sanitizeHtml = require('sanitize-html');
const marked = require('marked');

marked.setOptions({
  sanitize: true,
  sanitizer: sanitizeHtml,
});

type Props = {
  description: string
}

const ProjectOverviewComponent: React.FunctionComponent<Props> = ({description}) =>
  (
    <div className="container pt-md-3">
      <div dangerouslySetInnerHTML={{__html: marked(description)}}/>
    </div>
  );

export default ProjectOverviewComponent
