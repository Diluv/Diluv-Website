import * as React from 'react'
import 'bootstrap/scss/bootstrap.scss';

type Props = {
  url?: string
  summary?: string
}

const GameCard: React.FunctionComponent<Props> = ({
                                                    url = "https://via.placeholder.com/348x225.png",
                                                    summary = 'This is the default title',
                                                  }) =>
  (
    <div className="card mb-4 box-shadow">
      <img className="card-img-top" style={{height: 225, width: '100%', display: 'block'}} src={url}/>
      <div className="card-body">
        <p className="card-text">{summary}</p>
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

export default GameCard
