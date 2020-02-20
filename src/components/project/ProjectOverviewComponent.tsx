import React from 'react';


const sanitizeHtml = require('sanitize-html');
const marked = require('marked');

marked.setOptions({
  sanitize: true,
  sanitizer: sanitizeHtml,
});

type Props = {
  description: string
};

function ProjectOverviewComponent({
  description,
}: Props) {
  return (
    <div className="container whitespace-pre-wrap" style={{ overflowWrap: 'break-word' }}>
      <div dangerouslySetInnerHTML={{ __html: marked(description) }}/>
    </div>
  );
}

export default ProjectOverviewComponent;
