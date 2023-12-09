import React from 'react';
import Image from 'next/image';

import MenuSpacer from '../../dashboard/[professionalid]/components/MenuSpacer';
import Button from '@/components/Button';

import { AiOutlineMenu } from 'react-icons/ai';
import { prisma } from '@/lib/prisma';

interface ProfileInfoProps {
  nome: string,
  url_foto: string,
  desc_cidade: string,
  data_fim: string,
  status: string,
};

const UsersInfo = async ({ nome,  url_foto, desc_cidade, data_fim, status}: ProfileInfoProps) => {

  return (
    <>
      <div className='p-1 flex items-center justify-between'>

        <div className='flex flex-[10%] items-center justify-start pl-4'>
          <Button variant='icon' className='flex items-center justify-start' title='Enviar Mensagem de cobrança'>
            <AiOutlineMenu />
          </Button>
        </div>

        <div className='flex flex-[35%] gap-3 items-center justify-start'>
          <Image
            src={url_foto}
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
              {nome}
            </p>

            <span className='text-sm italic text-gray-500'>
              {desc_cidade}
            </span>
          </div>
        </div>

        <div className='flex flex-[35%] items-center justify-center'>
          <p>{data_fim}</p>
        </div>

        <div className='flex flex-[20%] items-center justify-center'>
          <p>{status}</p>
        </div>

      </div>

      <MenuSpacer />

    </>
  );
};

export default UsersInfo;