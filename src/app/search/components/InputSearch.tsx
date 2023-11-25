'use client'

import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

import SearchButton from "@/components/SearchButton";

import { MenuItem, TextField } from "@mui/material";
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

type NomeResponse = {
  nome: string;
};

type categorieResponse = {
  id: string;
  descricao_categoria: string;
};

const InputSearch = () => {



  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [categories, setCategories] = useState<categorieResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [nome, setNomes] = useState<NomeResponse[]>([]);
  const [selectedNome, setSelectedNome] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then((response) => {
        setUfs(response.data)
      });
  }, []);

  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then((response) => {
        setCities(response.data)
      });
  }, [selectedUf]);

  useEffect(() => {
    axios.get('/api/categoria')
      .then((response) => {
        setCategories(response.data)
      });
  }, []);

  const handleSelectedUf = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const uf = e.target.value;
    setSelectedUf(uf);
  };

  const handleSelectedCity = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  const handleSelectedCategorie = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const categorie = e.target.value;
    setSelectedCategorie(categorie);
  };

  const handleSelectedNome = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const nome = e.target.value;
    setSelectedNome(nome);
  };

  return (
    <ThemeProvider theme={theme}>
    
      <div className="flex justify-evenly items-center mt-4 gap-4">
        <TextField
          id="categorie"
          select
          label="Categoria"
          value={selectedCategorie}
          fullWidth
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
          onChange={handleSelectedCategorie}
        >
          {categories.map(categorie => (
            <MenuItem key={categorie.id} value={categorie.descricao_categoria}>
              {categorie.descricao_categoria}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="uf"
          select
          label="UF"
          name='uf'
          fullWidth
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
          onChange={handleSelectedUf}
        >
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
          fullWidth
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
          onChange={handleSelectedCity}
        >

          {cities.map(city => (
            <MenuItem key={city.id} value={city.id}>
              {city.nome}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="name"
          label="Pesquisar por nome"
          value={selectedNome}
          fullWidth
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
          onChange={handleSelectedNome} />

        <Link href={`/searchParams/${selectedCategorie != '' ? selectedCategorie : 'undefined'}/${selectedUf != '' ? selectedUf : 'undefined'}/${selectedCity != '' ? selectedCity : 'undefined'}/${selectedNome != '' ? selectedNome : 'undefined'}`}>
          <SearchButton className='p-3' />
        </Link>
      </div>
    </ThemeProvider>
  );
}

export default InputSearch;