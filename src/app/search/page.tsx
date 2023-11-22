"use client"

import React from 'react';
import axios from 'axios';

import { MenuItem, TextField } from '@mui/material';

import SearchButton from '@/components/SearchButton';
import ProfileCard from './components/ProfileCard';

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

type UfNowResponse = {
  uf_now: string;
};

type CityNowResponse = {
  city_now: string;
};

const SearchPage = () => {

  const [ufNow, setUfNow] = React.useState<UfNowResponse[]>([]);
  const [cityNow, setCityNow] = React.useState<CityNowResponse[]>([]);

  const navigatorGeoLocation = () => {
    const success = (position: any) => {
      console.log(position)
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-br`

      fetch(geoApiUrl).then(res => res.json()).then(data => {
        console.log(data)
        setSelectedUf(data.principalSubdivision);
        setUfNow(data.principalSubdivision)
        setCityNow(data.city)
      });
    };

    const error = () => {
      console.log('No permission');
    };

    navigator.geolocation.getCurrentPosition(success as any, error as any)
  };

  React.useEffect(() => {
    navigatorGeoLocation();
  });

  const [ufs, setUfs] = React.useState<IBGEUFResponse[]>([]);
  const [categories, setCategories] = React.useState<categorieResponse[]>([]);
  const [cities, setCities] = React.useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = React.useState("São Paulo");
  const [selectedCity, setSelectedCity] = React.useState(cityNow as any);
  const [selectedCategorie, setSelectedCategorie] = React.useState("Construção");

  React.useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then((response) => {
        setUfs(response.data)
    });
  }, []);

  React.useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then((response) => {
        setCities(response.data)
    });
  }, [selectedUf]);

  React.useEffect(() => {
    axios.get('/categoria')
      .then((response) => {
        setCategories(response.data)
    });
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
  
  return (
    <>
      <div className='mx-[5%]'>
        <div className="flex justify-evenly items-center mt-4 gap-4">
          {/* <TextField
            id="categorie"
            label="Categoria"
            defaultValue={cityNow}
            fullWidth>
          </TextField> */}

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

          <TextField
            id="uf"
            select
            label="UF"
            name='uf'
            fullWidth
            defaultValue={ufNow}
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
            fullWidth
            onChange={handleSelectedCity}>

            {cities.map(city => (
                <MenuItem key={city.id} value={city.nome}>
                    {city.nome}
                </MenuItem>
            ))}
          </TextField>

          <SearchButton className='p-3' />
        </div>

        <div className='mx-auto grid grid-cols-4 my-8 gap-8'>
          <ProfileCard name='Luiz Madrid' city='Araçatuba' uf='SP' urlFoto='' category='Outros' profession='Gamer' />
          <ProfileCard name='Luiz Madrid' city='Araçatuba' uf='SP' urlFoto='' category='Outros' profession='Gamer' />
          <ProfileCard name='Luiz Madrid' city='Araçatuba' uf='SP' urlFoto='' category='Outros' profession='Gamer' />
          <ProfileCard name='Luiz Madrid' city='Araçatuba' uf='SP' urlFoto='' category='Outros' profession='Gamer' />
          <ProfileCard name='Luiz Madrid' city='Araçatuba' uf='SP' urlFoto='' category='Outros' profession='Gamer' />
          <ProfileCard name='Luiz Madrid' city='Araçatuba' uf='SP' urlFoto='' category='Outros' profession='Gamer' />
        </div>
      </div>
    </>
  );
};

export default SearchPage;