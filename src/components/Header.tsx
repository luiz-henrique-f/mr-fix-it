"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { AiOutlineMenu } from 'react-icons/ai'
import { BsSunFill } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";
import Link from "next/link";
import Login from "@/app/login/page";
import { Prestador } from "@prisma/client";

interface ProfessionalProps {
    professional: Prestador;
  }


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

    const hidennMenu = () => {
        setMenuIsOpen(false)
    }

    const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

    // const onSubmit = async () => {
    //     setMenuIsOpen(false)
    //     const result = await signOut("google", {
    //       redirect: false,
    //       callbackUrl: "/",
    //     })
    //   }

    const router = useRouter()

    return (
        <div className='px-[5%] py-0 h-[93px] mx-auto flex justify-between items-center shadow-2xl bg-whiteBG dark:bg-darkBG'>
            <div className="flex items-center justify-start h-full w-full">
                <Link href="/" className="inline-flex items-center justify-between">
                    
                    <Image
                        src="/Logo_3.0_roxo.png"
                        width={50}
                        height={50}
                        alt="Mr. Fix It" />

                    <div className="relative left-5 text-black dark:text-white">
                        <h1 className="font-semibold text-3xl tracking-[0.4375rem] invisible sm:visible">Mr. Fix</h1>
                        <span className="text-base tracking-[0.1875rem] invisible sm:visible">it</span>
                        <span className="text-xl tracking-[-0.025rem] pl-1 invisible sm:visible">——————</span>
                    </div>

                </Link>
            </div>

            {/* {theme == 'light' ? <div className="bg-white">gfdsgdf</div> : <div className="bg-amber-300">fsgfdgsd</div>} */}

            {/* <div className="flex items-center justify-end gap-5">
                {status === "unauthenticated" && (
                    <button
                        className="flex items-center justify-center py-1 px-3 gap-2 text-lg bg-transparent font-semibold border-[0.125rem] border-solid border-gray-400 rounded-md hover:text-white hover:border-transparent hover:bg-gray-400/40 transition-all duration-[0.2s] ease-[ease-in-out] hover:transition-all hover:duration-[0.2s] hover:ease-[ease-in-out]"
                        onClick={handleLoginClick}>
                        <FiLogIn />
                        Entre
                    </button>
                )}

                {status === "unauthenticated" && (
                    <Link
                        href="/login"
                        className="flex items-center justify-center py-1 px-3 gap-2 w-32 text-lg bg-primary font-semibold border-[0.125rem] border-solid border-primary rounded-md text-white hover:border-transparent hover:bg-primaryDarker transition-all duration-[0.2s] ease-[ease-in-out] hover:transition-all hover:duration-[0.2s] hover:ease-[ease-in-out]">
                        Cadastre-se
                    </Link>
                )}
            </div>  */}

            {/* onClick={handleLoginClick} */}

        {status === "unauthenticated" && (
                <div className="flex items-center gap-3 relative">

                    {theme == 'light' ? <BiSolidMoon size={16} onClick={() => currentTheme == "dark"? light(): dark()} className="cursor-pointer text-black "/> : <BsSunFill size={16} onClick={() => currentTheme == "dark"? light(): dark()} className="cursor-pointer text-white "/>}

                    <Link href={'/login'}>
                        <button className="flex text-white items-center justify-center py-2 px-4 gap-2 text-lg bg-primary border-transparent font-semibold border-[0.125rem] border-solid rounded-xl hover:bg-primaryDarker transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]">
                            <FiLogIn />
                            Login
                        </button>
                    </Link>
                </div>
            )}

            {status === "authenticated" && data.user &&(
                <div className="flex items-center gap-3 border-grayLighter border border-solid p-2 px-3 rounded-full relative">
                    <AiOutlineMenu onClick={handleMenuClick} className="cursor-pointer text-3xl 2sm:text-2xl md:text-xl"/>

                    {theme == 'light' ? 
                        <BiSolidMoon 
                            onClick={() => currentTheme == "dark"? light(): dark()} 
                            className="cursor-pointer text-3xl 2sm:text-2xl md:text-xl"
                        />
                        : 
                        <BsSunFill 
                            onClick={() => currentTheme == "dark"? light(): dark()} 
                            className="cursor-pointer text-3xl 2sm:text-2xl md:text-xl"
                        />
                    }
                    
                    <Image height={35} width={35} src={data?.user?.image!} alt={data?.user?.name!} className="rounded-full shadow-md"/>

                    {menuIsOpen && (
                        <div className="z-50 absolute top-14 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center dark:bg-zinc-800">
                            <button 
                                className="text-primary text-sm font-semibold border-b-4"
                                onClick={() => {signOut({ redirect: false }).then(() => {
                                        router.push("/"); // Redirect to the dashboard page after signing out
                                    });
                                }}>
                                Logout
                            </button>
                            
                            <Link href={`/professionals/90fd330c-51c6-4285-8082-71c4075539c4`}>
                                <button className="text-primary text-sm font-semibold" onClick={hidennMenu}>
                                    Meu Perfil
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

            )} 
        </div>
    )
}

export default Header;