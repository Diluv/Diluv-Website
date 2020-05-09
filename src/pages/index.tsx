import React from 'react';
import Layout from '../components/Layout';
import FeaturedProjectCard from "../components/index/FeaturedProjectCard";

export default function IndexPage() {
  return (
    <Layout title="Diluv">
      <>
        <section id={"intro"} className={`text-center mt-4 mb-6 w-full lg:w-5/6 mx-auto`}>
          <div className={`w-5/6 xl:w-auto mx-auto xl:mx-0`}>
            <h1 className={`text-3xl`}>Welcome to Diluv</h1>
            <h3 className={`text-xl`}>Diluv is a hosting platform dedicated to fan-made gaming content. We aim to support players and creators of all
              gaming communities.</h3>
            <h3 className={`text-xl`}>We are currently home to {`{$project_count}`} and {`{$author_count}`} authors.</h3>
          </div>
        </section>
        <section id={"promoGames"} className={`w-full lg:w-5/6 mx-auto`}>
          <div className={`xl:flex xl:flex-row justify-between`}>
            <div className={`w-5/6 xl:w-11/12 mx-auto text-center`}>
              <div className={`xl:w-11/12 mx-auto`}>
                <h3 className={`border-b-2 pb-1`}>Popular Games</h3>
                <div className={`flex flex-row flex-wrap -mx-2`}>
                  <div className={`w-1/2 lg:w-1/3 p-2`}>
                    <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
                  </div>
                  <div className={`w-1/2 lg:w-1/3 p-2 `}>
                    <img src={"https://imja.red/diluv/factorio.png"} className={`w-full`}/>
                  </div>
                  <div className={`w-1/2 lg:w-1/3 p-2 `}>
                    <img src={"https://imja.red/diluv/rimworld.png"} className={`w-full`}/>
                  </div>
                  <div className={`w-1/2 lg:w-1/3 p-2 `}>
                    <img src={"https://imja.red/diluv/sdv_night.png"} className={`w-full`}/>
                  </div>
                  <div className={`w-1/2 lg:w-1/3 p-2 `}>
                    <img src={"https://imja.red/diluv/slay_the_spire.png"} className={`w-full`}/>
                  </div>
                  <div className={`w-1/2 lg:w-1/3 p-2 `}>
                    <img src={"https://imja.red/diluv/terraria_forrest.png"} className={`w-full`}/>
                  </div>
                </div>
              </div>
            </div>

            <div className={`w-5/6 xl:w-11/12 mx-auto mt-4 xl:mt-0 text-center`}>
              <div className={`xl:w-11/12 mx-auto`}>
                <h3 className={`border-b-2 pb-1`}>New Games</h3>
                <div className={`flex flex-row flex-wrap -mx-2`}>
                  <div className={`w-1/2 lg:w-1/3 p-2`}>
                    <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
                  </div>
                  <div className={`w-1/2 lg:w-1/3 p-2 `}>
                    <img src={"https://imja.red/diluv/factorio.png"} className={`w-full`}/>
                  </div>
                  <div className={`w-1/2 lg:w-1/3 p-2 `}>
                    <img src={"https://imja.red/diluv/rimworld.png"} className={`w-full`}/>
                  </div>
                  <div className={`w-1/2 lg:w-1/3 p-2 `}>
                    <img src={"https://imja.red/diluv/sdv_night.png"} className={`w-full`}/>
                  </div>
                  <div className={`w-1/2 lg:w-1/3 p-2 `}>
                    <img src={"https://imja.red/diluv/slay_the_spire.png"} className={`w-full`}/>
                  </div>
                  <div className={`w-1/2 lg:w-1/3 p-2 `}>
                    <img src={"https://imja.red/diluv/terraria_forrest.png"} className={`w-full`}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id={"promoMods"} className={`w-full lg:w-5/6 mx-auto pt-10`}>
          <div className={`w-5/6 xl:w-auto mx-auto xl:mx-0`}>
            <div className={`mx-2`}>
              <h3 className={`text-center border-b-2 pb-1`}>Featured Projects</h3>
              <div className={`lg:flex lg:flex-row lg:flex-wrap -mx-2`}>
                <FeaturedProjectCard project={{
                  id: 1,
                  name: 'Dark Utilities',
                  contributors: [{ userId: 2, username: 'Darkhax', role: 'owner' }],
                  slug: '',
                  summary: 'This mod adds many useful and interesting blocks and items to Minecraft.',
                  description: '',
                  logo: 'https://media.forgecdn.net/avatars/35/77/635919513306138024.jpeg',
                  downloads: 0,
                  createdAt: 0,
                  updatedAt: 0,
                }}/>
                <FeaturedProjectCard project={{
                  id: 2,
                  name: 'Atum',
                  contributors: [{ userId: 2, username: 'TeamMetallurgy', role: 'owner' }],
                  slug: 'atum',
                  summary: 'Journey to the sands of Atum with this new minecraft dimension mod!',
                  description: '',
                  logo: 'https://media.forgecdn.net/avatars/196/601/636886365505927366.png',
                  downloads: 0,
                  createdAt: 0,
                  updatedAt: 0,
                }}/>
                <FeaturedProjectCard project={{
                  id: 3,
                  name: 'You\'ve Got Mail - Twitch Integration',
                  contributors: [{ userId: 1, username: 'Jaredlll08', role: 'owner' }],
                  slug: '',
                  summary: 'Allows for viewers to buy ingame mail for streamers!',
                  description: '',
                  logo: 'https://media.forgecdn.net/avatars/180/203/636791763973279045.png',
                  downloads: 0,
                  createdAt: 0,
                  updatedAt: 0,
                }}/>
                <FeaturedProjectCard project={{
                  id: 4,
                  name: 'Liam\'s Mod',
                  contributors: [{   userId: 2, username: 'icic98', role: 'owner' }],
                  slug: '',
                  summary: 'Liam doesn\'t have any mods, but if he did they would be here.',
                  description: '',
                  logo: 'https://i.blamejared.com/ideUl.png',
                  downloads: 0,
                  createdAt: 0,
                  updatedAt: 0
                }}/>
              </div>
            </div>
          </div>
        </section>

        <section id={"diluvAccounts"} className={`w-full lg:w-5/6 mx-auto text-center my-10`}>
          <div className={`w-5/6 xl:w-auto mx-auto xl:mx-0`}>
            <h2 className={`text-2xl pb-4`}>Diluv Accounts</h2>
            <h4 className={`pb-4`}>It looks like you're not logged in! We recommend using a Diluv account to get the best user experience. Creating an
              account is free and provides many benefits!</h4>
            <h4 className={``}>No Download Limits</h4>
            <h4 className={``}>Less Capchas</h4>
            <h4 className={``}>Post Your Own Projects</h4>
            <h4 className={``}>Rate and Review Projects</h4>
          </div>
        </section>
      </>
    </Layout>
  );
}