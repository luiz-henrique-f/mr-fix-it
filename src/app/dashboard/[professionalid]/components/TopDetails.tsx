"use client"

import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

import ThemeSwitch from '@/components/ThemeSwitch';
import { Prestador } from '@prisma/client';

interface TopInfoProps {
  prestador: Prestador 
};

const TopDetails = ({ prestador }: TopInfoProps) => {

  // const professional = await getProfessionalDetails(params.professionalid);
  // const photo = await getPhotoProfessional(params.professionalid);
  
  return (
    <>
      <div className='flex justify-center items-center gap-4'>
        <ThemeSwitch />
      
        <Image
          // src={prestador.url_foto}
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