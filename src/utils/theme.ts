export function getTheme(): 'light' | 'dark' {
  if (typeof localStorage === 'undefined') {
    return 'light';
  }
  let item = localStorage.getItem('theme');
  if (!item) {
    item = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    localStorage.setItem('theme', item);
  }

  return item === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme: string) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.setItem('theme', theme);
}

export const toggleTheme = (): 'light' | 'dark' => {
  if (typeof localStorage === 'undefined') {
    return 'light';
  }
  let item = localStorage.getItem('theme');
  if (!item) {
    item = 'light';
  }
  const inverse = item === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', inverse);
  return inverse;
};
