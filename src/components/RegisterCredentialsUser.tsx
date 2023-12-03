"use client"

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import Button from '@/components/Button';
import UpdatePassword from './UpdatePassword';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ImCancelCircle } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";

interface ProfessionalCategoryProps {
    categoria: string;
}

type categorieResponse = {
    id: string;
    descricao_categoria: string;
};


interface CreateProfessionalForm {
    nome: String;
    email: String;
    senha: String;
}

const RegisterCredentialsUser = () => {

    const { data } = useSession();
    const dados = data;

    // const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setError,
    } = useForm<CreateProfessionalForm>();

    const onSubmit = async (data: CreateProfessionalForm) => {
        const response = await fetch("/register", {
            method: "POST",
            body: Buffer.from(
                JSON.stringify({
                    name: data.nome,
                    username: data.email,
                    password: data.senha,
                })
            ),
        })

        handleClose()
        toast.success("Usuário criado com sucesso!", { position: "top-right" });

    }

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullWidth(event.target.checked);
    };

    const theme = createTheme({
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
                  borderColor: "#590BD8"
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
        <ThemeProvider theme={theme}>
            <Dialog 
                open={open} 
                onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                className="backdrop-blur-md"
            >
                <div className='bg-white dark:bg-darkBGLighter'>
                    <DialogTitle className='text-black dark:text-white'>Criar conta</DialogTitle>

                    <DialogContent
                        sx={{
                            input: {
                                color: '#aaa',
                            },
                            label: {
                                '&.Mui-focused': {
                                    color: '#590BD8'
                                },
                                color: '#aaa',
                            },
                            select: {
                                color: '#aaa',
                            },
                            svg: {
                                color: '#aaa',
                            },
                        }}>

                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { marginTop: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                            className='flex flex-col gap-2'
                        >


                            <TextField
                                {...register("nome")}
                                id="name"
                                label="Nome"
                                // defaultValue=""
                                fullWidth
                            />


                            <TextField
                                {...register("email")}
                                id="email"
                                label="E-mail"
                                // defaultValue=""
                                fullWidth 
                            />


                            <TextField
                                {...register("senha")}
                                id="password"
                                label="Senha"
                                type="password"
                                // defaultValue=""
                                fullWidth
                            />

                        </Box>
                    </DialogContent>
                    
                    <DialogActions className='!flex !justify-between mx-4'>

                        <Button variant="outlined"
                            onClick={handleClose}>
                            <ImCancelCircle />
                            Cancelar
                        </Button>

                        <Button variant="primary"
                            onClick={() => handleSubmit(onSubmit)()}>
                            <FaRegCheckCircle />
                            Criar
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>

            <div className="flex flex-col justify-center items-center sm:flex-row gap-2 text-sm no-underline text-gray-400 dark:text-gray-500 mx-0 my-1">
                <UpdatePassword />

                <span className='invisible sm:visible'>|</span>
                <div className='flex items-center flex-col bg-gray-200 dark:bg-neutral-700 sm:dark:bg-darkBGLighter dark:text-white sm:dark:text-gray-500 rounded-md p-3 sm:bg-transparent sm:border-none sm:flex-row sm:p-0 sm:gap-2'>
                    <p className='flex-nowrap'>Não tem uma conta?</p>
                    <span onClick={handleClickOpen}><p className='hover:text-primary dark:hover:text-primaryLighter cursor-pointer'>Cadastre-se</p></span>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default RegisterCredentialsUser;