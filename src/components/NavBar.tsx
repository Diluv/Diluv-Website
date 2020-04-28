import React, { useState } from 'react';
import Drop from "./icons/Drop";
import Link from "next/link";

function NavBar() {

  const [showingMenu, setShowingMenu] = useState(false);
  return <>
    <header className="text-gray-500 bg-diluv-900 font-hero">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row justify-between md:justify-start items-center">
        <div className={`w-full md:w-auto flex flex-row justify-between items-center`}>
          <Link href={"/"}>
            <a className="flex title-font font-medium items-center text-white md:mb-0">
              <Drop className={`w-10 h-10`}/>
              <span className="ml-3 text-xl">Diluv</span>
            </a>
          </Link>
          <button className={`border border-gray-500 hover:text-white hover:border-white p-1 block md:hidden`} onClick={() => setShowingMenu(!showingMenu)}>
            {
              showingMenu ?
                <svg className={`fill-current w-5 h-5 block md:hidden`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                </svg> : <svg className={`fill-current w-5 h-5 block md:hidden`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                </svg>
            }

          </button>
        </div>
        <div className={`md:flex-grow flex flex-col md:flex-row justify-between md:inline-flex ${showingMenu ? `block` : `hidden`}`}>
          <nav className="md:mr-auto md:ml-4 md:py-auto md:pl-4 md:border-l md:border-gray-700 flex flex-col md:flex-row flex-wrap items-center text-base justify-center">
            <Link href={"/"}>
              <a className="mr-5 hover:text-white">Home</a>
            </Link>
            <Link href={"/games"}>
              <a className="mr-5 hover:text-white">Games</a>
            </Link>
            <Link href={"/news"}>
              <a className="mr-5 hover:text-white">News</a>
            </Link>
          </nav>
          <div className="items-center items-center hover:text-white">
            Account
          </div>
        </div>

      </div>
    </header>
  </>
    ;
}

export default NavBar;