import React from "react";
import Drop from "../components/Drop"

function Footer() {

  const year = new Date().getFullYear();
  return (<footer className={"pt-4 py-md-5 md:pt-5 bg-indigo-500 pb-8"}>
    <div className={"md:flex flex-wrap justify-center text-center md:text-left"}>
      <div className="md:w-1/6 ml-auto text-center md:text-left">
        <Drop className={"mx-auto md:mx-0"} height={"54px"} width={"27px"}/>
        <small className="mb-3 text-gray-600 mx-auto md:mx-0  text-teal-100">© {year}</small>
      </div>
      <div className="md:w-1/6">
        <h5 className={"text-xl font-bold pb-2 text-teal-100"}>Product</h5>
        <ul className="list-none items-center">
          <li><a href="/news" className={"text-teal-200 hover:text-white"}>News</a></li>
          {
            false && (
              <li><a href="https://ideas.diluv.com" className={"hover:text-white"}>Feedback</a></li>
            )
          }
          {
            false && (
              <li><a href="https://blog.diluv.com" className={"hover:text-white"}>Blog</a></li>
            )
          }
          {
            false && (
              <li><a href="https://developer.diluv.com" className={"hover:text-white"}>Developers</a></li>
            )
          }
          <li><a href="https://github.com/Diluv" className={"text-teal-200 hover:text-white"}>Github</a></li>
        </ul>
      </div>
      <div className="md:w-1/6">
        <h5 className={"text-xl font-bold pb-2 text-teal-100"}>About</h5>
        <ul className="list-none">
          <li><a href="/about" className={"text-teal-200 hover:text-white"}>About</a></li>
          <li><a href="/privacy" className={"text-teal-200 hover:text-white"}>Privacy</a></li>
          <li><a href="/terms" className={"text-teal-200 hover:text-white"}>Terms</a></li>
        </ul>
      </div>
      <div className="md:w-1/6 mr-auto">
        <h5 className={"text-xl font-bold pb-2 text-teal-100"}>Contact</h5>
        <ul className="list-none">
          <li><a href="https://twitter.com/DiluvSupport" className={"text-teal-200 hover:text-white"}>Twitter</a></li>
          <li><a href="https://www.reddit.com/r/diluv/" className={"text-teal-200 hover:text-white"}>Reddit</a></li>
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