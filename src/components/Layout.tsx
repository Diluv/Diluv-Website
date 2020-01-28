import React, {useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import diluv from '../../public/static/diluv.svg';
// import {Nav, Navbar} from 'react-bootstrap';
import {destroyCookie, parseCookies} from 'nookies';
// import Dropdown from "react-bootstrap/Dropdown";
import {getTheme, toggleTheme} from '../utils/theme';
import NavHead from "./NavHead";

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
                                                  children,
                                                  title = 'Diluv',
                                                }) => {

  const [, forceUpdate] = useState({});
  const [theme, setTheme] = useState<'light' | 'dark'>("light");
  const updated = useRef(false);
  useEffect(() => {
    setTheme(getTheme());
    forceUpdate({});

    updated.current = true;
  }, [theme]);

  if (!updated.current) {
    return <div></div>;
  }
  document.body.className = theme === "dark" ? "theme-dark" : "theme-light";
  return (<React.Fragment>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <header>
      <NavHead/>
    </header>
    <div className={"content " + (theme === "dark" ? "theme-dark" : "theme-light")}>
      {children}
    </div>
    <footer className={"pt-4 py-md-5 pt-md-5 border-top footer"}>
      <div className={"container"}>
        <div className="row">
          <div className="col-12 col-md">
            {/*<img className="mb-2" src={diluv} alt="" width="24" height="24"/>*/}
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
      </div>
    </footer>
  </React.Fragment>);
}

export default Layout
