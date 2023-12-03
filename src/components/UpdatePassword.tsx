"use client"

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import Button from '@/components/Button';

import TextField from '@mui/material/TextField';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
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
    email: String;
    senha: String;
}

const UpdatePassword = () => {

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
        const response = await fetch("/updatePassword", {
            method: "PUT",
            body: Buffer.from(
                JSON.stringify({
                    username: data.email,
                    password: data.senha,
                })
            ),
        })

        handleClose()
        toast.success("Senha alterada com sucesso!", { position: "top-right" });

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
                className="backdrop-blur-md">

                <div className="bg-white dark:bg-darkBGLighter">

                    <DialogTitle className='text-black dark:text-white'>Alterar senha</DialogTitle>
                    
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
                            className='flex flex-col gap-4'>


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
                                label="Senha Nova"
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
                            Alterar
                        </Button>
                    </DialogActions>
                </div >
            </Dialog>

                <span onClick={handleClickOpen} className="hover:text-primary dark:hover:text-primaryLighter cursor-pointer p-0">
                    Esqueci minha senha
                </span>



        </ThemeProvider>
    )
}

export default UpdatePassword