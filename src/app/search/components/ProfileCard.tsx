import React from 'react';
import Image from 'next/image';

import Button from '@/components/Button';

import { FaMapPin } from 'react-icons/fa'
import { Prestador } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

interface ProfileInfoProps {
  url_foto: string
  prestador: Prestador 
};

const ProfileCard = ({ prestador, url_foto }: ProfileInfoProps) => {

  return (
    <>
      <div>

        <div className="w-full max-w-sm relative bg-white rounded-2xl shadow-lg mx-2 mb-4 overflow-hidden">

          <span className="absolute text-black bg-yellow-400 rounded-[4px] top-6 left-6 px-2 py-1 text-sm font-bold roll-in-blurred-right">
            TOP
          </span>

          <Image
            src={url_foto}
            width={140}
            height={140}
            className='rounded-full h-36 w-36 mx-auto my-10 p-0'
            style={{
              objectFit: "cover",
            }}
            alt='Imagem Usuário'
          />

          <h1 className="text-xl font-bold text-center">
            {prestador.nome}
          </h1>

          <div className='flex items-center justify-center gap-1 my-1 p-2 text-sm font-semibold text-grayPrimary dark:text-grayLighter'>
            <FaMapPin className='text-base' />
            <p>{prestador.cidade},</p>
            <p>{prestador.uf}</p>
          </div>

          <div className="flex items-center justify-center gap-2 w-[80%] mx-auto mt-5 mb-10">
          <Link href={`/professionals/${prestador.id}/unauthenticated`}>
            <Button variant='login'>
              Visitar
            </Button>
            </Link>
          </div>

          <div className="border-t-2 border-whiteBG text-black p-4 text-xs 3xl:text-base font-semibold flex justify-around items-center gap-2">
            <div className='flex flex-row gap-2 justify-center items-center'>
              <p>Categoria:</p>
              <p className="px-4 py-1 bg-primary dark:bg-primaryLighter rounded-md text-white">
                {prestador.tipo_categoria}
              </p>
            </div>

            <div className='flex flex-row gap-2 justify-center items-center'>
              <p>Profissão:</p>
              <p className="px-4 py-1 bg-primary dark:bg-primaryLighter rounded-md text-white">
                gamer
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProfileCard;