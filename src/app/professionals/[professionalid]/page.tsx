import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import React from 'react';

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
        <div className='mx-auto'>
            <div className="relative h-[280px] w-full"></div>
            <h1>{professional.nome}</h1>
            {/* <Image src={professional?.nome} fill alt={professional.nome}/> */}
        </div>
    )
}

export default ProfessionalDetail