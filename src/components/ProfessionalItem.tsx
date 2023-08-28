import { Prestador } from "@prisma/client"
import Image from "next/image";
import Link from "next/link";
import React from 'react'

interface ProfessionalItemProps {
    professional: Prestador;
}

const ProfessionalItem = ({ professional } : ProfessionalItemProps) => {
    return (
        <Link href={`/professionals/${professional.id}`}>
            <div className='flex flex-col'>
            {/* <Image /> */}
            <h3 className="text-primaryDarker font-medium">{professional.nome}</h3>
            <div className="flex items-center gap-1">
                <p className="text-xs text-grayPrimary">{professional.cidade}</p>
            </div>
        </div>
        </Link>

    )
};

export default ProfessionalItem;
