import React from 'react';

import ChangeButton from '@/components/ChangeButton'
import CategoryItems from './CategoryItems'

interface ProfessionalCategoryProps {
    categoria: string;
  }

const ProfessionalCategory = ({ categoria  }: ProfessionalCategoryProps) => {
    return (
        <div className="relative flex flex-col bg-white dark:bg-darkBGLighter rounded-lg w-full gap-5 p-8">
            <ChangeButton className='absolute top-3 right-3' />

            <h1 className='font-bold text-2xl text-primaryDarker dark:text-white'>Categoria que atende</h1>

            <div className='grid-cols-2 2sm:grid-cols-3 2md:grid-cols-1 2xl:grid-cols-3 items-center'>
                <CategoryItems items={categoria} />
            </div>

        </div>
    )
}

export default ProfessionalCategory