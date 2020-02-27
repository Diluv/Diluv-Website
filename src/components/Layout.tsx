import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import Head from 'next/head';
import NavHead from './NavHead';
import Footer from './Footer';
import { Theme } from '../utils/context';

type Props = {
  children: JSX.Element | JSX.Element[]
  title: string
};

function Layout({
  children,
  title = 'Diluv',
}: Props) {
  const [, forceUpdate] = useState({});
  const updated = useRef(false);
  const themeCon = useContext(Theme);
  useEffect(() => {
    updated.current = true;
    forceUpdate({});
  }, [updated]);
  if (!updated.current) {
    return <></>;
  }
  document.body.className = (themeCon.theme === 'dark' ? 'theme-dark' : 'theme-light');
  return (
    <div className="min-h-100vh flex flex-col">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
      </Head>
      <header className="">
        <NavHead/>
      </header>
      <main className={`flex-grow ${themeCon.theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        {children}
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
