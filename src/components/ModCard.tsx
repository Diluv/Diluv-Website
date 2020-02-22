import React from 'react';

type Props = {
  name: string
  screenshot: string
};

function ModCard({
  name = 'This is the default title',
  screenshot = 'https://images.placeholders.dev/?width=348&height=225',
}: Props) {
  return (
    <div className="card mb-4 box-shadow">
      <img
        className="card-img-top"
        alt="game/mod name"
        style={{ height: 225, width: '100%', display: 'block' }}
        src={screenshot}
      />
      <div className="card-body">
        <p className="card-text">{name}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
          </div>
          <small className="text-muted">9 mins</small>
        </div>
      </div>
    </div>
  );
}

export default ModCard;
