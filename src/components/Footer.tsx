import React, {useState} from "react";
import Drop from "../components/Drop"
function Footer() {

  return (<footer className={"pt-4 py-md-5 md:pt-5 border-top"}>
    <div className={"flex"}>
      <div className="col-12 col-md">
        <Drop className={""} height={"54px"} width={"27px"}/>
        <small className="d-block mb-3 text-muted">© 2019</small>
      </div>
      <div className="col-6 col-md">
        <h5>Product</h5>
        <ul className="list-unstyled text-small">
          <li><a href="/news">News</a></li>
          {
            false && (
              <li><a href="https://ideas.diluv.com">Feedback</a></li>
            )
          }
          {
            false && (
              <li><a href="https://blog.diluv.com">Blog</a></li>
            )
          }
          {
            false && (
              <li><a href="https://developer.diluv.com">Developers</a></li>
            )
          }
          <li><a href="https://github.com/Diluv">Github</a></li>
        </ul>
      </div>
      <div className="col-6 col-md">
        <h5>About</h5>
        <ul className="list-unstyled text-small">
          <li><a href="/about">About</a></li>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
        </ul>
      </div>
      <div className="col-6 col-md">
        <h5>Contact</h5>
        <ul className="list-unstyled text-small">
          <li><a href="https://twitter.com/DiluvSupport">Twitter</a></li>
          <li><a href="https://www.reddit.com/r/diluv/">Reddit</a></li>
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