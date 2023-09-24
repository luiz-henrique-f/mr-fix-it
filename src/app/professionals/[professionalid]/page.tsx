import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import React from 'react';
import ProfessionalDescription from './components/ProfessionalDescription';

const getProfessionalDetails = async (professionalid: string) => {
    const professional = await prisma.prestador.findUnique({
        where: {
            id: professionalid,
        },
    });

    return professional;
}

const ProfessionalDetail = async ({params}: { params : { professionalid: string} }) => {
    const professional = await getProfessionalDetails(params.professionalid);

    if(!professional) return null;

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
                <h1 className='font-semibold text-xl text-primaryDarker'>{professional.nome}</h1>

                <div className='flex items-center gap-1 my-1'>
                    <p className='text-xs text-grayPrimary'>{professional.cidade}/{professional.uf}</p>
                </div>

                    <div className='flex items-center gap-1 my-1'>
                        <p className='text-xs text-grayPrimary'>{professional.celular}</p>
                    </div>
            </div>

            <ProfessionalDescription description={professional.observacao}/>

            {/* <ProfessionalHighlisht /> */}
            {/* <ProfessionalComments /> */}
        </div>

    )
}

export default ProfessionalDetail