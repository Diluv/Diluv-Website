import React from 'react';
import Drop from "./icons/Drop";
import Link from "next/link";

function Footer() {

  return <>
    <footer className="text-gray-500 bg-gray-900 font-hero">
      <div className="container px-5 py-8 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-no-wrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex font-medium items-center md:justify-start justify-center text-white">
            <Drop className={`w-10 h-10`}/>
            <span className="ml-3 text-xl">Diluv</span>
          </a>
          <p className="mt-2 text-sm text-gray-600 font-sans">For modders, by modders</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/3 md:w-1/2 w-full px-4 mb-10 lg:mb-0">
            <h2 className="font-medium text-white tracking-widest text-sm mb-3">PRODUCT</h2>
            <nav className="list-none font-sans">
              <li>
                <Link href={"/news"}>
                  <a className="text-gray-600 hover:text-white">News</a>
                </Link>
              </li>
              <li>
                <a className="text-gray-600 hover:text-white" href={"https://github.com/Diluv"}>Github</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4 mb-10 lg:mb-0">
            <h2 className="font-medium text-white tracking-widest text-sm mb-3">ABOUT</h2>
            <nav className="list-none">
              <li>
                <Link href={"/about"}>
                  <a className="text-gray-600 hover:text-white">About</a>
                </Link>
              </li>
              <li>
                <Link href={"/privacy"}>
                  <a className="text-gray-600 hover:text-white">Privacy</a>
                </Link>
              </li>
              <li>
                <Link href={"/terms"}>
                  <a className="text-gray-600 hover:text-white">Terms Of Service</a>
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4 mb-10 md:mb-0">
            <h2 className="font-medium text-white tracking-widest text-sm mb-3">CONTACT</h2>
            <nav className="list-none font-sans">
              <li>
                <a className="text-gray-600 hover:text-white" href={"https://twitter.com/DiluvSupport"}>Twitter</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-white" href={"https://www.reddit.com/r/diluv/"}>Reddit</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  </>
}

export default Footer;
