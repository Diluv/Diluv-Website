import '../css/index.css';
import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { getTheme, setTheme, toggleTheme } from '../utils/theme';
import { Theme } from '../utils/context';

function App({ Component, pageProps }: AppProps) {
  const [, forceUpdate] = useState({});
  return (
    <Theme.Provider value={{
      theme: getTheme(),
      toggleTheme: () => {
        toggleTheme();
        forceUpdate({});
      },
      setTheme: (theme) => {
        setTheme(theme);
        forceUpdate({});
      },
    }}
    >
      <Component {...pageProps} />
    </Theme.Provider>
  );
}

export default App;
