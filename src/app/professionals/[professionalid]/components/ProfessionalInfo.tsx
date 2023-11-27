"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { IMaskInput } from 'react-imask';
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { mask, unMask } from 'remask'
import axios from 'axios';

import ChangeButton from '@/components/ChangeButton'

import { Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Button from '@/components/Button';

import { BsWhatsapp } from 'react-icons/bs'
import { FaMapPin } from 'react-icons/fa'
import { FiLogIn } from 'react-icons/fi';

type IBGEUFResponse = {
    id: number;
    sigla: string;
    nome: string;
};

type IBGECITYResponse = {
    id: number;
    nome: string;
};
interface ProfessionalInfoProps {
    name: string;
    city: string;
    uf: string;
    telefone: string;
    urlFoto: string;
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

type IdPrestadorResponse = {
    id: string;
};

const ProfessionalInfo = ({ name, city, uf, telefone, urlFoto }: ProfessionalInfoProps) => {

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
        const response = await fetch("http://localhost:3000/updateInfoProfessional", {
            method: "PUT",
            body: Buffer.from(
                JSON.stringify({
                    celular: data.celular != '' && data.celular,
                    uf: data.uf != '' && data.uf,
                    cidade: data.cidade != '' && data.cidade,
                    id_user: (dados?.user as any)?.id
                })
            ),
        });

        handleClose()
        // router.push(`/professionals/${(dados?.user as any)?.id}`);

    }

    const [ufs, setUfs] = React.useState<IBGEUFResponse[]>([]);
    const [cities, setCities] = React.useState<IBGECITYResponse[]>([]);
    const [selectedUf, setSelectedUf] = React.useState("0");
    const [selectedCity, setSelectedCity] = React.useState("0");
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

    React.useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
            .then((response) => {
                setUfs(response.data)
            })
    }, []);

    React.useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then((response) => {
                setCities(response.data)
            })
    }, [selectedUf]);

    const handleSelectedUf = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const uf = e.target.value;
        setSelectedUf(uf);
    };

    const handleSelectedCity = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const city = e.target.value;
        setSelectedCity(city);
    };

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

    const [valueCelular, setValueCelular] = React.useState("");
    const mudarMascaraCelular = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueCelular(mask(unMask(event.target.value), ['(99) 99999-9999']))
    }

    const [value, setValue] = React.useState("");
    const mudarMascara = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(mask(unMask(event.target.value), ['999.999.999-99', '99.99.999/9999-99']))
    }

    const [id_prestador, setIdPrestador] = React.useState<IdPrestadorResponse[]>([]);

    React.useEffect(() => {
        axios.get(`http://localhost:3000/professionalUser/${(dados?.user as any)?.id}`)
            .then((response) => {
                setIdPrestador((response.data[0] as any)?.id)
            })
    });

    const linkAvaliacao = () => {
        navigator.clipboard.writeText(`http://localhost:3000/professionalComment/${id_prestador}`)
        toast.success("Link copiado com sucesso!", { position: "top-right" });
    }

    return (
        <div className="relative flex flex-col justify-center items-center bg-white dark:bg-darkBGLighter rounded-lg w-full gap-5 p-8">
            <Dialog open={open} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}>
                <DialogTitle>Atualizar Informações</DialogTitle>
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
                            {...register("celular")}
                            id="celular"
                            label="Celular"
                            onChange={mudarMascaraCelular}
                            value={valueCelular}
                            fullWidth
                            error={!!errors?.celular}
                            helperText={errors?.celular?.message}>
                        </TextField>
                        <TextField
                            {...register("uf")}
                            id="uf"
                            select
                            label="UF"
                            name='uf'
                            fullWidth
                            onChange={handleSelectedUf}>

                            {ufs.map(uf => (
                                <MenuItem key={uf.id} value={uf.sigla}>
                                    {uf.nome}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            {...register("cidade")}
                            id="city"
                            select
                            label="Cidade"
                            fullWidth
                            onChange={handleSelectedCity}>

                            {cities.map(city => (
                                <MenuItem key={city.id} value={city.id}>
                                    {city.nome}
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

            {/* {status == 'authenticated' && <ChangeButton className='absolute top-3 right-3' onClick={handleClickOpen} />} */}

            <div className='rounded-full p-[6px] border-2 border-primary dark:border-primaryLighter'>
                <Image
                    src={urlFoto}
                    width={140}
                    height={140}
                    className='rounded-full h-36 w-36'
                    style={{
                        objectFit: "cover",
                    }}
                    alt='Imagem Usuário'
                />
            </div>

            <div className='flex flex-col items-center mb-2'>
                <h1 className='font-bold text-2xl text-primaryDarker dark:text-white'>{name}</h1>

                <div className='flex items-center gap-1 my-1 mt-8 text-sm font-semibold text-grayPrimary dark:text-grayLighter'>
                    <FaMapPin className='text-base' />
                    <p>{city},</p>
                    <p>{uf}</p>
                </div>

                <div className='gap-1 my-1'>
                    <Link href={`https://wa.me/55${telefone.replace(/[^\w\s]/gi, '').replace(' ', '')}`} target='_blank'><p className='flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-600'>
                        <BsWhatsapp className='text-center text-sm text-green-600' />
                        +55 {telefone}
                    </p>
                    </Link>
                </div>
            </div>

            <div className='absolute flex justify-center pt-2 bottom-3 border-t-2 border-solid border-whiteBG dark:border-darkBG w-full'>
                <p className='uppercase font-semibold text-sm text-grayPrimary dark:text-grayLighter'>Membro desde: Outubro, 2023</p>
            </div>

            {status == 'authenticated' &&
                (<div className='flex flex-col items-center mb-4'>
                    <Button variant="outlined"
                        onClick={() => linkAvaliacao()}
                    >
                        <FiLogIn />
                        Link para Avaliação
                    </Button>
                </div>
                )}

        </div>
    )
}

export default ProfessionalInfo