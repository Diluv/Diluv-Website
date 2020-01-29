import React, {useState} from "react";
import Drop from "../components/Drop"
import DropDown, {DropDownItem, DropDownSpacer} from "./Dropdown";
import Link from "next/link";

function NavHead() {

  const [showMenu, setShowMenu] = useState(false);
  return (<nav className={"flex items-center justify-between flex-wrap bg-blue-500 px-4 py-1"}>
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <Drop className={"fill-current text-red-500 hover:text-teal-500"} height={"54px"} width={"27px"}/>
      <span className="text-xl tracking-tight pl-2 font-hero">diluv</span>
    </div>
    <div className="block md:hidden">
      <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
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
        <Link href={"/"}><p className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">Home</p></Link>
        <Link href={"/games"}><p className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">Games</p></Link>
        <Link href={"/news"}><p className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">News</p></Link>
      </div>
      <div className="block mt-4 md:inline-block">
        <DropDown name={"Account"} className={"text-teal-200"}>
          <DropDownItem>
            <a href={"/register"} className={"no-underline"}>Sign Up</a>
          </DropDownItem>
          <DropDownItem>
            <a href={"/login"} className={"no-underline"}>Sign In</a>
          </DropDownItem>
        </DropDown>
      </div>
    </div>


  </nav>);
}

export default NavHead;