import React, {useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import diluv from '../../public/static/diluv.svg';
// import {Nav, Navbar} from 'react-bootstrap';
import {destroyCookie, parseCookies} from 'nookies';
// import Dropdown from "react-bootstrap/Dropdown";
import {getTheme, toggleTheme} from '../utils/theme';
import NavHead from "./NavHead";
import Footer from "./Footer";

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
  document.body.className = "flex flex-col min-h-screen " + (theme === "dark" ? "theme-dark" : "theme-light");
  return (<React.Fragment>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <header className={"items-start"}>
      <NavHead/>
    </header>
    <div className={"flex-grow " + (theme === "dark" ? "theme-dark" : "theme-light")}>
      {children}
    </div>
    <Footer/>
  </React.Fragment>);
}

export default Layout
