import React, {useState} from "react";
import Drop from "../components/Drop"
import DropDown, {DropDownItem, DropDownSpacer} from "./Dropdown";

function NavHead() {

  const [showMenu, setShowMenu] = useState(true);
  return (<nav className={"flex items-center justify-between flex-wrap bg-blue-500 px-4 py-1 h-16"}>
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
    {/*{showMenu && <div className={"block lg:hidden"}>*/}

    {/*  <div className={"flex flex-row "}>*/}
    {/*    <div className={"px-4 "}>*/}
    {/*      asd*/}
    {/*    </div>*/}
    {/*    <div className={"px-4 "}>*/}
    {/*      dsa*/}
    {/*    </div>*/}
    {/*    <div className={"px-4 "}>*/}
    {/*      fgh*/}
    {/*    </div>*/}
    {/*  </div>*/}

    {/*</div>}*/}
    <div className="w-full block flex-grow md:flex md:items-center md:w-auto">
      <div className="text-sm md:flex-grow">
        <a href="#responsive-header" className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
          Home
        </a>
        <a href="#responsive-header" className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
          Games
        </a>
        <a href="#responsive-header" className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white">
          News
        </a>
      </div>
      <div>
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