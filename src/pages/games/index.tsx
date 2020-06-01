import React, { FocusEvent, useState } from 'react';
import Layout from "components/Layout";
import Search from "components/icons/Search";
import Filter from "components/icons/Filter";
import { NextPageContext } from "next";
import { get } from "../../utils/request";
import { API_URL } from "../../utils/api";
import { Game } from "../../interfaces";
import Link from "next/link";
import { useRouter } from "next/router";

export default function IndexPage({ games, sorts, currentSort }: { games: Game[], sorts: string[], currentSort?: string }) {
  const [selectedField, setSelectedField] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const router = useRouter();
  function onFocus(event: FocusEvent<any>) {
    setSelectedField(event.target.id);
  }

  function onBlur() {
    setSelectedField("");
  }

  // <div className={`w-1/2 lg:w-1/6 p-2`}>
  //   <img src={"https://imja.red/diluv/minecraft-je.png"} className={`w-full`}/>
  // </div>

  let className = ``;//mx-auto md:mx-0 w-5/6 md:w-1/2 lg:w-1/4 xl:w-1/6 p-2`;
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
                <select className={`p-1 mr-16 appearance-none bg-transparent w-full`} id={`sortBox`} style={{ textIndent: "2rem" }} onFocus={onFocus} onBlur={onBlur} onChange={event => {
                  router.push(`/games?sort=${event.target.value}`, undefined,{shallow: false})
                }} defaultValue={currentSort}>
                  {sorts.map(value => {
                    return <option key={value} value={value}>{value}</option>
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className={`grid ${makeGridClass(games.length)} gap-4 my-4`} id={`gameContainer`}>
            {games.map(game => {
              return <div className={className}>
                <Link href={`/games/[GameSlug]`} as={`/games/${game.slug}`}>

                  <a>
                    <picture>
                      {game.logoURL.sources.map(value => <source key={value.src + "-" + value.type} srcSet={value.src} type={value.type}/>)}
                      <source srcSet={game.logoURL.fallback.src} type={game.logoURL.fallback.type}/>
                      <img src={game.logoURL.fallback.src} className={`w-full`}/>
                    </picture>
                  </a>

                </Link>

              </div>
            })}
          </div>
        </div>
      </>
    </Layout>
  );
}

function makeGridClass(totalCount: number): string {
  if (totalCount <= 6) {
    return `grid-cols-1 sm:grid-cols-${Math.min(2, totalCount)} md:grid-cols-${Math.min(4, totalCount)} lg:grid-cols-${Math.min(5, totalCount)} xl:grid-cols-${Math.min(6, totalCount)}`;
  }
  return `grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`;
}


export async function getServerSideProps(context: NextPageContext) {
  let { sort } = context.query;

  let games = await get(`${API_URL}/v1/games${sort ? `?sort=${sort}` : ``}`);
  return {
    props: { games: games.data.games, sorts: games.data.sort, currentSort: sort ?? `` }, // will be passed to the page component as props
  }
}