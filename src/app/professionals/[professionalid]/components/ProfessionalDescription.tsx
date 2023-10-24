import { Prestador } from '@prisma/client';
import React from 'react';
import ChangeButton from '../../../../components/ChangeButton'

interface ProfessionalDescriptionProps {
    description: string
}

const ProfessionalDescription = ({description}: ProfessionalDescriptionProps) => {
    
    return (
        <div className="relative flex flex-col p-8 bg-white dark:bg-darkBGLighter rounded-lg w-full">
            <ChangeButton className='absolute top-3 right-3' />
            <h2 className='text-2xl mb-5 font-bold text-primaryDarker dark:text-white'>Sobre o Professional</h2>
            <p className='text-sm leading-5 text-justify text-primaryDarker dark:text-white mt-1 indent-3'>{description}</p>
        </div>
    )
}

export default ProfessionalDescription