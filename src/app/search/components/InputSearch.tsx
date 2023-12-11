'use client'

import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

import SearchButton from "@/components/SearchButton";

import { Autocomplete, MenuItem, TextField } from "@mui/material";
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
  id: string;
  nome: string;
};

type NomeResponse = {
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

const InputSearch = () => {



  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [categories, setCategories] = useState<categorieResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [cbos, setCbos] = useState<cboResponse[]>([]);
  const [nome, setNomes] = useState<NomeResponse[]>([]);
  const [selectedNome, setSelectedNome] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCbo, setSelectedCbo] = useState("");
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");

  const [skill, setSkill] = useState<Skill | null>(null)
  const [skillCategorie, setSkillCategorie] = useState<SkillCategorie | null>(null)
  const [skillCity, setSkillCity] = useState<SkillCity | null>(null)

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

  useEffect(() => {
    axios.get('/api/cbo')
      .then((response) => {
        setCbos(response.data)
      })
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

  const handleSelectedCbo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const cbo = e.target.value;
    setSelectedCbo(cbo);
  };

  const handleSelectedNome = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const nome = e.target.value;
    setSelectedNome(nome);
  };

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

      <div className="flex flex-col 2md:flex-row justify-evenly items-center gap-4 bg-white dark:bg-darkBGLighter p-4 mt-4 rounded-xl">

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
        {/* <TextField
          id="categorie"
          label="Categoria"
          select
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
        </TextField> */}

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

        {/* <TextField
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
        </TextField> */}

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

        <Link href={`/searchParams/${skillCategorie?.id != '' ? skillCategorie?.id : 'undefined'}/${selectedUf != '' ? selectedUf : 'undefined'}/${skillCity?.id != '' ? skillCity?.id : 'undefined'}/${selectedNome != '' ? selectedNome.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a').replace(new RegExp('[ÉÈÊ]','gi'), 'e').replace(new RegExp('[ÍÌÎ]','gi'), 'i').replace(new RegExp('[ÓÒÔÕ]','gi'), 'o').replace(new RegExp('[ÚÙÛ]','gi'), 'u').replace(new RegExp('[Ç]','gi'), 'c') : 'undefined'}/${skill?.id != '' ? skill?.id : 'undefined'}`}>
          <SearchButton className='p-3' />
        </Link>
      </div>
    </ThemeProvider>
  );
}

export default InputSearch;