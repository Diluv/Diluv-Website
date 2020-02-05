import React, {useEffect, useRef, useState} from 'react'
import Head from 'next/head'
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
  document.body.className = (theme === "dark" ? "theme-dark" : "theme-light");
  return (<div className={"min-h-100vh flex flex-col"}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>
    <header className={""}>
      <NavHead toggleTheme={toggleTheme} setTheme={setTheme}/>
    </header>
    <main className={"flex-grow " + (theme === "dark" ? "theme-dark" : "theme-light")}>
      {children}
    </main>
    <Footer themeClass={theme}/>
  </div>);
}

export default Layout
