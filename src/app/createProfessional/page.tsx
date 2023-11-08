"use client"

import * as React from 'react';
import Image from 'next/image'
import { toast } from 'react-toastify';
import { IMaskInput } from 'react-imask';
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from 'axios';
import { mask, unMask } from 'remask'

import { useTheme, styled } from '@mui/material/styles'
import { colors, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { StyledEngineProvider } from '@mui/material/styles';
import Button from '@/components/Button';

import { LiaTimesSolid } from "react-icons/lia";
import { BsCheck2Square } from 'react-icons/bs';
import { colorProp } from '@radix-ui/themes';

type IBGEUFResponse = {
  id: number;
  sigla: string;
  nome: string;
};

type IBGECITYResponse = {
  id: number;
  nome: string;
};

type categorieResponse = {
  id: string;
  descricao_categoria: string;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
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

const CreateProfessional = () => {

  const { data } = useSession();
  const dados = data;

  const router = useRouter();

  const fetchProfessional = async () => {
    const response = await fetch(`/existProfessional/${(dados?.user as any)?.id}/list`);

    const json = await response.json();

    if(json.length > 0){
      router.push(`/professionals/${(dados?.user as any)?.id}`)
    }

  };

  React.useEffect(() => {
    fetchProfessional();
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<CreateProfessionalForm>();

  const onSubmit = async (data: CreateProfessionalForm) => {
    const response = await fetch("http://localhost:3000/insertProfessional", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          nome: data.nome,
          cpf_cnpj: data.cpf_cnpj,
          celular: data.celular,
          categoria: data.categoria,
          sexo: data.sexo,
          uf: data.uf,
          cidade: data.cidade,
          observacao: data.observacao,
          id_user: (dados?.user as any)?.id
        })
      ),
    });

    const res = await response.json();
    if (res?.error?.code === "CPF_CNPJ_ALREADY_EXISTS") {
      setError("cpf_cnpj", {
        type: "manual",
        message: "Já existe um cadastro para esse CPF/CNPJ.",
      });
    } else if (res?.error?.code === "USER_ALREADY_EXISTS") {
      setError("nome", {
        type: "manual",
        message: "Já existe um cadastro para o usuário conectado.",
      })
    } else {
      return router.push("/pagamentoPlano");
    }

  }

  const [ufs, setUfs] = React.useState<IBGEUFResponse[]>([]);
  const [categories, setCategories] = React.useState<categorieResponse[]>([]);
  const [cities, setCities] = React.useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = React.useState("0");
  const [selectedCity, setSelectedCity] = React.useState("0");
  const [selectedCategorie, setSelectedCategorie] = React.useState("0");
  const [selectedValueCheckbox, setSelectedValueCheckbox] = React.useState("F");

  // const changeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValueCheckbox(event.target.value);
  // };

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

  React.useEffect(() => {
    axios.get('/categoria')
      .then((response) => {
        setCategories(response.data)
      })
  }, []);

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

  const handleSelectedCategorie = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const categorie = e.target.value;
    setSelectedCategorie(categorie);
  };

  const changeCheckbox = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const sexo = e.target.value;
    setSelectedValueCheckbox(sexo);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [valueCelular, setValueCelular] = React.useState("");
  const mudarMascaraCelular = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueCelular(mask(unMask(event.target.value), ['(99) 99999-9999']))
  }

  const [value, setValue] = React.useState("");
  const mudarMascara = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(mask(unMask(event.target.value), ['999.999.999-99', '99.99.999/9999-99']))
  }

  const PersonalizadoTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: theme.palette.mode === 'light' ? '#111111' : '#e5e7eb',
    },
    '& label': {
      color: theme.palette.mode === 'light' ? '#555555' : '#e5e7eb',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.mode === 'light' ? '#555555' : '#e5e7eb',
      },
      '&:hover fieldset': {
        backgroundColor: theme.palette.mode === 'light' ? '#B2BAC233' : '#B2BAC222',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.mode === 'light' ? '#111111' : '#e5e7eb',
      },
    },
  });

  return (
    <div className='flex justify-center items-center xl:gap-[10%] h-full'>
      <div className='flex flex-col justify-center items-center bg-whiteBGDarker/10 p-4 rounded-md border border-solid border-grayLighter/40 scale-90 2sm:scale-100'>
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
            error={!!errors?.nome}
            helperText={errors?.nome?.message}
          >
          </TextField>

          <TextField
            {...register("cpf_cnpj", {
              required: {
                value: true,
                message: 'Campo CPF/CNPJ é obrigatório',
              }
            })}
            id="cpf"
            label="CPF/CNPJ"
            onChange={mudarMascara}
            value={value}
            fullWidth
            error={!!errors?.cpf_cnpj}
            helperText={errors?.cpf_cnpj?.message}>
          </TextField>

          <div className='flex flex-col 2sm:flex-row 2sm:justify-between 2sm:gap-2'>
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
              error={!!errors?.celular}
              helperText={errors?.celular?.message}>
            </TextField>

            <TextField
              {...register("sexo", {
                required: {
                  value: true,
                  message: 'Campo sexo é obrigatório',
                }
              })}
              id="sexo"
              select
              label="Sexo"
              value={selectedValueCheckbox}
              // defaultValue=""
              fullWidth
              onChange={changeCheckbox}>
              <MenuItem key="M" value="M">
                Masculino
              </MenuItem>
              <MenuItem key="F" value="F">
                Feminino
              </MenuItem>
              <MenuItem key="NE" value="NE">
                Não Especificar
              </MenuItem>
            </TextField>
          </div>

          <div className='flex flex-col 2sm:flex-row 2sm:justify-between 2sm:gap-2'>
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
                <MenuItem key={city.id} value={city.nome}>
                  {city.nome}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <TextField
            {...register("categoria", {
              required: {
                value: true,
                message: 'Campo categoria é obrigatório',
              }
            })}
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
                {...register("observacao", {
                  required: {
                    value: true,
                    message: 'Campo sobre você é obrigatório',
                  }
                })}
                id="outlined-multiline-flexible"
                label="Sobre você"
                fullWidth

                multiline
                rows={4}
                maxRows={8}>
              </TextField>
            </div>
          </Box>
        </Box>

        {/* <Button onClick={() => handleSubmit(onSubmit)()}>
                Finalizar Cadastro
            </Button> */}
        {/* <DialogActions className='!flex !justify-between'>
            <Button 
              onClick={handleClose}
              className='bg-white dark:bg-darkBGLighter'>

              <button
                className="flex items-center justify-center gap-1 py-1 px-3 text-sm hover:bg-primary font-semibold border-[0.125rem] border-solid border-gray-500 rounded-md text-gray-500 hover:border-transparent transition-all duration-[0.2s] ease-[ease-in-out] hover:transition-all hover:duration-[0.2s] hover:ease-[ease-in-out] hover:text-white">
                <LiaTimesSolid/>
                Cancelar
              </button>
            </Button> */}
        <div className="flex flex-row-reverse">
          <Button onClick={() => handleSubmit(onSubmit)()}>
            <BsCheck2Square className='text-white' />
            Ir para pagamento
          </Button>
        </div>

        {/* </DialogActions> */}

      </div>

      <div>
        <Image
          src="/Queue.png"
          width={500}
          height={500}
          alt="Aside Image"
          className="relative hidden xl:block"
        />
      </div>
    </div>
  )

};

export default CreateProfessional