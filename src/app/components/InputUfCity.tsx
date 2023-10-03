"use client"

import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import * as React from 'react';

type IBGEUFResponse = {
  id: number;
  sigla: string;
  nome: string;
};

type IBGECITYResponse = {
  id: number;
  nome: string;
};

const InputUfCity = () => {
    const [ufs, setUfs] = React.useState<IBGEUFResponse[]>([]);
    const [cities, setCities] = React.useState<IBGECITYResponse[]>([]);
    const [selectedUf, setSelectedUf] = React.useState("0");
    const [selectedCity, setSelectedCity] = React.useState("0");

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

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

return (
    <div>
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
)

};

export default InputUfCity