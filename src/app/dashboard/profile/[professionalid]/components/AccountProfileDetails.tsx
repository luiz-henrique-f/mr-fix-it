"use client"

import * as React from 'react'
import { mask, unMask } from 'remask'
import { IMaskInput } from 'react-imask';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from "react-toastify";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';

import Button from '@/components/Button';

import { Box, Card, CardContent, CardHeader, TextField, Unstable_Grid2 as Grid, MenuItem, Autocomplete } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ChangeButton from '@/components/ChangeButton';

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

type IBGEUFResponse = {
  id: number;
  sigla: string;
  nome: string;
};

type IBGECITYResponse = {
  id: string;
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

type SkillCategorie = {
  id: string;
  label: string;
};

type SkillCity = {
  id: string;
  label: string;
};

interface ProfessionalInfoProps {
  id: string;
  name: string;
  city: string;
  uf: string;
  telefone: string;
  cpf_cnpj: string;
  observacao: string;
  sexo: string;
  cbo: string;
  categoria: string;
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
  // cidade: String;
  observacao: String;
  // cbo: String;
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

const AccountProfileDetails = ({ id, name, city, uf, telefone, cpf_cnpj, categoria, sexo, observacao, cbo }: ProfessionalInfoProps) => {


  const [ufs, setUfs] = React.useState<IBGEUFResponse[]>([]);
  const [categories, setCategories] = React.useState<categorieResponse[]>([]);
  const [cbos, setCbos] = React.useState<cboResponse[]>([]);
  const [cities, setCities] = React.useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = React.useState(uf);
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedCbo, setSelectedCbo] = React.useState(cbo);
  const [selectedCategorie, setSelectedCategorie] = React.useState(categoria);
  const [selectedValueCheckbox, setSelectedValueCheckbox] = React.useState(sexo);

  const [skill, setSkill] = React.useState<Skill | null>(cbo as any)
  const [skillCategorie, setSkillCategorie] = React.useState<SkillCategorie | null>(categoria as any)
  const [skillCity, setSkillCity] = React.useState<SkillCity | null>(city as any)

  // const changeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValueCheckbox(event.target.value);
  // };

  console.log(skillCity?.id)

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

  // const { nome, cpf_cnpj, cod_tipo_categoria, categoria, celular, uf, cod_cidade, desc_cidade, sexo, observacao, id_user, cbo, desc_cbo} 

  const onSubmit = async (data: CreateProfessionalForm) => {
    console.log({skill})
    // return;
    const response = await fetch("/updateProfessionalAll", {
      method: "PUT",
      body: Buffer.from(
        JSON.stringify({
          nome: data.nome,
          cpf_cnpj: data.cpf_cnpj,
          celular: data.celular,
          cod_tipo_categoria: skillCategorie?.id,
          categoria: skillCategorie?.label,
          sexo: data.sexo,
          uf: data.uf,
          cbo: skill?.id,
          desc_cbo: skill?.label,
          cod_cidade: skillCity?.id.toString(),
          desc_cidade: skillCity?.label,
          observacao: data.observacao,
          id_user: id
        })
      ),
    });

    const res = await response.json();

    console.log({ res })

    toast.success("Dados alterados com sucesso!", { position: "top-right" });

  }

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

  const [valueCelular, setValueCelular] = React.useState(telefone);
  const mudarMascaraCelular = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueCelular(mask(unMask(event.target.value), ['(99) 99999-9999']))
  }

  const [value, setValue] = React.useState(cpf_cnpj);
  const mudarMascara = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(mask(unMask(event.target.value), ['999.999.999-99', '99.99.999/9999-99']))
  }

  const cboOptions = cbos.map((cbo) => ({
    id: cbo.cod_cbo,
    label: cbo.desc_cbo
  }))

  const categoriesOptions = categories.map((categories) => ({
    id: categories.id,
    label: categories.descricao_categoria
  }))

  const ctiesOptions = cities.map((city) => ({
    id: city.id,
    label: city.nome
  }))

  return (
    <ThemeProvider theme={theme}>


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
                  defaultValue={name}
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

                <div className='flex flex-col 2sm:flex-row 2sm:justify-between 2sm:gap-2 2sm:mr-2'>
                  <TextField
                    {...register("uf")}
                    id="uf"
                    select
                    label="UF"
                    name='uf'
                    fullWidth
                    defaultValue={uf}
                    onChange={handleSelectedUf}>

                    {ufs.map(uf => (
                      <MenuItem key={uf.id} value={uf.sigla}>
                        {uf.nome}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Autocomplete
                    options={ctiesOptions}
                    renderInput={
                      (params) => <TextField
                        {...params}
                        label="Cidade"
                        sx={{
                          input: {
                            '&.Mui-focused': {
                              color: '#590BD8'
                            },
                            color: '#aaa',
                          },
                          label: {
                            '&.Mui-focused': {
                              color: '#590BD8'
                            },
                            color: '#aaa',
                          },
                          select: {
                            '&.Mui-focused': {
                              color: '#590BD8'
                            },
                            color: '#aaa',
                          },
                          svg: {
                            '&.Mui-focused': {
                              color: '#590BD8'
                            },
                            color: '#aaa',
                          },
                        }}
                      />
                    }
                    value={skillCity}
                    fullWidth
                    onChange={(event: any, newValue: SkillCity | null) => setSkillCity(newValue)}
                  />

                </div>

                <Autocomplete
                  options={categoriesOptions}
                  renderInput={
                    (params) => <TextField
                      {...params}
                      label="Categoria"
                      sx={{
                        input: {
                          '&.Mui-focused': {
                            color: '#590BD8'
                          },
                          color: '#aaa',
                        },
                        label: {
                          '&.Mui-focused': {
                            color: '#590BD8'
                          },
                          color: '#aaa',
                        },
                        select: {
                          '&.Mui-focused': {
                            color: '#590BD8'
                          },
                          color: '#aaa',
                        },
                        svg: {
                          '&.Mui-focused': {
                            color: '#590BD8'
                          },
                          color: '#aaa',
                        },
                      }}
                    />
                  }
                  value={skillCategorie}
                  fullWidth
                  onChange={(event: any, newValue: SkillCategorie | null) => setSkillCategorie(newValue)}
                />

                <Autocomplete
                  options={cboOptions}
                  renderInput={
                    (params) => <TextField
                      {...params}
                      label="Ocupação"
                      sx={{
                        input: {
                          '&.Mui-focused': {
                            color: '#590BD8'
                          },
                          color: '#aaa',
                        },
                        label: {
                          '&.Mui-focused': {
                            color: '#590BD8'
                          },
                          color: '#aaa',
                        },
                        select: {
                          '&.Mui-focused': {
                            color: '#590BD8'
                          },
                          color: '#aaa',
                        },
                        svg: {
                          '&.Mui-focused': {
                            color: '#590BD8'
                          },
                          color: '#aaa',
                        },
                      }}
                    />
                  }
                  value={skill}
                  fullWidth
                  onChange={(event: any, newValue: Skill | null) => setSkill(newValue)}
                />

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
                      defaultValue={observacao}
                      fullWidth

                      multiline
                      rows={4}
                      maxRows={8}>
                    </TextField>
                  </div>
                </Box>
              </Box>

        <div className='flex justify-end mt-2'>
          <Button variant="primary" onClick={() => handleSubmit(onSubmit)()}>
            Salvar
          </Button>
        </div>
    </ThemeProvider>
  );
};

export default AccountProfileDetails;