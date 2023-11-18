"use client"

import React from 'react';

import Button from '@/components/Button';
import TextField from '@mui/material/TextField';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Controller, useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';

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
        const response = await fetch("http://localhost:3000/updatePassword", {
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

    return (
        <div className="relative flex flex-col bg-white dark:bg-darkBGLighter rounded-lg">
            <Dialog open={open} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}>
                <DialogTitle>
                    Alterar senha</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { marginTop: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >


                        <TextField
                            {...register("email")}
                            id="email"
                            label="E-mail"
                            // defaultValue=""
                            fullWidth />


                        <TextField
                            {...register("senha")}
                            id="password"
                            label="Senha Nova"
                            type="password"
                            // defaultValue=""
                            fullWidth />
                    </Box>
                </DialogContent>
                <DialogActions className='!flex !justify-between'>

                    <Button variant="outlined"
                        onClick={handleClose}>
                        <FiLogIn />
                        Cancelar
                    </Button>

                    <Button variant="outlined"
                        onClick={() => handleSubmit(onSubmit)()}>
                        <FiLogIn />
                        Alterar
                    </Button>
                </DialogActions>
            </Dialog>

            <span onClick={handleClickOpen} className="hover:text-primary cursor-pointer p-0">
                Esqueci minha senha
            </span>



        </div >
    )
}

export default UpdatePassword