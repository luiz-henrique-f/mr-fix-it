"use client"

import * as React from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { IMaskInput } from 'react-imask';
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from 'axios';
import { mask, unMask } from 'remask';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Autocomplete, colors, useMediaQuery } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

type cboResponse = {
  cod_cbo: string;
  desc_cbo: string;
};

type Skill = {
  id: string;
  label: string;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

type IdPrestadorResponse = {
  id: string;
};

interface CreateProfessionalForm {
  nome: String;
  cpf_cnpj: String;
  celular: String;
  categoria: String;
  sexo: String;
  uf: String;
  cidade: String;
  desc_cidade: String;
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

  const [id_prestador, setIdPrestador] = React.useState<IdPrestadorResponse[]>([]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/professionalUser/${(dados?.user as any)?.id}`)
      .then((response) => {
        setIdPrestador((response.data[0] as any)?.id)
      })
  });

  // const fetchProfessional = async () => {
  //   const response = await fetch(`/existProfessional/${(dados?.user as any)?.id}/list`);

  //   const json = await response.json();

  //   console.log(json)

  //   if(json.length > 0){
  //     router.push(`/professionals/${id_prestador}`)
  //   }

  // };

  // React.useEffect(() => {
  //   fetchProfessional();
  // })

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
          cod_cbo: skill?.id,
          desc_cbo: skill?.label,
          cidade: data.cidade.substring(0, 7),
          desc_cidade: data.cidade.substring(7),
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
  const [cbos, setCbos] = React.useState<cboResponse[]>([]);
  const [cities, setCities] = React.useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = React.useState("0");
  const [selectedCity, setSelectedCity] = React.useState("0");
  const [selectedCategorie, setSelectedCategorie] = React.useState("0");
  const [selectedCbo, setSelectedCbo] = React.useState("0");
  const [selectedValueCheckbox, setSelectedValueCheckbox] = React.useState("M");

  const [skill, setSkill] = React.useState<Skill | null>(null)

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
    axios.get('/api/categoria')
      .then((response) => {
        setCategories(response.data)
      })
  }, []);

  React.useEffect(() => {
    axios.get('/api/cbo')
      .then((response) => {
        setCbos(response.data)
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

  const handleSelectedCbo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const cbo = e.target.value;
    setSelectedCbo(cbo);
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

  const cboOptions = cbos.map((cbo) => ({
    id: cbo.cod_cbo,
    label: cbo.desc_cbo
  }))

  const themestyle = createTheme({
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

  return (
    <ThemeProvider theme={themestyle}>

      <div className='flex justify-center items-center xl:gap-[10%] h-full'>
        <div className='flex flex-col justify-center items-center bg-whiteBGDarker/10 p-4 rounded-md border border-solid border-grayLighter/40 scale-90 2sm:scale-100'>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '96.8%' },
              input: {
                color: '#aaa',
              },
              label: {
                '&.Mui-focused': {
                  color: '#9055dd'
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
                  <MenuItem key={city.id} value={city.id + city.nome}>
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

            <Autocomplete
              options={cboOptions}
              renderInput={(params) => <TextField {...params} label="Ocupação" />}
              value={skill}
              onChange={(event: any, newValue: Skill | null) => setSkill(newValue)}
            />

            {/* <TextField
              {...register("cbo", {
                required: {
                  value: true,
                  message: 'Campo ocupação é obrigatório',
                }
              })}
              id="categorie"
              select
              label="Ocupação"
              value={selectedCbo}
              // defaultValue=""
              fullWidth
              error={!!errors?.categoria}
              helperText={errors?.categoria?.message}
              onChange={handleSelectedCbo}>
              {cbos.map(cbo => (
                <MenuItem key={cbo.id} value={cbo.id}>
                  {cbo.desc_cbo}
                </MenuItem>
              ))}
            </TextField> */}

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
    </ThemeProvider>
  )

};

export default CreateProfessional