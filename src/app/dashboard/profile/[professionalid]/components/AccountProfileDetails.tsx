"use client"

import * as React from 'react'
import { Box, Card, CardContent, CardHeader, TextField, Unstable_Grid2 as Grid, MenuItem } from '@mui/material';
import Button from '@/components/Button';
import { mask, unMask } from 'remask'
import { IMaskInput } from 'react-imask';
import axios from 'axios';

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

  const [value, setValue] = React.useState(cpf_cnpj);
  const mudarMascara = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(mask(unMask(event.target.value), ['999.999.999-99', '99.99.999/9999-99']))
  }

  return (
    <form
      autoComplete="off"
      noValidate
      // onSubmit={handleSubmit}
      className='shadow-2xl dark:shadow-whiteBG/10 bg-white dark:bg-darkBGLighter text-black dark:text-white rounded-lg p-4'
    >
      <Card className='shadow-none'>
        <CardHeader
          title="Seu perfil"
          subheader="Mantenha suas informações atualizadas!"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Nome completo"
                  name="name"
                  required
                  // onChange={handleChange}
                  value={name}
                />

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
                  id="cpf"
                  label="CPF/CNPJ"
                  onChange={mudarMascara}
                  value={value}
                  fullWidth>
                </TextField>

              </Grid>




              <Grid
                xs={12}
                md={4}
              >
                

          <TextField
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
                  fullWidth
                  label="Número de telefone"
                  name="phone"
                  // onChange={handleChange}
                  value={telefone}
                />
              </Grid>

              <Grid
                xs={12}
                md={3}
              >
                <TextField
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
                  id="city"
                  select
                  label="Cidade"
                  fullWidth
                  defaultValue={city}
                  onChange={handleSelectedCity}>
                  {cities.map(city => (
                    <MenuItem key={city.id} value={city.nome}>
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
                  label="Sobre você"
                  fullWidth
                  multiline
                  rows={4}
                  maxRows={8}
                  value={observacao}>
                </TextField>
              </Grid>

            </Grid>
          </Box>
        </CardContent>
      </Card>

      <div className='flex justify-end mt-2'>
        <Button variant="primary">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default AccountProfileDetails;