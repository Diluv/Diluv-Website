import React from 'react';

type Props = {
  name: string
  screenshot: string
};

function GameCardComponent({
  screenshot = 'https://images.placeholders.dev/?width=348&height=225',
}: Props) {
  return (
    <div className="mb-2">
      <img
        className="w-full"
        alt="game/mod name"
        src={screenshot}
      />
    </div>
  );
}

export default GameCardComponent;
