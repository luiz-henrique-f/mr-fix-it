"use client"

import { Prestador } from '@prisma/client';
import React from 'react';
// import Button from '@mui/material/Button';
import Button from '@/components/Button';
import TextField from '@mui/material/TextField';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Controller, useForm } from "react-hook-form";

import ChangeButton from '@/components/ChangeButton'
import { Box } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';

interface ProfessionalDescriptionProps {
  description: string
}

interface CreateProfessionalForm {
  nome: String;
  cpf_cnpj: String;
  celular: String;
  categoria: String;
  sexo: String;
  uf: String;
  cidade: String;
  observacao: String;
}


const ProfessionalDescription = ({ description }: ProfessionalDescriptionProps) => {

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
    const response = await fetch("http://localhost:3000/updateSobreVoce", {
      method: "PUT",
      body: Buffer.from(
        JSON.stringify({
          observacao: data.observacao != '' && data.observacao,
          id_user: (dados?.user as any)?.id
        })
      ),
    });

    handleClose()
  // router.push(`/professionals/${(dados?.user as any)?.id}`);

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
    <div className="relative flex flex-col p-8 bg-white dark:bg-darkBGLighter rounded-lg w-full">
      <Dialog open={open} onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}>
        <DialogTitle>Atualizar o Sobre Você...</DialogTitle>
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
              {...register("observacao")}
              id="outlined-multiline-flexible"
              label="Sobre você"
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
            <FiLogIn />
            Cancelar
          </Button>

          <Button variant="outlined"
            onClick={() => handleSubmit(onSubmit)()}>
            <FiLogIn />
            Atualizar
          </Button>
        </DialogActions>
      </Dialog>
      <ChangeButton className='absolute top-3 right-3' onClick={handleClickOpen} />
      <h2 className='text-2xl mb-5 font-bold text-primaryDarker dark:text-white'>Sobre o Professional</h2>
      <p className='text-sm leading-5 text-justify text-primaryDarker dark:text-white mt-1 indent-3'>{description}</p>
    </div>
  )
}

export default ProfessionalDescription