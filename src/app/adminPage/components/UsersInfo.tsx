"use client"

import React from 'react';
import Image from 'next/image';

import MenuSpacer from '../../dashboard/[professionalid]/components/MenuSpacer';
import Button from '@/components/Button';

import { AiOutlineMenu } from 'react-icons/ai';
import { prisma } from '@/lib/prisma';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

interface ProfileInfoProps {
  nome: string,
  url_foto: string,
  desc_cidade: string,
  uf: string,
  data_fim: string,
  status: string,
  email: string,
};

const UsersInfo = ({ nome, url_foto, desc_cidade, uf, data_fim, status, email }: ProfileInfoProps) => {

  const onSubmit = async () => {

    const response = await fetch("/sendMail", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          email: email,
          nome: nome,
          data_fim: data_fim
        })
      ),
    }
    )

    toast.success("Email enviado com sucesso!", { position: "top-right" });
  };

  return (
    <>
      <div className='p-1 flex items-center justify-between'>

        <div className='flex flex-[10%] items-center justify-start pl-4'>
          <Button
            variant='icon'
            className='flex items-center justify-start'
            title='Enviar Mensagem de cobrança'
            onClick={onSubmit}>
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
              {desc_cidade}, {uf}
            </span>
          </div>
        </div>

        <div className='flex flex-[35%] items-center justify-center'>
          <p>{data_fim}</p>
        </div>

        {status === 'Inativo' && (
          <div className='flex flex-[20%] items-center justify-center'>
            <p className='p-1 px-2 uppercase font-mono font-semibold bg-gradient-to-br from-red-400 to-red-700 text-white rounded-xl'>{status}</p>
          </div>
        )}

        {status === 'Ativo' && (
          <div className='flex flex-[20%] items-center justify-center'>
            <p className='p-1 px-4 uppercase font-mono font-semibold bg-gradient-to-br from-green-400 to-green-700 text-white rounded-xl'>{status}</p>
          </div>
        )}

      </div>

      <MenuSpacer />

    </>
  );
};

export default UsersInfo;