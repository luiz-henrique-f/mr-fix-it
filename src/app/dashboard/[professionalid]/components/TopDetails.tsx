"use client"

import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

import ThemeSwitch from '@/components/ThemeSwitch';
import { Prestador } from '@prisma/client';

import { AiOutlineMenu } from 'react-icons/ai';
interface TopInfoProps {
  prestador: string 
};

const TopDetails = ({ prestador }: TopInfoProps) => {

  // const professional = await getProfessionalDetails(params.professionalid);
  // const photo = await getPhotoProfessional(params.professionalid);

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const hidennMenu = () => {
    setMenuIsOpen(false)
  };
  
  return (
    <>
      <div className='flex justify-center items-center text-white gap-4 mt-6'>
        <AiOutlineMenu onClick={handleMenuClick} className="cursor-pointer text-xl" />

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