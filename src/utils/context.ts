import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const Theme = React.createContext({
  theme: 'light',
  toggleTheme: () => {
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (theme: string) => {
  },
});
