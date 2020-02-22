import React from 'react';

type Props = {
  name: string
  screenshot: string
};

function GameCardComponent({
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
    </div>
  );
}

export default GameCardComponent;
