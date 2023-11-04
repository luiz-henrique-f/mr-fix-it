"use client"

import * as React from 'react';
import Rating from '@mui/material/Rating';
import { StyledEngineProvider } from '@mui/material/styles';

import { AiFillStar } from 'react-icons/ai'

const BasicRating = () => {
  const [value, setValue] = React.useState<number | null>(0);

  return (
    <StyledEngineProvider injectFirst>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}

        icon={
          <AiFillStar 
            className='text-orange-400'
          />
        }
        emptyIcon={
          <AiFillStar 
            className='text-grayLighter opacity-60 dark:opacity-30'
          />
        }
      />
    </StyledEngineProvider>
  );
}

export default BasicRating