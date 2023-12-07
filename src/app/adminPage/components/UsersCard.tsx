import React from 'react';
import { prisma } from "@/lib/prisma";

import UsersInfo from './UsersInfo';

const UsersCard = async () => {

  const prestadores = await prisma.prestador.findMany({}).finally(() => {
    prisma.$disconnect();
  });
  
  return (
    <>
      <div className='flex flex-col gap-2 m-2'>
        <div className='p-1 px-3 flex items-center justify-between text-lg uppercase font-semibold font-mono text-gray-400'>
          
          <div className='flex flex-[10%] items-center justify-start'>
            <p>Ações</p>
          </div>

          <div className='flex flex-[35%] items-center justify-start pl-14'>
            <p>Nome</p>
          </div>

          <div className='flex flex-[35%] items-center justify-center'>
            <p>???</p>
          </div>
          
          <div className='flex flex-[20%] items-center justify-center'>
            <p>Status</p>
          </div>
          
        </div>
      
        <div className='flex flex-col gap-2 overflow-y-scroll'>
          {prestadores.map((prestador) => (
            <UsersInfo prestador={prestador} key={prestador.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersCard;