"use client"

import * as React from 'react';
import Rating from '@mui/material/Rating';
import { StyledEngineProvider } from '@mui/material/styles';

import { AiFillStar } from 'react-icons/ai'

interface ProfessionalCommentProps {
  valueComment: number;
}

const BasicRating = ({ valueComment }: ProfessionalCommentProps) => {

  return (
    <StyledEngineProvider injectFirst>
      <Rating
        name="simple-controlled"
        value={valueComment}
        readOnly

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