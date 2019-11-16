import * as React from 'react'
import 'bootstrap/scss/bootstrap.scss';

type Props = {
  name?: string
  screenshot?: string
}

const GameCard: React.FunctionComponent<Props> = ({
                                                    screenshot = "https://via.placeholder.com/348x225.png",
                                                  }) =>
  (
    <div className="card mb-4 box-shadow">
      <img className="card-img-top" alt={'game/mod name'} style={{height: 225, width: '100%', display: 'block'}} src={screenshot}/>
    </div>
  );

export default GameCard
