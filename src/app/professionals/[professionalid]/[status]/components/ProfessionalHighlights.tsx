import { Prestador } from "@prisma/client"
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import React from 'react';

interface ProfessionalHighlightsProps {
    id: string
}

// export const getProfessional = async (id:string) => {
//     await prisma.prestador.findMany({
//                 where: {
//                     id: id
//                 }
//             });
// }

// async function getProfessional(id:ProfessionalHighlightsProps) {
//     const professionals = await prisma.prestador.findMany({
//         where: {
//             id:
//         }
//     });
    
//     return professionals;
//   }

const ProfessionalHighlights = async ({ id }: ProfessionalHighlightsProps) => {
    // const getProfessional = async () => {
    //     await prisma.prestador.findMany({
    //                 where: {
    //                     id: id
    //                 }
    //             });
    // }
    // const data = await getProfessional(id);

    return (
        <div className='flex flex-col p-5 pb-10 border-b border-b-grayLighter w-full'>
            <h2 className='font-semibold text-primaryDarker mb-2'>Destaques</h2>

            {/* <div className='flex flex-wrap gap-y-2'>

                {data.map((professional: Prestador) => (
                    <div key={professional.id} className='flex items-center gap-2 w-1/2'>
                        <Image src="/check-icon.png" width={15} height={15} alt={professional.id}/>

                        <p className='text-grayPrimary text-xs'>{professional.id}</p>
                    </div>
            ))}
            </div> */}
        </div>
    )
}

export default ProfessionalHighlights;