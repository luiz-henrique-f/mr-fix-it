"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { AiOutlineMenu } from 'react-icons/ai'
import { BsSunFill } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";

import { useTheme } from "next-themes";
import Link from "next/link";


// const Button = () => {
//     const { systemTheme, theme, setTheme } = useTheme();
//     const currentTheme = theme === 'system' ? systemTheme : theme;

//     return (
//         <button
//             onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
//             className='bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 px-8 py-2 text-2xl md:text-4xl rounded-lg absolute bottom-32'>
//             Toggle Mode
//         </button>
//     )
// }



const Header = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    // const theme = document.documentElement.classList.contains("dark") ? 'dark' : 'light';
    // const currentTheme = document.documentElement.classList.contains("dark") ? 'dark' : 'light';

    function light()  {
        // localStorage.theme = 'light'
        setTheme('light')
        document.documentElement.classList.remove('dark')
        // console.log(localStorage.theme);
    }
    
    function dark()  {
        setTheme("dark")
        document.documentElement.classList.add('dark')
        // console.log(localStorage.theme);
      }

    const [menuIsOpen, setMenuIsOpen] = React.useState(false)
    const { status, data } = useSession();
    const handleLoginClick = () => signIn();
    const handleLogoutClick = () => {
        setMenuIsOpen(false)
        signOut()
    };
    const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

    return (
        <div className='p-5 py-0 h-[93px] mx-auto flex justify-between items-center shadow-2xl dark:bg-zinc-900'>
        <div className="relative h-[50px] w-[60px]">
        <Link href="/">
            <Image src="/Logo_3.0_roxo.png" alt="Mr. Fix It" fill />
        </Link>
        </div>

        {/* {theme == 'light' ? <div className="bg-white">gfdsgdf</div> : <div className="bg-amber-300">fsgfdgsd</div>} */}

        {status === "unauthenticated" && (
            <button className="text-primary text-sm font-semibold" onClick={handleLoginClick}>Login</button>

        )}

        {status === "authenticated" && data.user &&(
            <div className="flex items-center gap-3 border-grayLighter border border-solid p-2 px-3 rounded-full relative">
                <AiOutlineMenu size={16} onClick={handleMenuClick} className="cursor-pointer"/>

                {/* {theme == 'light' ? <BiSolidMoon size={16} onClick={() => currentTheme == "dark"? document.documentElement.classList.remove('dark'): document.documentElement.classList.add('dark')} className="cursor-pointer "/> : <BsSunFill size={16} onClick={() => currentTheme == "dark"? document.documentElement.classList.remove('dark'): document.documentElement.classList.add('dark')} className="cursor-pointer "/>} */}
                {/* {theme == 'light' ? <BiSolidMoon size={16} onClick={() => currentTheme == "dark"? setTheme('light'): setTheme("dark")} className="cursor-pointer "/> : <BsSunFill size={16} onClick={() => currentTheme == "dark"? setTheme('light'): setTheme("dark")} className="cursor-pointer "/>} */}
                {theme == 'light' ? <BiSolidMoon size={16} onClick={() => currentTheme == "dark"? light(): dark()} className="cursor-pointer "/> : <BsSunFill size={16} onClick={() => currentTheme == "dark"? light(): dark()} className="cursor-pointer "/>}
                {/* {localStorage.theme == 'light' ? <BiSolidMoon size={16} onClick={() => dark()} className="cursor-pointer text-black dark:text-white"/> : <BsSunFill size={16} onClick={() => light()} className="cursor-pointer text-black dark:text-white"/>} */}
                {/* {theme == 'dark' ? <BsSunFill size={16} onClick={() => theme == 'dark' ? <BsSunFill size={16} onClick={() => light()} className="cursor-pointer text-black dark:text-white"/> : <BsSunFill size={16} onClick={() => light()} className="cursor-pointer text-black dark:text-white light"/> } className="cursor-pointer text-black dark:text-white light"/> : <BiSolidMoon size={16} onClick={() => theme == 'light' ? <BiSolidMoon size={16} onClick={() => dark()} className="cursor-pointer text-black dark:text-white"/> : <BiSolidMoon size={16} onClick={() => light()} className="cursor-pointer text-black dark:text-white"/>} className="cursor-pointer text-black dark:text-white"/>} */}
                {/* {document.documentElement.classList.contains("dark") ? light() : dark()} */}
                

                <Image height={35} width={35} src={data.user.image!} alt={data.user.name!} className="rounded-full shadow-md"/>

                {menuIsOpen && (
                    <div className="z-50 absolute top-14 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center dark:bg-zinc-800">
                        <button className="text-primary text-sm font-semibold" onClick={() => handleLogoutClick()}>
                            Logout
                        </button>
                    </div>
                )}
            </div>

        )}
    </div>
    )
}

export default Header;