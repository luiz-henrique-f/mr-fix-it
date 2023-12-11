"use client"

import React from 'react';
import { useCallback, useState } from 'react';

import { Card, CardActions, CardContent, Stack, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Controller, useForm } from "react-hook-form";

import Button from '@/components/Button';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface CreateProfessionalForm {
  senha_antiga: String;
  senha: String;
}

type IdPrestadorResponse = {
  email: string;
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

const SettingsPass = () => {

  const { data } = useSession();
  const dados = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<CreateProfessionalForm>();

  const [email, setEmail] = React.useState<IdPrestadorResponse[]>([]);

  React.useEffect(() => {
    axios.get(`/getEmail/${(dados?.user as any)?.id}`)
      .then((response) => {
        // console.log(response.data[0].username)
        setEmail(response.data[0].username)
      })
  });

  // console.log(email)

  const onSubmit = async (data: CreateProfessionalForm) => {

    if (data.senha_antiga != data.senha) {
      toast.error("As senhas não são iguais. Verifique!", { position: "top-right" });
    } else {
      const response = await fetch("/updatePassword", {
        method: "PUT",
        body: Buffer.from(
          JSON.stringify({
            username: email,
            password: data.senha,
          })
        ),
      })
      // window.location.reload();

      toast.success("Senha alterada com sucesso!", { position: "top-right" });
    }

  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Card className='shadow-none bg-transparent scale-[.62] sm:scale-100'>

          <div className='p-4 flex flex-col justify-center items-start gap-1'>
            <h1 className='text-2xl font-semibold text-black dark:text-white'>Senha</h1>
            <p className='text-lg text-gray-400 dark:text-gray-500'>Deixe sua senha sempre atualizada!</p>
          </div>

          <CardContent
            sx={{
              input: {
                '&.Mui-focused': {
                  color: '#9055dd'
                },
                color: '#aaa',
              },
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
              svg: {
                '&.Mui-focused': {
                  color: '#9055dd'
                },
                color: '#aaa',
              },
            }}
          >
            <Stack
              spacing={3}
              sx={{ width: 400 }}
            >
              <TextField
                {...register("senha_antiga")}
                fullWidth
                label="Senha"
                type="password"
              />
              <TextField
                {...register("senha")}
                fullWidth
                label="Confirme a senha"
                type="password"
              />
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant="primary"
              onClick={() => handleSubmit(onSubmit)()}>
              Atualizar
            </Button>

          </CardActions>
        </Card>
      </ThemeProvider>
    </>
  );
};

export default SettingsPass;