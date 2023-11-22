"use client"

import React from 'react'
import Link from "next/link";

import SpecialButton from '@/components/SpecialButton'

const SearchSection = () => {
    return (
        <div className="container flex justify-center items-center flex-col mx-auto p-5 h-[calc(100vh-85px)] bg-none 2sm:bg-search-background 2sm:dark:bg-search-background-dark bg-contain bg-center bg-no-repeat bg-transparent">
            <div className='-mt-[10%] w-full'>
                <h1 className='font-semibold text-3xl 2sm:text-4xl text-gray-800 dark:text-gray-300 text-center p-3'>A maneira mais fácil de encontrar um profissional <span className='text-primary dark:text-primaryLighter'>capacitado</span>!</h1>
                <p className='text-gray-600 dark:text-gray-400 text-sm 2sm:text-xl text-center p-3 mb-6'>Conheça de forma gratuita os profissionais melhor avaliados!</p>

                <Link href="/search">
                    <div className='flex items-center justify-center'>
                        <SpecialButton />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SearchSection