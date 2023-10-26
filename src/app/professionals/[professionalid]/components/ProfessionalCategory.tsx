import React from 'react';
import ChangeButton from '@/components/ChangeButton'
import CategoryItems from './CategoryItems'

const ProfessionalCategory = () => {
    return (
        <div className="relative flex flex-col bg-white dark:bg-darkBGLighter rounded-lg w-full gap-5 p-8">
            <ChangeButton className='absolute top-3 right-3' />

            <h1 className='font-bold text-2xl text-primaryDarker dark:text-white'>Categorias</h1>

            <div className='grid grid-flow-row grid-cols-2 2sm:grid-cols-3 2md:grid-cols-1 2xl:grid-cols-3 items-center gap-3'>
                <CategoryItems items='Construção' />
                <CategoryItems items='Reparos' />
                <CategoryItems items='Pintura' />
                <CategoryItems items='Carpinteiro' />
                <CategoryItems items='Eletricista' />
            </div>

        </div>
    )
}

export default ProfessionalCategory