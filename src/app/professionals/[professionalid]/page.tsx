import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import React from 'react';
import ProfessionalDescription from './components/ProfessionalDescription';

// const getProfessionalDetails = async (professionalid: string) => {
//     const professional = await prisma.prestador.findUnique({
//         where: {
//             id: professionalid,
//         },
//     });

//     return professional;
// }

const ProfessionalDetail = async ({params}: { params : { professionalid: string} }) => {
    // const professional = await getProfessionalDetails(params.professionalid);

    // if(!professional) return null;

    return (
        <div className='container mx-auto'>
            <div className="relative h-[200px] w-full">
            <Image
            src="/capa-tecnology.png"
            fill
            style={{
                objectFit: "cover",
            }} 
            alt='Imagem Capa' 
             />
            {/* <h1>{professional.nome}</h1> */}
            {/* <Image src={professional?.nome} fill alt={professional.nome}/> */}
            </div>

            <div className='flex flex-col p-5 pb-10 border-b border-b-grayLighter w-full'>
                <h1 className='font-semibold text-xl text-primaryDarker'>Luiz</h1>

                <div className='flex items-center gap-1 my-1'>
                    <p className='text-xs text-grayPrimary'>Urânia/SP</p>
                </div>

                    <div className='flex items-center gap-1 my-1'>
                        <p className='text-xs text-grayPrimary'>1799663223</p>
                    </div>
            </div>

            <ProfessionalDescription description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."/>

            {/* <ProfessionalHighlisht /> */}
            {/* <ProfessionalComments /> */}
        </div>

    )
}

export default ProfessionalDetail