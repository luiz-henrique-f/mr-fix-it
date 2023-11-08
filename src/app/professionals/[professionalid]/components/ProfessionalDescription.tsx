"use client"

import { Prestador } from '@prisma/client';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import ChangeButton from '@/components/ChangeButton'
import { Box } from '@mui/material';

interface ProfessionalDescriptionProps {
    description: string
}

const ProfessionalDescription = ({description}: ProfessionalDescriptionProps) => {

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
              '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
          <TextField
                // {...register("observacao", {
                //   required: {
                //     value: true,
                //     message: 'Campo sobre você é obrigatório',
                //   }
                // })}
                id="outlined-multiline-flexible"
                label="Sobre você"
                fullWidth

                multiline
                rows={4}
                maxRows={8}>
              </TextField>
              </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
            <ChangeButton className='absolute top-3 right-3' onClick={handleClickOpen}/>
            <h2 className='text-2xl mb-5 font-bold text-primaryDarker dark:text-white'>Sobre o Professional</h2>
            <p className='text-sm leading-5 text-justify text-primaryDarker dark:text-white mt-1 indent-3'>{description}</p>
        </div>
    )
}

export default ProfessionalDescription