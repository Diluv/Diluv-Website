import React, {useContext} from "react";
import Drop from "../components/Drop"
import {Theme} from "../utils/Contexts";

function Footer() {

  const year = new Date().getFullYear();

  let theme = useContext(Theme);
  let themeBgClass = "bg-gray-300";
  if (theme.theme === "dark") {
    themeBgClass = "bg-dark-600";
  }
  return (<footer className={"pt-4 py-md-5 md:pt-5 pb-8 font-hero " + themeBgClass}>
    <div className={"flex flex-wrap justify-center text-center md:text-left"}>
      <div className="w-1/2 pt-2 md:w-1/6 md:ml-auto text-center md:text-left">
        <Drop className={"mx-auto md:mx-0"} height={"54px"} width={"27px"}/>
        <small className="mb-3 text-gray-600 mx-auto md:mx-0">© {year}</small>
      </div>
      <div className="w-1/2 pt-2 md:w-1/6">
        <h5 className={"text-xl font-bold pb-2"}>Product</h5>
        <ul className="list-none items-center">
          <li><a href="/news" className={" hover:text-white transition-colors duration-150 ease-in"}>News</a></li>
          {
            false && (
              <li><a href="https://ideas.diluv.com" className={"hover:text-white transition-colors duration-150 ease-in"}>Feedback</a></li>
            )
          }
          {
            false && (
              <li><a href="https://blog.diluv.com" className={"hover:text-white transition-colors duration-150 ease-in"}>Blog</a></li>
            )
          }
          {
            false && (
              <li><a href="https://developer.diluv.com" className={"hover:text-white transition-colors duration-150 ease-in"}>Developers</a></li>
            )
          }
          <li><a href="https://github.com/Diluv" className={"hover:text-white transition-colors duration-150 ease-in"}>Github</a></li>
        </ul>
      </div>
      <div className="w-1/2 pt-2 md:w-1/6">
        <h5 className={"text-xl font-bold pb-2"}>About</h5>
        <ul className="list-none">
          <li><a href="/about" className={"hover:text-white transition-colors duration-150 ease-in"}>About</a></li>
          <li><a href="/privacy" className={"hover:text-white transition-colors duration-150 ease-in"}>Privacy</a></li>
          <li><a href="/terms" className={" hover:text-white transition-colors duration-150 ease-in"}>Terms</a></li>
        </ul>
      </div>
      <div className="w-1/2 pt-2 md:w-1/6 mr-auto">
        <h5 className={"text-xl font-bold pb-2 "}>Contact</h5>
        <ul className="list-none">
          <li><a href="https://twitter.com/DiluvSupport" className={"hover:text-white transition-colors duration-150 ease-in"}>Twitter</a></li>
          <li><a href="https://www.reddit.com/r/diluv/" className={"hover:text-white transition-colors duration-150 ease-in"}>Reddit</a></li>
          {
            false && (
              <li><a href="#">Discord</a></li>
            )
          }
        </ul>
      </div>
    </div>
  </footer>);
}

export default Footer;