"use client"

import SearchButton from '@/components/SearchButton'
import Input from '@/components/Input'
import React from 'react'
import { MenuItem, TextField } from '@mui/material'
import axios from 'axios'

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

const SearchSection = () => {
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
            })
        }

        const error = () => {
            console.log('No permission');
        }

        navigator.geolocation.getCurrentPosition(success as any, error as any)
    };

    React.useEffect(() => {
        navigatorGeoLocation();
    })

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

    return (
        <div className="container flex justify-center items-center flex-col mx-auto p-5 h-[calc(100vh-85px)] bg-none 2sm:bg-search-background 2sm:dark:bg-search-background-dark bg-contain bg-center bg-no-repeat bg-transparent">
            <div className='-mt-[10%] w-full'>
                <h1 className='font-semibold text-3xl 2sm:text-4xl text-gray-800 dark:text-gray-300 text-center p-3'>A maneira mais fácil de encontrar um profissional <span className='text-primary'>capacitado</span>!</h1>
                <p className='text-gray-600 dark:text-gray-400 text-sm 2sm:text-xl text-center p-3 mb-6'>Conheça de forma gratuita os profissionais melhor avaliados!</p>

                <div className="flex flex-col 2md:flex-row gap-5">

                    

                <TextField
                        id="categorie"
                        label="Categoria"
                        defaultValue={cityNow}
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
            </div>
        </div>
    )
}

export default SearchSection