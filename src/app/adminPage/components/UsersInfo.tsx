import React from 'react';
import { Prestador } from '@prisma/client';
import Image from 'next/image';

import MenuSpacer from '../../dashboard/[professionalid]/components/MenuSpacer';
import Button from '@/components/Button';

import { AiOutlineMenu } from 'react-icons/ai';

interface ProfileInfoProps {
  prestador: Prestador
};

const UsersInfo = ({ prestador }: ProfileInfoProps) => {
  return (
    <>
      <div className='p-1 flex items-center justify-between'>

        <div className='flex flex-[10%] items-center justify-start pl-4'>
          <Button variant='icon' className='flex items-center justify-start'>
            <AiOutlineMenu />
          </Button>
        </div>
        
        <div className='flex flex-[35%] gap-3 items-center justify-start'>
          <Image
            src={prestador.url_foto}
            width={36}
            height={36}
            className='rounded-full h-9 w-h-9'
            style={{
              objectFit: "cover",
            }}
            alt='Imagem Usuário'
          />

          <div className='flex flex-col items-start justify-center'>
            <p className="text-lg font-semibold text-black dark:text-white">
              {prestador.nome}
            </p>

            <span className='text-sm italic text-gray-500'>
              {prestador.desc_cidade}
            </span>
          </div>
        </div>

        <div className='flex flex-[35%] items-center justify-center'>
            <p>nada</p>
        </div>

        <div className='flex flex-[20%] items-center justify-center'>
            <p>nada</p>
        </div>

      </div>

      <MenuSpacer />
      
    </>
  );
};

export default UsersInfo;