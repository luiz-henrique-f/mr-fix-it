"use client"

import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material';
import { LiaTimesSolid } from "react-icons/lia";
import Button from '@mui/material/Button';
import { BsCheck2Square } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import * as React from 'react';
import InputUfCity from './InputUfCity';
import { prisma } from '@/lib/prisma';

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

// async function getcategories() {
//     const categories = await prisma.tipo_Categoria.findMany({});
    
//     return categories;
//   }

const CreateProfessional = () => {
    const [ufs, setUfs] = React.useState<IBGEUFResponse[]>([]);
    const [categories, setCategories] = React.useState<categorieResponse[]>([]);
    const [cities, setCities] = React.useState<IBGECITYResponse[]>([]);
    const [selectedUf, setSelectedUf] = React.useState("0");
    const [selectedCity, setSelectedCity] = React.useState("0");
    const [selectedCategorie, setSelectedCategorie] = React.useState("0");

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

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    // const fetchCategories = async () => {
    //   const categories = await fetch('/categoria');
  
    //   const json = await categories.json();

    //   setCategories(json);
    // };

return (
  <div>
    <Button 
      disableElevation
      disableRipple
      style={{ all: "initial" }}
      onClick={handleClickOpen}>

      <span className="underline text-sm text-gray-400 mx-0 my-1 cursor-pointer hover:text-primary">
        Cadastre-se
      </span>

    </Button>

    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullScreen={fullScreen} 
      className='backdrop-blur-sm'>

      <div className='dark:bg-darkBGLighter border border-solid border-gray-500'>
        <div className='flex justify-between'>

          <DialogTitle className='text-primaryDarker flex gap-1 dark:text-white'>
            <AiOutlineUser className='mt-[2%]'/>
            Cadastro de Informações
          </DialogTitle>

          <Button 
            className='bg-white dark:bg-darkBGLighter'
            title='Fechar' 
            onClick={handleClose}>

            <button
              className="flex items-center justify-center py-1 px-1 text-lg bg-primary font-semibold border-[0.125rem] border-solid border-primary rounded-lg text-white hover:border-transparent hover:bg-primaryDarker transition-all duration-[0.2s] ease-[ease-in-out] hover:transition-all hover:duration-[0.2s] hover:ease-[ease-in-out]">
              <LiaTimesSolid className='text-white'/>
            </button>
          </Button>

        </div>

        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1},
            }}
            noValidate
            autoComplete="off">


            <div className='flex justify-between gap-2'>
              <TextField
                id="name"
                label="Nome completo"
                fullWidth>
              </TextField>

            </div>

            <div className='flex justify-between gap-2'>
              <TextField
                id="cpf"
                label="CPF/CNPJ"
                fullWidth>
              </TextField>
            </div>

            <div className='flex justify-between gap-2'>
              <TextField
                id="tel"
                type="tel"
                label="Telefone"
                fullWidth>
              </TextField>
              
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
            </div>
            
            <div className='border border-solid border-gray-400/80 text-gray-500 rounded-md p-2 m-2'>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group">
                    
                  <FormControlLabel value="male" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="female" control={<Radio />} label="Feminino" />
                  <FormControlLabel value="other" control={<Radio />} label="Não especificar" />

                </RadioGroup>
              </FormControl>
            </div>
              
              
            <div className='flex justify-between gap-2'>
              <TextField
                id="uf"
                select
                label="UF"
                name='uf'
                fullWidth
                // value={selectedUf}
                // defaultValue=""
                onChange={handleSelectedUf}>

                {ufs.map(uf => (
                  <MenuItem key={uf.id} value={uf.sigla}>
                  {uf.nome}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="city"
                select
                label="Cidade"
                // value={selectedCity}
                // defaultValue=""
                fullWidth
                onChange={handleSelectedCity}>

                {cities.map(city => (
                  <MenuItem key={city.id} value={city.nome}>
                  {city.nome}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className='w-full relative'>
              <div className='text-gray-400 text-center mt-4 block'>
                  <span>
                    <span className='inline-block w-full h-[1px] bg-gray-400 align-middle'></span>
                  </span>
                  
                  <span className='absolute left-0 top-0 w-full'>
                    <span className='px-4 py-0 bg-white'>ou</span>
                  </span>
              </div>
              
              <div className="flex justify-center items-center my-5 mx-0 text-primaryDarker dark:text-walterWhite">
                <button
                  className="flex justify-center items-center rounded-2xl my-0 mx-3 gap-2 border border-gray-200 bg-gray-200/70 p-4 hover:bg-gray-300 transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]">
                  {/* onClick={onSubmit}> */}
                  <FcGoogle className="text-2xl" /> Cadastre-se usando sua conta google
                </button>
              </div>
            </div>


            {/* <div className='flex flex-col mr-4 gap-1'>
              <TextField
                id="outlined-select-currency"
                label="E-mail"
                fullWidth>
              </TextField>

              <TextField
                id="outlined-select-currency"
                label="Senha"
                type='password'
                fullWidth>
              </TextField>
            </div> */}
            
          </Box>
        </DialogContent>

        <DialogActions className='!flex !justify-between'>
          <Button 
            onClick={handleClose}
            className='bg-white dark:bg-darkBGLighter'>

            <button
              className="flex items-center justify-center gap-1 py-1 px-3 text-sm hover:bg-primary font-semibold border-[0.125rem] border-solid border-gray-500 rounded-md text-gray-500 hover:border-transparent transition-all duration-[0.2s] ease-[ease-in-out] hover:transition-all hover:duration-[0.2s] hover:ease-[ease-in-out] hover:text-white">
              <LiaTimesSolid/>
              Cancelar
            </button>
          </Button>

          <Button onClick={handleClose}>
            <button
              className="flex items-center justify-center gap-1 py-1 px-3 text-sm bg-primary font-semibold border-[0.125rem] border-solid border-primary rounded-md text-white hover:border-transparent hover:bg-primaryDarker transition-all duration-[0.2s] ease-[ease-in-out] hover:transition-all hover:duration-[0.2s] hover:ease-[ease-in-out]">
              <BsCheck2Square className='text-white'/>
              Finalizar Cadastro
            </button>
          </Button>

        </DialogActions>

      </div>

    </Dialog>
      
  </div>
)

};

export default CreateProfessional