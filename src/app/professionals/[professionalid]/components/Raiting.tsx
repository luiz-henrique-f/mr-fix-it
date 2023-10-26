"use client"

import * as React from 'react';
import Rating from '@mui/material/Rating';

const BasicRating = () => {
  const [value, setValue] = React.useState<number | null>(0);

  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
}

export default BasicRating