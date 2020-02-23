import React, { useContext } from 'react';
import { Theme } from "../utils/context";

type Props = {
  name: string
  screenshot: string
};

function ModCard({
  name = 'This is the default title',
  screenshot = 'https://images.placeholders.dev/?width=348&height=225',
}: Props) {
  const theme = useContext(Theme);
  return (
    <div className={"flex mb-4 box-shadow rounded border " +(theme.theme === "dark" ? "bg-dark-600 border-lighten-100" : "bg-gray-200 border-darken-100")}>
      <img
        className="w-1/2"
        alt="game/mod name"
        style={{ width: '100%' }}
        src={screenshot}
      />
      <div className="w-1/2">
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
