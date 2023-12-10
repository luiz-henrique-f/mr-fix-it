import React from 'react';
import Image from 'next/image';

import Button from '@/components/Button';

import { FaMapPin } from 'react-icons/fa'
import { Prestador } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

interface ProfileInfoProps {
  prestador: Prestador
};

const ProfileCard = ({ prestador }: ProfileInfoProps) => {

  return (
    <>
      <Link 
        href={`/professionals/${prestador.id}`}
        className='hover:scale-[1.03] transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]'>

        <div className="relative bg-white dark:bg-darkBGLighter rounded-2xl shadow-lg mx-2 mb-4 overflow-hidden">

          <span className="absolute text-black bg-yellow-400 rounded-[4px] top-6 left-6 px-2 py-1 text-sm font-bold roll-in-blurred-right">
            TOP
          </span>

          <div className='flex flex-col items-center justify-center mb-8'>
            <div className='rounded-full p-[6px] border-2 border-primary dark:border-primaryLighter mt-10 mb-4'>
              <Image
                src={prestador.url_foto}
                width={140}
                height={140}
                className='rounded-full h-36 w-36'
                style={{
                  objectFit: "cover",
                }}
                alt='Imagem Usuário'
              />
            </div>

            <h1 className="text-xl text-center truncate font-bold text-black dark:text-white">
              {prestador.nome}
            </h1>

            <div className='flex gap-1 my-1 p-2 text-sm font-semibold text-grayPrimary dark:text-grayLighter'>
              <FaMapPin className='text-base' />
              <p>{prestador.desc_cidade},</p>
              <p>{prestador.uf}</p>
            </div>
          </div>

          <div className="border-t-4 border-whiteBG dark:border-darkBG text-black dark:text-white p-4 text-xs 3xl:text-sm font-semibold flex justify-around items-center gap-2">
            <div className='flex flex-[40%] overflow-hidden flex-col'>
              <p className='flex justify-center items-center pb-1 font-mono -tracking-wider'>Categoria</p>
              <p className="px-2 p-1 bg-primary dark:bg-primaryLighter rounded-md text-white truncate text-center">
                {prestador.tipo_categoria}
              </p>
            </div>

            <div className='flex flex-[40%] overflow-hidden flex-col'>
              <p className='flex justify-center items-center pb-1 font-mono -tracking-wider'>Profissão</p>
              <p className="px-2 p-1 bg-primary dark:bg-primaryLighter rounded-md text-white truncate text-center">
                {prestador.desc_cbo}
              </p>
            </div>
          </div>

        </div>
      </Link>
    </>
  );
};

export default ProfileCard;