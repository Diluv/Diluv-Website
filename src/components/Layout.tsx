import React, {useContext, useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import {getTheme, toggleTheme} from '../utils/theme';
import NavHead from "./NavHead";
import Footer from "./Footer";

type Props = {
  title?: string
}

export const ThemeContext = React.createContext({
  theme: "light", toggleTheme: () => {
  }, setTheme: (theme: string) => {
  }
});

const Layout: React.FunctionComponent<Props> = ({
                                                  children,
                                                  title = 'Diluv',
                                                }) => {

  const [, forceUpdate] = useState({});
  const [, setTheme] = useState<'light' | 'dark'>("light");
  const updated = useRef(false);
  let themeCon = useContext(ThemeContext);
  useEffect(() => {

    setTheme(getTheme());
    forceUpdate({});
    updated.current = true;
  }, [theme]);

  if (!updated.current) {
    return <div></div>;
  }

  document.body.className = (themeCon.theme === "dark" ? "theme-dark" : "theme-light");
  return (<ThemeContext.Provider value={{
    theme: getTheme(), toggleTheme: () => {
      //not like this
      themeCon.theme = toggleTheme();
      forceUpdate({});
    },
     setTheme: theme => {

     }
  }}>
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
  </ThemeContext.Provider>);
};

export default Layout
