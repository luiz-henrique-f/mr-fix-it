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

import { Box, Card, CardContent, CardHeader, TextField, Unstable_Grid2 as Grid, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

interface ProfessionalInfoProps {
  name: string;
  city: string;
  uf: string;
  telefone: string;
  cpf_cnpj: string;
  observacao: string;
  sexo: string;
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

const AccountProfileDetails = ({ name, city, uf, telefone, cpf_cnpj, categoria, sexo, observacao }: ProfessionalInfoProps) => {


  const [ufs, setUfs] = React.useState<IBGEUFResponse[]>([]);
  const [categories, setCategories] = React.useState<categorieResponse[]>([]);
  const [cities, setCities] = React.useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = React.useState(uf);
  const [selectedCity, setSelectedCity] = React.useState(city);
  const [selectedCategorie, setSelectedCategorie] = React.useState(categoria);
  const [selectedValueCheckbox, setSelectedValueCheckbox] = React.useState(sexo);

  // const changeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValueCheckbox(event.target.value);
  // };

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

  const onSubmit = async (data: CreateProfessionalForm) => {
    console.log(data)
    const response = await fetch("http://localhost:3000/updateProfessionalAll", {
      method: "PUT",
      body: Buffer.from(
        JSON.stringify({
          nome: data.nome,
          cpf_cnpj: data.cpf_cnpj,
          celular: data.celular,
          categoria: data.categoria,
          sexo: data.sexo,
          uf: data.uf,
          cidade: data.cidade.substring(0, 7),
          desc_cidade: data.cidade.substring(8),
          observacao: data.observacao,
          id_user: (dados?.user as any)?.id
        })
      ),
    });

    const res = await response.json();

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

  const [valueCelular, setValueCelular] = React.useState(telefone);
  const mudarMascaraCelular = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueCelular(mask(unMask(event.target.value), ['(99) 99999-9999']))
  }

  const [value, setValue] = React.useState(cpf_cnpj);
  const mudarMascara = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(mask(unMask(event.target.value), ['999.999.999-99', '99.99.999/9999-99']))
  }

  return (
    <ThemeProvider theme={theme}>

    
      <form
        autoComplete="off"
        noValidate
        // onSubmit={handleSubmit}
        className='bg-white dark:bg-darkBGLighter text-black dark:text-white rounded-lg p-4'
      >
        <Card className='shadow-none bg-white dark:bg-darkBGLighter'>
          <div className='p-4 flex flex-col justify-center items-start gap-1'>
            <h1 className='text-2xl font-semibold text-black dark:text-white'>Seu perfil</h1>
            <p className='text-lg text-gray-400 dark:text-gray-500'>Mantenha suas informações atualizadas!</p>
          </div>
          
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid
                container
                spacing={3}
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
              >
                <Grid
                  xs={12}
                >

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
                  defaultValue={name}
                >
                </TextField>

                </Grid>

                <Grid
                  xs={12}
                  md={4}
                >
                  {/* <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    required
                    // onChange={handleChange}
                    value={email}
                  /> */}



                  <TextField
                    {...register("cpf_cnpj")}
                    id="cpf"
                    label="CPF/CNPJ"
                    onChange={mudarMascara}
                    defaultValue={cpf_cnpj}
                    fullWidth
                  >
                  </TextField>

                </Grid>




                <Grid
                  xs={12}
                  md={4}
                >


                  <TextField
                    {...register("categoria")}
                    id="categorie"
                    select
                    label="Categoria"
                    value={selectedCategorie}
                    // defaultValue=""
                    fullWidth
                    onChange={handleSelectedCategorie}>
                    {categories.map(categorie => (
                      <MenuItem key={categorie.id} value={categorie.descricao_categoria}>
                        {categorie.descricao_categoria}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid
                  xs={12}
                  md={4}
                >
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
                >

                </TextField>
                </Grid>

                <Grid
                  xs={12}
                  md={3}
                >
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
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >

                  <TextField
                    {...register("cidade")}
                    id="city"
                    select
                    label="Cidade"
                    fullWidth
                    defaultValue={city}
                    onChange={handleSelectedCity}>
                    {cities.map(city => (
                      <MenuItem key={city.id} value={city.id+city.nome}>
                        {city.nome}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>


                <Grid
                  xs={12}
                  md={3}
                >
                  <TextField
                    {...register("sexo")}
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
                </Grid>

                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    {...register("observacao")}
                    label="Sobre você"
                    fullWidth
                    multiline
                    rows={4}
                    maxRows={8}
                    defaultValue={observacao}>
                  </TextField>
                </Grid>

              </Grid>
            </Box>
          </CardContent>
        </Card>

        <div className='flex justify-end mt-2'>
          <Button variant="primary" onClick={() => handleSubmit(onSubmit)()}>
            Salvar
          </Button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default AccountProfileDetails;