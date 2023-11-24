'use client'

import SearchButton from "@/components/SearchButton";
import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

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

const InputSearch = () => {



  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [categories, setCategories] = useState<categorieResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
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

  return (
    <div className="flex justify-evenly items-center mt-4 gap-4">
      <TextField
        id="categorie"
        select
        label="Categoria"
        value={selectedCategorie}
        fullWidth
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
      onChange={handleSelectedCity}
      >
        
            {cities.map(city => (
                <MenuItem key={city.id} value={city.nome}>
                    {city.nome}
                </MenuItem>
            ))}
      </TextField>

      <SearchButton className='p-3' />
    </div>
  );
}

export default InputSearch;