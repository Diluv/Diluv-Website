import * as React from 'react'
import Layout from '../components/Layout'
import GameCard from '../components/GameCard'
import {NextPage} from 'next'

const IndexPage: NextPage = () => (
  <Layout title="Diluv">
    <div className="text-center">
      <p>
        Hi Diluv is a project.
      </p>
    </div>
    <div className="container pt-md-5">
      <h2 className="text-center ">Games</h2>
      <div className="row pt-md-5">
        {[...Array(1)].map((_, i) =>
          <div className="col-md-4 mx-auto" key={'games_' + i}>
            <GameCard summary={"Games"} url={"https://via.placeholder.com/348x225.png"}/>
          </div>
        )}
      </div>

      <h2 className="text-center pt-md-5">Featured Games</h2>
      <div className="row pt-md-5">
        {[...Array(3)].map((_, i) =>
          <div className="col-md-4" key={'featured_game_' + i}>
            <GameCard summary={"Featured Games"} url={"https://via.placeholder.com/348x225.png"}/>
          </div>
        )}
      </div>

      <h2 className="text-center pt-md-5">Featured Mods</h2>
      <div className="row pt-md-5">
        {[...Array(6)].map((_, i) =>
          <div className="col-md-4" key={'featured_mods_' + i}>
            <GameCard summary={"Featured Mods"} url={"https://via.placeholder.com/348x225.png"}/>
          </div>
        )}
      </div>
    </div>
  </Layout>
);


export default IndexPage
