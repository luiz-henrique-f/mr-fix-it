// "use client"

import React from 'react';
import axios from 'axios';

import { MenuItem, TextField } from '@mui/material';

import Profiles from '../components/Profiles';
import InputSearch from './components/InputSearch';

type UfNowResponse = {
  uf_now: string;
};

type CityNowResponse = {
  city_now: string;
};

const SearchPage = async () => {

  // const [ufNow, setUfNow] = useState<UfNowResponse[]>([]);
  // const [cityNow, setCityNow] = useState<CityNowResponse[]>([]);
  
  // useEffect(() => {
  //   navigatorGeoLocation();
  // });


  const navigatorGeoLocation = () => {
    const success = (position: any) => {
      console.log(position)
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt-br`

      fetch(geoApiUrl).then(res => res.json()).then(data => {
        console.log(data)
        // setSelectedUf(data.principalSubdivision);
        // setUfNow(data.principalSubdivision)
        // setCityNow(data.city)
      });
    };

    const error = () => {
      console.log('No permission');
    };

    navigator.geolocation.getCurrentPosition(success as any, error as any)
  };


  


  return (
    <>
      <div className='mx-[5%]'>
        <InputSearch />

        <Profiles />

      </div>
    </>
  );
};

export default SearchPage;