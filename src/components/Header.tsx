"use client"

import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Prestador } from "@prisma/client";
import Link from "next/link";
import React from "react";
import axios from 'axios';

import Login from "@/app/login/page";
import Button from "./Button";

import { AiOutlineMenu } from 'react-icons/ai'
import ChangeButton from '@/components/ChangeButton'
import { BsCheck2Square, BsSunFill } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

interface CreateProfessionalForm {
    observacao: String;
  }

interface ProfessionalProps {
    professional: Prestador;
}

type IdPrestadorResponse = {
    id: string;
};

type NomePrestadorResponse = {
    nome: string;
};



const Header = () => {
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
    
      }

    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    // const theme = document.documentElement.classList.contains("dark") ? 'dark' : 'light';
    // const currentTheme = document.documentElement.classList.contains("dark") ? 'dark' : 'light';

    function light() {
        // localStorage.theme = 'light'
        setTheme('light')
        document.documentElement.classList.remove('dark')
        // console.log(localStorage.theme);
    }

    function dark() {
        setTheme("dark")
        document.documentElement.classList.add('dark')
        // console.log(localStorage.theme);
    }

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

    // const onSubmit = async () => {
    //     setMenuIsOpen(false)
    //     const result = await signOut("google", {
    //       redirect: false,
    //       callbackUrl: "/",
    //     })
    //   }

    const router = useRouter()

    const [id_prestador, setIdPrestador] = React.useState<IdPrestadorResponse[]>([]);
    const [nome, setNome] = React.useState<NomePrestadorResponse[]>([]);

    React.useEffect(() => {
        axios.get(`http://localhost:3000/professionalUser/${(data?.user as any)?.id}`)
            .then((response) => {
                setIdPrestador((response.data[0] as any)?.id)
                setNome((response.data[0] as any)?.nome)
            })
    });

    return (
        <div className='px-[5%] py-0 h-[85px] mx-auto flex justify-between items-center shadow-2xl dark:shadow-whiteBG/10 bg-whiteBG dark:bg-darkBG'>
            <div className="flex items-center justify-start h-full w-full">
                <Link href="/" className="inline-flex items-center justify-between">

                    <Image
                        src="/Logo_3.0_roxo.png"
                        width={50}
                        height={50}
                        alt="Mr. Fix It" />

                    <div className="relative left-5 text-black dark:text-white">
                        <h1 className="font-semibold text-3xl tracking-[0.4375rem] invisible sm:visible">Mr. Fix</h1>
                        <span className="text-base tracking-[0.1875rem] invisible sm:visible">it</span>
                        <span className="text-xl tracking-[-0.025rem] pl-1 invisible sm:visible">——————</span>
                    </div>

                </Link>
            </div>

            {/* {theme == 'light' ? <div className="bg-white">gfdsgdf</div> : <div className="bg-amber-300">fsgfdgsd</div>} */}

            {/* <div className="flex items-center justify-end gap-5">
                {status === "unauthenticated" && (
                    <button
                        className="flex items-center justify-center py-1 px-3 gap-2 text-lg bg-transparent font-semibold border-[0.125rem] border-solid border-gray-400 rounded-md hover:text-white hover:border-transparent hover:bg-gray-400/40 transition-all duration-[0.2s] ease-[ease-in-out] hover:transition-all hover:duration-[0.2s] hover:ease-[ease-in-out]"
                        onClick={handleLoginClick}>
                        <FiLogIn />
                        Entre
                    </button>
                )}

                {status === "unauthenticated" && (
                    <Link
                        href="/login"
                        className="flex items-center justify-center py-1 px-3 gap-2 w-32 text-lg bg-primary font-semibold border-[0.125rem] border-solid border-primary rounded-md text-white hover:border-transparent hover:bg-primaryDarker transition-all duration-[0.2s] ease-[ease-in-out] hover:transition-all hover:duration-[0.2s] hover:ease-[ease-in-out]">
                        Cadastre-se
                    </Link>
                )}
            </div>  */}

            {/* onClick={handleLoginClick} */}
                <Dialog open={open} onClose={handleClose}
                fullWidth
                >
                <DialogTitle>Avalie nosso site!</DialogTitle>
                <DialogContent>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { marginTop: 1 },
                    }}
                  >
                    <TextField
                      {...register("observacao")}
                      label="Escreva sua avaliação aqui..."
                      fullWidth
                      multiline
                      rows={4}
                      maxRows={8}>
                    </TextField>
                  </Box>
                </DialogContent>
                <DialogActions className='!flex !justify-between'>
                  <Button variant="outlined"
                    onClick={handleClose}>
                    Cancelar
                  </Button>
        
                  <Button variant="outlined"
                    onClick={() => handleSubmit(onSubmit)()}>
                    Atualizar
                  </Button>
                </DialogActions>
              </Dialog>

            {status === "unauthenticated" && (
                <div className="flex items-center gap-3 relative">

                    {theme == 'light' ? <BiSolidMoon size={16} onClick={() => currentTheme == "dark" ? light() : dark()} className="cursor-pointer text-black " /> : <BsSunFill size={16} onClick={() => currentTheme == "dark" ? light() : dark()} className="cursor-pointer text-white " />}

                    <Link href={'/login'}>
                        <Button variant="outlined">
                            <FiLogIn />
                            Entrar
                        </Button>
                    </Link>
                </div>
            )}




            {status === "authenticated" && data.user && (
                <div className="flex gap-5">

                    {id_prestador == undefined && (
                        <div>
                            <Link href='/createProfessional'>
                                <Button>
                                    <BsCheck2Square className='text-white' />
                                    Completar cadastro
                                </Button>
                            </Link>
                        </div>
                    )}
                    <div className="flex items-center gap-3 border-grayLighter border border-solid p-2 px-3 rounded-full relative">
                        <AiOutlineMenu onClick={handleMenuClick} className="cursor-pointer text-3xl 2sm:text-2xl md:text-xl" />

                        {theme == 'light' ?
                            <BiSolidMoon
                                onClick={() => currentTheme == "dark" ? light() : dark()}
                                className="cursor-pointer text-3xl 2sm:text-2xl md:text-xl"
                            />
                            :
                            <BsSunFill
                                onClick={() => currentTheme == "dark" ? light() : dark()}
                                className="cursor-pointer text-3xl 2sm:text-2xl md:text-xl"
                            />
                        }

                        {/* <Image height={35} width={35} src={data?.user?.image!} alt={data?.user?.name!} className="rounded-full shadow-md" /> */}



                        {menuIsOpen && (
                            <div className="z-50 p-2 absolute top-14 left-0 w-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center dark:bg-zinc-800">

                                {id_prestador != undefined && (
                                    <div className="flex flex-col items-center justify-center">
                                        <Link href={`/dashboard/${id_prestador}`}>
                                            <button className="text-primary text-sm font-semibold border-b-4" onClick={hidennMenu}>
                                                Dashboard
                                            </button>
                                        </Link>

                                        <Link href={`/professionals/${id_prestador}/${status}`}>
                                            <button className="text-primary text-sm font-semibold border-b-4" onClick={hidennMenu}>
                                                Meu Perfil
                                            </button>
                                        </Link>
                                        
                                        <Link onClick={handleClickOpen} href={""}>
                                            <button className="text-primary text-sm font-semibold border-b-4" onClick={hidennMenu}>
                                                Avaliar
                                            </button>
                                        </Link>
                                    </div>
                                )}


                                <button
                                    className="text-primary text-sm font-semibold"
                                    onClick={() => {
                                        signOut({ redirect: false }).then(() => {
                                            router.push("/"); // Redirect to the dashboard page after signing out
                                        });
                                    }}>
                                    Logout
                                </button>
                            </div>
                        )}

                    </div>

                </div>
            )}
        </div>
    )
}

export default Header;