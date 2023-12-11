"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import {useEffect, useRef, useState} from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Prestador } from "@prisma/client";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';


import Login from "@/app/login/page";
import Button from "./Button";
import ThemeSwitch from "./ThemeSwitch";

import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { FiLogIn } from "react-icons/fi";
import { CgProfile } from 'react-icons/cg';
import { AiOutlineMenu, AiFillStar } from 'react-icons/ai';
import { ImCancelCircle } from "react-icons/im";
import { BsCheck2Square, BsGraphUp } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import EmailAutomatic from "@/app/components/EmailAutomatic";

interface CreateProfessionalForm {
    observacao: String;
}

type Url_fotoResponse = {
    url_foto: string;
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

type AdminResponse = {
    admin: string;
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

    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
    const { status, data } = useSession();
    const dados = data;

    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleDropdownFocus = (state: boolean) => {
        setMenuIsOpen(!state);
    };
    const handleClickOutsideDropdown = (e:any) => {
        if( menuIsOpen && !dropdownRef.current?.contains(e.target as Node)) {
            setMenuIsOpen(false)
        };
    };

    window.addEventListener("click", handleClickOutsideDropdown)

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

    const [nome, setNome] = React.useState<NomePrestadorResponse[]>([]);
    const [id_prestador, setIdPrestador] = React.useState<IdPrestadorResponse[]>([]);
    const [url_foto, setUrl_foto] = React.useState<Url_fotoResponse[]>([]);
    const [planoAtivo, setPlanoAtivo] = React.useState<PlanoAtivoResponse[]>([]);
    const [admin, setAdmin] = React.useState<AdminResponse[]>([]);

    React.useEffect(() => {
        axios.get(`/professionalUser/${(data?.user as any)?.id}`)
            .then((response) => {
                setIdPrestador((response.data[0] as any)?.id)
                setNome((response.data[0] as any)?.nome)
                setUrl_foto((response.data[0] as any)?.url_foto)
            })
    });

    React.useEffect(() => {
        axios.get(`/existePlanoAtivo/${(data?.user as any)?.id}`)
            .then((response) => {
                setPlanoAtivo((response.data[0] as any)?.id)
            })
    });

    React.useEffect(() => {
        axios.get(`/admin/${(data?.user as any)?.id}`)
            .then((response) => {
                setAdmin((response.data as any)?.admin)
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
        <div className='px-[5%] py-0 h-[85px] mx-auto flex justify-between items-center shadow-lg dark:shadow-neutral-900 bg-whiteBG dark:bg-darkBG'>
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

            {status === "unauthenticated" && (
                <div className="flex items-center gap-3 relative">

                    <ThemeSwitch />

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

                    <div ref={dropdownRef} className="flex items-center justify-center gap-3 border-grayLighter border rounded-lg py-3 px-5 relative">
                        <div>
                            <AiOutlineMenu onClick={(e) => handleDropdownFocus(open)} className="cursor-pointer text-xl" />
                        </div>

                        <ThemeSwitch />

                        <div className="h-10 w-10" >
                            <Image 
                                src={url_foto as any != undefined ? url_foto as any : 'https://files.edgestore.dev/mtrfpdbrv5037z9d/myPublicImages/_public/706a083f-94d5-4525-94c9-0d935626e6bb-thumb.png' }
                                height={40} 
                                width={40} 
                                className="rounded-full h-10 w-10" 
                                style={{
                                    objectFit: "cover",
                                }}
                                alt='Imagem Usuário'
                            />
                        </div>

                        {menuIsOpen && (
                            <div className="z-50 absolute top-[56px] -left-14 2xl:left-4 bg-white rounded-lg shadow-md gap-4 dark:bg-darkBGLighter after:border-l-[10px] after:border-r-[10px] after:border-t-[10px] after:border-transparent after:border-t-white dark:after:border-t-darkBGLighter after:absolute after:rotate-180 after:-top-2 after:left-20 2xl:after:left-2">

                                <ul className="flex flex-col items-end 2xl:items-start justify-end p-2">
                                    {id_prestador != undefined && planoAtivo != undefined && (admin as any) == ("N" as string) && (
                                        <div>
                                            <li className="group">
                                                <Link href={`/dashboard/${id_prestador}`}>
                                                    <Button
                                                        onClick={hidennMenu}
                                                        variant="dropbar">

                                                        <BsGraphUp className="text-xl text-center text-primary dark:text-primaryLighter" />
                                                        <span className="text-lg">Dashboard</span>
                                                    </Button>
                                                </Link>
                                            </li>

                                            <li className="group">
                                                <Link href={`/professionals/${id_prestador}`}>
                                                    <Button
                                                        onClick={hidennMenu}
                                                        variant="dropbar">

                                                        <CgProfile className="text-xl text-center text-primary dark:text-primaryLighter" />
                                                        <span className="text-lg">Meu Perfil</span>
                                                    </Button>
                                                </Link>
                                            </li>

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



                                    {(admin as any) == ("S" as string) && (
                                        <li className="group w-full">
                                            <Link href={`/adminPage`}>
                                                <Button
                                                    variant="dropbar"
                                                    className="">

                                                    <MdOutlineAdminPanelSettings className="text-xl text-center text-primary dark:text-primaryLighter" />
                                                    <span className="text-lg">Admin</span>
                                                </Button>
                                            </Link>
                                        </li>
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


                    </div>

                </div>
            )}

            <ThemeProvider theme={themestyle}>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    className="backdrop-blur-md">

                    <div className="bg-white dark:bg-darkBGLighter">
                        <DialogTitle className="text-black dark:text-white">
                            Avalie nosso site!
                        </DialogTitle>

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
                                    rows={4}
                                    maxRows={8}>
                                </TextField>
                            </Box>
                        </DialogContent>

                        <DialogActions className='!flex !justify-between'>
                            <Button variant="outlined"
                                onClick={handleClose}>

                                <LiaTimesSolid />
                                Cancelar
                            </Button>

                            <Button variant="outlined"
                                onClick={() => handleSubmit(onSubmit)()}>

                                <BsCheck2Square />
                                Enviar
                            </Button>
                        </DialogActions>

                    </div>
                </Dialog>
            </ThemeProvider>
            
        </div>
    )
}

export default Header;