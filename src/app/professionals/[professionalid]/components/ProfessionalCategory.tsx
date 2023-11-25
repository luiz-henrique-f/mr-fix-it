"use client"

import React from 'react';

import ChangeButton from '@/components/ChangeButton'
import CategoryItems from './CategoryItems'
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
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';

interface ProfessionalCategoryProps {
    categoria: string;
}

type categorieResponse = {
    id: string;
    descricao_categoria: string;
  };
  

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

const ProfessionalCategory = ({ categoria }: ProfessionalCategoryProps) => {

    const { data, status } = useSession();
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
        const response = await fetch("http://localhost:3000/updateCategoria", {
            method: "PUT",
            body: Buffer.from(
                JSON.stringify({
                    tipo_categoria: data.categoria != '' && data.categoria,
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

    const [categories, setCategories] = React.useState<categorieResponse[]>([]);

    const [selectedCategorie, setSelectedCategorie] = React.useState("0");

    React.useEffect(() => {
        axios.get('/categoria')
            .then((response) => {
                setCategories(response.data)
            })
    }, []);

    const handleSelectedCategorie = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const categorie = e.target.value;
      setSelectedCategorie(categorie);
    };

    return (
        <div className="relative flex flex-col bg-white dark:bg-darkBGLighter rounded-lg w-full gap-5 p-8">
            <Dialog open={open} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}>
                <DialogTitle>Atualizar Categoria</DialogTitle>
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
                            {...register("categoria")}
                            id="categorie"
                            select
                            label="Categoria"
                            value={selectedCategorie}
                            // defaultValue=""
                            fullWidth
                            error={!!errors?.categoria}
                            helperText={errors?.categoria?.message}
                            onChange={handleSelectedCategorie}>
                            {categories.map(categorie => (
                                <MenuItem key={categorie.id} value={categorie.descricao_categoria}>
                                    {categorie.descricao_categoria}
                                </MenuItem>
                            ))}
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

            {status == 'authenticated' && <ChangeButton className='absolute top-3 right-3' onClick={handleClickOpen} />}

            <h1 className='flex justify-center font-bold text-2xl text-primaryDarker dark:text-white items-center'>Categoria</h1>

            <div className='items-center'>
                <CategoryItems items={categoria} />
            </div>

        </div>
    )
}

export default ProfessionalCategory