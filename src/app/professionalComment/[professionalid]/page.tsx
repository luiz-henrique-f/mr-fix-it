"use client"

import * as React from 'react';
import Image from 'next/image'
import { IMaskInput } from 'react-imask';
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { mask, unMask } from 'remask'

import { useTheme, styled } from '@mui/material/styles'
import { Rating, colors, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Button from '@/components/Button';

import { BsCheck2Square } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface CreateProfessionalForm {
  nome: String;
  titulo_comentario: String;
  celular: String;
  comentario: String;
  observacao: String;
}

// interface

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#0) 00000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

const ProfessionalComment = ({ params }: { params: { professionalid: string } }) => {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<CreateProfessionalForm>();

  const onSubmit = async (data: CreateProfessionalForm) => {
    console.log(valueStar)
    const response = await fetch("/insertComentario", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          nome: data.nome,
          titulo_comentario: data.titulo_comentario,
          celular: data.celular,
          comentario: data.comentario,
          nota: valueStar,
          id_prestador: params.professionalid
        })
      ),
    });

    const res = await response.json();

    router.push(`/professionals/${params.professionalid}`);

  }
  const theme = useTheme();

  const [valueCelular, setValueCelular] = React.useState("");
  const mudarMascaraCelular = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueCelular(mask(unMask(event.target.value), ['(99) 99999-9999']))
  }

  const themefield = createTheme({
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

  const [valueStar, setValueStar] = React.useState<number | null>(0);

  return (
    <>
      <ThemeProvider theme={themefield}>
        <div className='absolute top-0 left-0 flex flex-row-reverse justify-around h-screen w-screen overflow-hidden bg-whiteBG dark:bg-darkBG'>
          <div className='flex justify-center items-center w-full h-full bg-whiteBG dark:bg-darkBG'>
            <div className='flex flex-col justify-center items-center bg-whiteBGDarker/10 p-4 rounded-md border border-solid border-grayLighter/40 scale-75 2sm:scale-100'>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '96.8%' },
                }}
                noValidate
                autoComplete="off">

                <TextField
                  {...register("nome", {
                    required: {
                      value: true,
                      message: 'Nome é obrigatório',
                    }
                  })}
                  id="name"
                  label="Nome completo"
                  fullWidth
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
                  }}
                  error={!!errors?.nome}
                  helperText={errors?.nome?.message}
                >
                </TextField>

                <TextField
                  {...register("celular", {
                    required: {
                      value: true,
                      message: 'Campo celular é obrigatório',
                    }
                  })}
                  id="celular"
                  label="Celular"
                  onChange={mudarMascaraCelular}
                  value={valueCelular}
                  fullWidth
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
                  }}
                  error={!!errors?.celular}
                  helperText={errors?.celular?.message}>
                </TextField>



                <div className='flex flex-col 2sm:flex-row 2sm:justify-between 2sm:gap-2'>
                  <TextField
                    {...register("titulo_comentario", {
                      required: {
                        value: true,
                        message: 'Nome é obrigatório',
                      }
                    })}
                    id="name"
                    label="Título Comentário"
                    fullWidth
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
                    }}
                    error={!!errors?.nome}
                    helperText={errors?.nome?.message}
                  >
                  </TextField>
                </div>

                <div className='flex border border-[#aaa] p-6 ml-2 sm:mx-2 rounded'>
                  <h1 className='text-[#aaa] -ml-2 pr-4'>Qualidade do serviço:</h1>
                  <Rating
                    name="simple-controlled"
                    value={valueStar}
                    onChange={(event, newValue) => {
                      setValueStar(newValue);
                      console.log(newValue)
                    }}

                    icon={
                      <AiFillStar
                        className='text-orange-400'
                      />
                    }
                    emptyIcon={
                      <AiFillStar
                        className='text-grayLighter opacity-60 dark:opacity-30'
                      />
                    }>
                  </Rating>
                </div>

                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      {...register("comentario", {
                        required: {
                          value: true,
                          message: 'Campo sobre você é obrigatório',
                        }
                      })}
                      id="outlined-multiline-flexible"
                      label="Comentário"
                      fullWidth
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
                      }}
                      multiline
                      rows={4}
                      maxRows={8}>
                    </TextField>
                  </div>
                </Box>
              </Box>

              <div className="flex flex-row-reverse">
                <Button onClick={() => handleSubmit(onSubmit)()}>
                  <BsCheck2Square className='text-white' />
                  Enviar
                </Button>
              </div>
              
            </div>
          </div>

          <div className='lg:flex justify-center items-center w-full h-full bg-gradient-to-br from-primaryDarker to-primary hidden'>
            <Image
              src="/Queue.png"
              width={500}
              height={500}
              alt="Aside Image"
              className="relative hidden lg:flex"
            />
          </div>
        </div>
      </ThemeProvider>
    </>
  );

};

export default ProfessionalComment;