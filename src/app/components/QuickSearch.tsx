import React from 'react'
import { MdConstruction, MdFindInPage  } from 'react-icons/md'
import { GiHealthNormal  } from 'react-icons/gi'
import { HiMiniComputerDesktop  } from 'react-icons/hi2'

const QuickSearch = () => {
    return(
        <div className='container mx-auto p-5 dark:bg-zinc-800'>
            <div className='flex items-center'>
                <div className='w-full h-[1px] bg-grayLighter'></div>
                <h2 className='px-5 font-medium text-grayPrimary whitespace-nowrap'>Tente pesquisar por</h2>
                <div className='w-full h-[1px] bg-grayLighter'></div>
            </div>

        <div className='flex w-full justify-between mt-5'>
            <div className="flex flex-col items-center gap-1">
                <MdConstruction width={35} height={35} />

                <p className='text-sm text-grayPrimary'>Construção</p>
            </div>

            <div className="flex flex-col items-center gap-1">
                <HiMiniComputerDesktop width={35} height={35} />

                <p className='text-sm text-grayPrimary'>Tecnologia</p>
            </div>

            <div className="flex flex-col items-center gap-1">
                <GiHealthNormal width={35} height={35} />

                <p className='text-sm text-grayPrimary'>Saúde</p>
            </div>

            <div className="flex flex-col items-center gap-1">
                <MdFindInPage width={35} height={35} />

                <p className='text-sm text-grayPrimary'>Outros</p>
            </div>

        </div>

        </div>

    
)};

export default QuickSearch