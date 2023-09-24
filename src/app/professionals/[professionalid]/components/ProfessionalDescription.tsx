import { Prestador } from '@prisma/client';
import React from 'react';

interface ProfessionalDescriptionProps {
    description: string
}

const ProfessionalDescription = ({description}: ProfessionalDescriptionProps) => {
    
    return (
        <div className="flex flex-col p-5 pb-10 border-b border-b-grayLighter w-full">
            <h2 className='font-semibold text-primaryDarker'>Sobre o Professional</h2>
            <p className='text-xs leading-5 text-primaryDarker mt-1'>{description}</p>
        </div>
    )
}

export default ProfessionalDescription