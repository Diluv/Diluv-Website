import React, { FocusEvent, useState } from 'react';
import Layout from "components/Layout";
import Search from "components/icons/Search";
import Filter from "components/icons/Filter";

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

  // <div className={`w-1/2 lg:w-1/6 p-2`}>
  //   <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
  // </div>

  let className = `mx-auto w-5/6 md:w-1/2 lg:w-1/4 xl:w-1/6 p-2`;
  return (
    <Layout title="Games">
      <>
        <div id={"header"} className={`text-center my-4 w-full lg:w-5/6 mx-auto`}>
          <h1 className={`text-3xl`}>Games</h1>
        </div>

        <div className={`mx-auto w-5/6 md:w-4/6`}>
          <div className={`flex justify-between w-5/6 md:w-full mx-auto`} id={`filter options`}>
            <div className={`w-1/3 flex`}>
              <label htmlFor={`searchGames`} className={`flex-none my-auto`}>
                Search
              </label>
              <div className={"relative my-auto flex-grow ml-1"}>
                <Search className={`ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-opacity duration-300 ${search.trim().length ? `text-diluv-500` : ``} ${selectedField === "searchGames" ? "opacity-0 ease-out" : "opacity-100 ease-in"}`} width={"1rem"} height={"1rem"}/>
                <input className={"p-1 bg-transparent"} type={"text"} placeholder={"Search games"} id={"searchGames"} style={{ textIndent: "2rem" }} onFocus={onFocus} onBlur={onBlur} onChange={event => setSearch(event.target.value)}/>
              </div>
            </div>
            <div className={`w-1/3 flex justify-end`}>
              <label htmlFor={`sortGames`} className={`flex-none ml-auto my-auto`}>
                Sort:
              </label>
              <div className={"relative flex-grow ml-1"}>
                <Filter className={`pointer-events-none ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-colours duration-300 ease-in-out ${selectedField === "sortBox" ? "text-diluv-500" : ""}`} width={"1rem"} height={"1rem"}/>
                <select className={`p-1 mr-16 appearance-none bg-transparent w-full`} id={`sortBox`} style={{ textIndent: "2rem" }} onFocus={onFocus} onBlur={onBlur} onChange={event => setSort(event.target.value)}>
                  <option className={`text-black`}>
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
          <div className={`flex flex-wrap`} id={`gameContainer`}>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>
            <div className={className}>
              <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
            </div>

          </div>
        </div>
      </>
    </Layout>
  );
}