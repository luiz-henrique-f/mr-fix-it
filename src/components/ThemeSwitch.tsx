import React from 'react';
import { useTheme } from "next-themes";

import { BiSolidMoon } from "react-icons/bi";
import { BsSunFill } from "react-icons/bs";

const ThemeSwitch = () => {

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  function light() {
    setTheme('light')
    document.documentElement.classList.remove('dark')
  };

  function dark() {
    setTheme("dark")
    document.documentElement.classList.add('dark')
  };
  
  return (
    <>
      {theme == 'light' ?
        <div
          onClick={() => currentTheme == "dark" ? light() : dark()}
          className="cursor-pointer text-black rounded-md bg-grayLighter/25 hover:bg-grayPrimary/30 p-2">

          <BiSolidMoon className="text-base" />
        </div>
        :
        <div
          onClick={() => currentTheme == "dark" ? light() : dark()}
          className="cursor-pointer text-white rounded-md bg-grayLighter/20 hover:bg-grayPrimary/50 p-2">

          <BsSunFill className="text-base" />
        </div>
      }
    </>
  );
};

export default ThemeSwitch;