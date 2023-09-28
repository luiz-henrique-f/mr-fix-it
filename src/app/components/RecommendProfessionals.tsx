import ProfessionalItem from '@/components/ProfessionalItem'
import { prisma } from '@/lib/prisma';
import { Prestador } from "@prisma/client"
import React from 'react'

// async function getProfessional() {
//     const professionals = await prisma.prestador.findMany({});
    
//     return professionals;
//   }

const RecommendProfessionals = async () => {
    // const data = await getProfessional();

    return (
        <div className='container mx-auto p-5 dark:bg-zinc-800'>
            <div className='flex items-center'>
                <div className='w-full h-[1px] bg-grayLighter'></div>
                <h2 className='px-5 font-medium text-grayPrimary whitespace-nowrap'>Profissionais mais bem avaliados</h2>
                <div className='w-full h-[1px] bg-grayLighter'></div>
            </div>
        <div className="flex flex-col items-center mt-5 gap-5">
            {/* {data.map((professional: Prestador) => (
                <ProfessionalItem key={professional.id} professional={professional}/>    
                ))} */}
        </div>

        </div>

    )
};

export default RecommendProfessionals;
