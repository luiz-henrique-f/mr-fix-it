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

import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ThemeSwitch from '@/components/ThemeSwitch';
import Button from '@/components/Button';

import { AiFillStar, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from "react-icons/im";
import { LiaTimesSolid } from "react-icons/lia";
import { BsCheck2Square } from 'react-icons/bs';

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

interface ProfessionalInfoProps {
  url_foto: string;
};

const TopDetails = ({ url_foto }: ProfessionalInfoProps) => {

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
    const response = await fetch("/insertFeedback", {
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
    axios.get(`/professionalUser/${(data?.user as any)?.id}`)
      .then((response) => {
        setIdPrestador((response.data[0] as any)?.id)
        setNome((response.data[0] as any)?.nome)
      })
  });

  React.useEffect(() => {
    axios.get(`/existePlanoAtivo/${(data?.user as any)?.id}`)
      .then((response) => {
        console.log(data)
        setPlanoAtivo((response.data[0] as any)?.id)
      })
  });

  const themestyle = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#aaa"
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#aaa"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9055dd"
            },
            "& .MuiOutlinedInput-input": {
              color: "#aaa"
            },
          }
        }
      }
    }
  });
  
  return (
    <>
      <div className='flex justify-center items-center text-white gap-4 mt-6'>

        <AiOutlineMenu onClick={handleMenuClick} className="cursor-pointer text-xl" />
        
        {menuIsOpen && (
          <div className="z-50 absolute top-[66px] right-28 2xl:right-11 bg-white rounded-lg shadow-md gap-4 dark:bg-darkBGLighter after:border-l-[10px] after:border-r-[10px] after:border-t-[10px] after:border-transparent after:border-t-white dark:after:border-t-darkBGLighter after:absolute after:rotate-180 after:-top-2 after:left-20 2xl:after:left-2">

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
          src={url_foto}
          width={36}
          height={36}
          className='rounded-full h-9 w-h-9 mx-auto'
          style={{
            objectFit: "cover",
          }}
          alt='Imagem Usuário'
        />

        <ThemeProvider theme={themestyle}>
          <Dialog 
            open={open} 
            onClose={handleClose}
            fullWidth
            className='backdrop-blur-md'>

            <div className="bg-white dark:bg-darkBGLighter">
              <DialogTitle className="text-black dark:text-white">
                Avalie nosso site!
              </DialogTitle>
              
              <DialogContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { marginTop: 1 },
                  }}>

                  <TextField
                    {...register("observacao")}
                    label="Escreva sua avaliação aqui..."
                    fullWidth
                    sx={{
                      label: {
                        '&.Mui-focused': {
                          color: '#9055dd'
                        },
                        color: '#aaa',
                      },
                      select: {
                        '&.Mui-focused': {
                          color: '#9055dd'
                        },
                        color: '#aaa',
                      },
                  }}
                    multiline
                    rows={4}
                    maxRows={8}>
                  </TextField>
                </Box>
              </DialogContent>

              <DialogActions className='!flex !justify-between'>
                <Button 
                  variant="outlined"
                  onClick={handleClose}>

                  <LiaTimesSolid />
                  Cancelar
                </Button>

                <Button 
                  variant="outlined"
                  onClick={() => handleSubmit(onSubmit)()}>
                    
                  <BsCheck2Square />
                  Enviar
                </Button>
              </DialogActions>
              
            </div>
          </Dialog>
        </ThemeProvider>
      </div>
    </>
  );
};

export default TopDetails;