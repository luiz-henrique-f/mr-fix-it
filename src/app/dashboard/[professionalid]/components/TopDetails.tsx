"use client"

import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

import ThemeSwitch from '@/components/ThemeSwitch';

// const getProfessionalDetails = async (professionalid: string) => {
//   const professional = await prisma.prestador.findFirst({
//       where: {
//           id: professionalid,
//       },
//   }).finally(() => {
//       prisma.$disconnect();
//     });

//   return professional;
// }

// const getPhotoProfessional = async (professionalid: string) => {
//   const photo = await prisma.foto_Prestador.findFirst({
//       where: {
//           id_prestador: professionalid,
//       },
//   }).finally(() => {
//       prisma.$disconnect();
//     });

//   return photo;
// }

const TopDetails = () => {

  // const professional = await getProfessionalDetails(params.professionalid);
  // const photo = await getPhotoProfessional(params.professionalid);
  
  return (
    <>
      <div className='flex justify-center items-center gap-4'>
        <ThemeSwitch />
      
        <Image
          src={'/perfil.png'}
          width={36}
          height={36}
          className='rounded-full h-9 w-h-9 mx-auto'
          style={{
            objectFit: "cover",
          }}
          alt='Imagem Usuário'
        />
        
      </div>
    </>
  );
};

export default TopDetails;