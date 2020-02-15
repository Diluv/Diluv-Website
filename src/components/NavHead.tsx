import React, {useContext, useState} from "react";
import Drop from "../components/Drop"
import DropDown, {DropDownAction, DropDownItem, DropDownLink, DropDownSpacer} from "./Dropdown";
import Link from "next/link";
import {Theme} from "../utils/Contexts";

function NavHead() {

  const [showMenu, setShowMenu] = useState(false);
  let theme = useContext(Theme);
  return (
    <nav className={"flex items-center justify-between flex-wrap bg-diluv-800 px-4 py-1 font-hero"}>
      <Link href={"/"}>
        <a>
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Drop height={"50px"} width={"25px"}/>
            <span className="text-xl tracking-tight pl-2 font-hero">Diluv</span>
          </div>
        </a>
      </Link>
      <div className="block md:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-diluv-200 border-diluv-400 hover:text-white hover:border-white"
                onClick={(e) => {
                  setShowMenu(!showMenu)
                }}>
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      <div className={"w-full block flex-grow md:flex md:items-center md:w-auto" + (showMenu ? "" : " hidden")}>
        <div className="text-sm md:flex-grow">
          <Link href={"/"}><a className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer transition-colors duration-150 ease-in">Home</a></Link>
          <Link href={"/games"}><a className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer transition-colors duration-150 ease-in">Games</a></Link>
          <Link href={"/news"}><a className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer transition-colors duration-150 ease-in">News</a></Link>
        </div>
        <div className="block mt-4 md:mt-0 md:inline-block">
          <DropDown name={"Account"} className={"text-teal-200 hover:text-white transition-colors duration-200 ease-in pr-3 triangle-after-expand"}>
            <DropDownLink href={"/register"}>
              <p>Sign Up</p>
            </DropDownLink>
            <DropDownLink href={"/login"}>
              <p>Sign In</p>
            </DropDownLink>
            <DropDownSpacer/>
            <DropDownAction action={() => {
              theme.toggleTheme();
            }}>
              Change Theme
            </DropDownAction>
          </DropDown>
        </div>
      </div>
    </nav>
  );
}

export default NavHead;