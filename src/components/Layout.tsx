import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

type Props = {
  children: JSX.Element | JSX.Element[]
  title: string
};

function Layout({
  children,
  title = 'Diluv',
}: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <NavBar/>
      </header>
      <main className={`flex-grow `}>
        {children}
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
