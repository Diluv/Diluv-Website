import React from 'react';
import Layout from '../components/Layout';
import Alert from "../components/Alert";

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
            <div className={`w-5/6 xl:w-11/12 mx-auto xl:mx-2 text-center`}>
              <div className={`xl:w-11/12`}>
                <h3>Popular Games</h3>
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

            <div className={`w-5/6 xl:w-11/12 mx-auto xl:mx-2 mt-4 xl:mt-0 text-center`}>
              <div className={`xl:w-11/12`}>
                <h3>New Games</h3>
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
        <section id={"promoMods"} className={`w-full lg:w-5/6 mx-auto pt-10 dark:bg-gray-700`}>
          <div className={`w-5/6 xl:w-auto mx-auto xl:mx-0`}>
            <div className={`mx-2`}>
              <h3 className={`text-center`}>Featured Projects</h3>
              <div className={`lg:flex lg:flex-row lg:flex-wrap -mx-2`}>
                <div className={`lg:w-1/2 p-2`}>
                  <div className={`py-4`}>
                    <div className={`flex flex-row`}>
                      <div className={`w-24 h-24 flex-none`}>
                        <img src={`https://media.forgecdn.net/avatars/35/77/635919513306138024.jpeg`}/>
                      </div>
                      <div className={`flex-grow ml-4`}>
                        <p className={`mb-1`}>Dark Utilities by Darkhax</p>
                        <p className={`text-sm leading-tight`}>
                          This mod adds many useful and interesting blocks and items to Minecraft.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`lg:w-1/2 p-2`}>
                  <div className={`py-4`}>
                    <div className={`flex flex-row`}>
                      <div className={`w-24 h-24 flex-none`}>
                        <img src={`https://media.forgecdn.net/avatars/196/601/636886365505927366.png`}/>
                      </div>
                      <div className={`flex-grow ml-4`}>
                        <p className={`mb-1`}>Atum by TeamMetallurgy</p>
                        <p className={`text-sm leading-tight`}>
                          Journey to the sands of Atum with this new minecraft dimension mod!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`lg:w-1/2 p-2`}>
                  <div className={`py-4`}>
                    <div className={`flex flex-row`}>
                      <div className={`w-24 h-24 flex-none`}>
                        <img src={`https://media.forgecdn.net/avatars/180/203/636791763973279045.png`}/>
                      </div>
                      <div className={`flex-grow ml-4`}>
                        <p className={`mb-1`}>You've Got Mail - Twitch Integration by Jaredlll08</p>
                        <p className={`text-sm leading-tight`}>
                          Allows for viewers to buy ingame mail for streamers!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`lg:w-1/2 p-2`}>
                  <div className={`py-4`}>
                    <div className={`flex flex-row`}>
                      <div className={`w-24 h-24 flex-none`}>
                        <img src={`https://i.blamejared.com/ideUl.png`}/>
                      </div>
                      <div className={`flex-grow ml-4`}>
                        <p className={`mb-1`}>Liam's Mod by icic98</p>
                        <p className={`text-sm leading-tight`}>
                          Liam doesn't have any mods, but if he did they would be here.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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