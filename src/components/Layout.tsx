import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react'
import Head from 'next/head'
import {getTheme, toggleTheme} from '../utils/theme';
import NavHead from "./NavHead";
import Footer from "./Footer";
import {Theme} from "../utils/Contexts";

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
                                                  children,
                                                  title = 'Diluv',
                                                }) => {

  const [, forceUpdate] = useState({});
  const updated = useRef(false);
  let themeCon = useContext(Theme);
  useEffect(() => {
    updated.current = true;
    forceUpdate({});
  }, [updated]);
  if (!updated.current) {
    return <React.Fragment/>;
  }
  document.body.className = (themeCon.theme === "dark" ? "theme-dark" : "theme-light");
  return (
    <div className={"min-h-100vh flex flex-col"}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <header className={""}>
        <NavHead/>
      </header>
      <main className={"flex-grow " + (themeCon.theme === "dark" ? "theme-dark" : "theme-light")}>
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout
