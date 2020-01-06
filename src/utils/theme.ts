export function getTheme(): 'light' | 'dark' {
  if (typeof localStorage === "undefined") {
    return "light";
  }
  let item = localStorage.getItem("theme");
  if (!item) {
    item = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    localStorage.setItem("theme", item);
  }
  // @ts-ignore
  return item;
}

export function setTheme(theme: string) {
  if (typeof localStorage === "undefined") {
    return;
  }
  localStorage.setItem("theme", theme);
}

export const toggleTheme = function (): 'light' | 'dark' {
  if (typeof localStorage === "undefined") {
    return "light";
  }
  let item = localStorage.getItem("theme");
  if (!item) {
    item = "light";
  }
  let inverse = item === "light" ? "dark" : "light";
  localStorage.setItem("theme", inverse);
  // @ts-ignore
  return inverse;
};