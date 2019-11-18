import * as React from 'react'
import 'bootstrap/scss/bootstrap.scss';

type Props = {
  name?: string
  screenshot?: string
}

const ModCard: React.FunctionComponent<Props> = ({
                                                    name = 'This is the default title',
                                                    screenshot = "https://via.placeholder.com/348x225.png",
                                                  }) =>
  (
    <div className="card mb-4 box-shadow">
      <img className="card-img-top" alt={'game/mod name'} style={{height: 225, width: '100%', display: 'block'}} src={screenshot}/>
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

export default ModCard
