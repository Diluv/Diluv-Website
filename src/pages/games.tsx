import React, { useState, FocusEvent } from 'react';
import Layout from '../components/Layout';
import Search from "../components/icons/Search";
import Filter from "../components/icons/Filter";

export default function IndexPage() {
  const [selectedField, setSelectedField] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  function onFocus(event: FocusEvent<any>) {
    setSelectedField(event.target.id);
  }

  function onBlur() {
    setSelectedField("");
  }


  return (
    <Layout title="Games">
      <>
        <section id={"header"} className={`text-center my-4 w-full lg:w-5/6 mx-auto`}>
          <h1 className={`text-3xl`}>Games</h1>
        </section>
        <section className={`w-4/6 mx-auto`}>
          <div className={`w-5/6 xl:w-11/12 mx-auto xl:mx-2`}>
            <div className={``}>
              <div className={`flex flex-row justify-between`}>
                <div className={`flex flex-row`}>
                  <label className={"p-1 pr-2 my-auto font-bold"} htmlFor={"searchBox"}>Search games: </label>
                  <div className={"relative my-auto"}>
                    <Search className={`ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-opacity duration-300 ${search.trim().length ? `text-diluv-500` : ``} ${selectedField === "searchBox" ? "opacity-0 ease-out" : "opacity-100 ease-in"}`} width={"1rem"} height={"1rem"}/>
                    <input className={"p-1 bg-transparent "} type={"text"} placeholder={"Search games"} id={"searchBox"} style={{ textIndent: "2rem" }} onFocus={onFocus} onBlur={onBlur} onChange={event => setSearch(event.target.value)}/>
                  </div>
                </div>
                <div>
                  <div className={`flex flex-row`}>
                    <label className={"p-1 pr-2 my-auto font-bold"} htmlFor={"sortBox"}>Sort: </label>
                    <div className={"relative my-auto"}>
                      <Filter className={`pointer-events-none ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-colours duration-300 ease-in-out ${selectedField === "sortBox" ? "text-diluv-500" : ""}`} width={"1rem"} height={"1rem"}/>
                      <select className={`p-1 mr-16 appearance-none bg-transparent w-full`} id={`sortBox`} style={{ textIndent: "2rem" }} onFocus={onFocus} onBlur={onBlur} onChange={event => setSearch(event.target.value)}>
                        <option className={`text-black `}>
                          Popularity
                        </option>
                        <option className={`text-black`}>
                          Alphabetical
                        </option>
                        <option className={`text-black`}>
                          Date Added
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        <section id={"games"} className={`w-4/6 mx-auto`}>
          <div className={`w-5/6 xl:w-11/12 mx-auto text-center`}>
            <div className={`flex flex-row flex-wrap -mx-2`}>
              <div className={`w-1/2 lg:w-1/6 p-2`}>
                <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
              </div>
              <div className={`w-1/2 lg:w-1/6 p-2 `}>
                <img src={"https://imja.red/diluv/factorio.png"} className={`w-full`}/>
              </div>
              <div className={`w-1/2 lg:w-1/6 p-2 `}>
                <img src={"https://imja.red/diluv/rimworld.png"} className={`w-full`}/>
              </div>
              <div className={`w-1/2 lg:w-1/6 p-2 `}>
                <img src={"https://imja.red/diluv/sdv_night.png"} className={`w-full`}/>
              </div>
              <div className={`w-1/2 lg:w-1/6 p-2 `}>
                <img src={"https://imja.red/diluv/slay_the_spire.png"} className={`w-full`}/>
              </div>
              <div className={`w-1/2 lg:w-1/6 p-2 `}>
                <img src={"https://imja.red/diluv/terraria_forrest.png"} className={`w-full`}/>
              </div>

              <div className={`w-1/2 lg:w-1/6 p-2 `}>
                <img src={"https://imja.red/diluv/terraria_forrest.png"} className={`w-full`}/>
              </div>
              <div className={`w-1/2 lg:w-1/6 p-2 `}>
                <img src={"https://imja.red/diluv/slay_the_spire.png"} className={`w-full`}/>
              </div>
              <div className={`w-1/2 lg:w-1/6 p-2 `}>
                <img src={"https://imja.red/diluv/sdv_night.png"} className={`w-full`}/>
              </div>
              <div className={`w-1/2 lg:w-1/6 p-2 `}>
                <img src={"https://imja.red/diluv/factorio.png"} className={`w-full`}/>
              </div>
              <div className={`w-1/2 lg:w-1/6 p-2 `}>
                <img src={"https://imja.red/diluv/rimworld.png"} className={`w-full`}/>
              </div>
              <div className={`w-1/2 lg:w-1/6 p-2`}>
                <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
              </div>


            </div>

          </div>
        </section>

      </>
    </Layout>
  );
}