"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { AiOutlineMenu } from 'react-icons/ai'
import { BsSunFill } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = React.useState(false)
    const { status, data } = useSession();
    const handleLoginClick = () => signIn();
    const handleLogoutClick = () => {
        setMenuIsOpen(false)
        signOut()
    };
    const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

    return (
    <div className="p-5 py-0 h-[93px] mx-auto flex justify-between items-center shadow-2xl">
        <div className="relative h-[80px] w-[182px]">
        <Image src="/logo.png" alt="Mr. Fix It" fill />
        </div>

        {status === "unauthenticated" && (
            <button className="text-primary text-sm font-semibold" onClick={handleLoginClick}>Login</button>

        )}

        {status === "authenticated" && data.user &&(
            <div className="flex items-center gap-3 border-grayLighter border border-solid p-2 px-3 rounded-full relative">
                <AiOutlineMenu size={16} onClick={handleMenuClick} className="cursor-pointer"/>

                <BsSunFill size={16} onClick={handleMenuClick} className="cursor-pointer"/>
                <BiSolidMoon size={16} onClick={handleMenuClick} className="cursor-pointer"/>

                <Image height={35} width={35} src={data.user.image!} alt={data.user.name!} className="rounded-full shadow-md"/>

                {menuIsOpen && (
                    <div className="absolute top-14 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
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