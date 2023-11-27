"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { useForm } from 'react-hook-form';
import { Prestador } from '@prisma/client';
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from 'axios';

import ThemeSwitch from '@/components/ThemeSwitch';
import Button from '@/components/Button';

import { AiFillStar, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from "react-icons/im";

interface CreateProfessionalForm {
  observacao: String;
}

type IdPrestadorResponse = {
  id: string;
};

type NomePrestadorResponse = {
  nome: string;
};

type PlanoAtivoResponse = {
  plano: string;
};

const TopDetails = () => {

  // const professional = await getProfessionalDetails(params.professionalid);
  // const photo = await getPhotoProfessional(params.professionalid);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const {
    register,
    handleSubmit,
  } = useForm<CreateProfessionalForm>();

  const onSubmit = async (data: CreateProfessionalForm) => {
    const response = await fetch("http://localhost:3000/insertFeedback", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          nome: nome,
          comentario: data.observacao
        })
      ),
    });

      handleClose()
      toast.success("Avaliação enviada com sucesso. Muito obrigado <3", { position: "top-right" });
      // router.push(`/professionals/${(dados?.user as any)?.id}`);

  };

  const [menuIsOpen, setMenuIsOpen] = React.useState(false)
  const { status, data } = useSession();
  const dados = data;

  const handleLoginClick = () => signIn();
  const handleLogoutClick = () => {
    setMenuIsOpen(false)
    signOut()
  };

  const hidennMenu = () => {
    setMenuIsOpen(false)
  }

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  const router = useRouter()

  const [id_prestador, setIdPrestador] = React.useState<IdPrestadorResponse[]>([]);
  const [nome, setNome] = React.useState<NomePrestadorResponse[]>([]);
  const [planoAtivo, setPlanoAtivo] = React.useState<PlanoAtivoResponse[]>([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/professionalUser/${(data?.user as any)?.id}`)
      .then((response) => {
        setIdPrestador((response.data[0] as any)?.id)
        setNome((response.data[0] as any)?.nome)
      })
  });

  React.useEffect(() => {
    axios.get(`http://localhost:3000/existePlanoAtivo/${(data?.user as any)?.id}`)
      .then((response) => {
        console.log(data)
        setPlanoAtivo((response.data[0] as any)?.id)
      })
  });
  
  return (
    <>
      <div className='flex justify-center items-center text-white gap-4 mt-6'>

        <AiOutlineMenu onClick={handleMenuClick} className="cursor-pointer text-xl" />
        
        {menuIsOpen && (
          <div className="z-50 absolute top-[66px] right-[34px] bg-white rounded-lg shadow-md gap-4 dark:bg-darkBGLighter after:border-l-[10px] after:border-r-[10px] after:border-t-[10px] after:border-transparent after:border-t-white dark:after:border-t-darkBGLighter after:absolute after:rotate-180 after:-top-2 after:left-28 2xl:after:left-2">

            <ul className="flex flex-col items-end 2xl:items-start justify-end p-2">
              {id_prestador != undefined && planoAtivo != undefined && (
                <div>
                  <li className="group">
                    <Link onClick={handleClickOpen} href={""}>
                      <Button
                        onClick={hidennMenu}
                        variant="dropbar">

                        <AiFillStar className="text-xl text-center text-primary dark:text-primaryLighter" />
                        <span className="text-lg">Avaliar</span>
                      </Button>
                    </Link>
                  </li>
                </div>
              )}

              <li className="group w-full">
                <Button
                  variant="dropbar"
                  onClick={() => {
                    signOut({ redirect: false }).then(() => {
                      router.push("/"); // Redirect to the dashboard page after signing out
                    });
                  }}
                  className="">

                  <ImCancelCircle className="text-xl text-center text-primary dark:text-primaryLighter" />
                  <span className="text-lg">Logout</span>
                </Button>
              </li>
            </ul>

          </div>
        )}

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