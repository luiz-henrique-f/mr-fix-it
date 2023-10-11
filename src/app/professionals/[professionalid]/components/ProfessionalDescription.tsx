import { Prestador } from '@prisma/client';
import React from 'react';

interface ProfessionalDescriptionProps {
    description: string
}

const ProfessionalDescription = ({description}: ProfessionalDescriptionProps) => {
    
    return (
        <div className="flex flex-col p-5 pb-10 w-full">
            <h2 className='text-2xl mb-3 font-semibold text-primaryDarker dark:text-white'>Sobre o Professional</h2>
            <p className='text-xs leading-5 text-primaryDarker dark:text-white mt-1 indent-3'>{description}</p>
        </div>
    )
}

export default ProfessionalDescription