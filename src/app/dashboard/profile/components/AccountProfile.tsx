import React from 'react';
import { Avatar, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import Button from '@/components/Button';

interface ProfessionalInfoProps {
  name: string;
  city: string;
  uf: string;
  telefone: string;
};

const AccountProfile = ({name, city, uf, telefone}: ProfessionalInfoProps) => {
  return (
  <Card className='shadow-2xl dark:shadow-whiteBG/10 bg-white dark:bg-darkBGLighter text-black dark:text-white rounded-lg p-4'>
    <CardContent>

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src="/perfil.png"
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5">
          {name}
        </Typography>

        <Typography
          variant="body2">
          {city}, {uf}
        </Typography>
        
        <Typography
          variant="body2">
          {telefone}
        </Typography>
      </Box>

    </CardContent>

    <Divider />
    
    <Button variant="primary" className='w-full mt-4 py-3'>
      Atualizar foto
    </Button>
    
  </Card>
  );
};

export default AccountProfile;