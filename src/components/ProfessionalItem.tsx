import { Prestador } from "@prisma/client"
import Image from "next/image";
import React from 'react'

interface ProfessionalItemProps {
    professional: Prestador;
}

const ProfessionalItem = ({ professional } : ProfessionalItemProps) => {
    return (
        <div className='flex flex-col'>
            {/* <Image /> */}
            <h3 className="text-primaryDarker font-medium">{professional.nome}</h3>
            <div className="flex items-center gap-1">
                <p className="text-xs text-grayPrimary">{professional.cidade}</p>
            </div>
        </div>

    )
};

export default ProfessionalItem;
