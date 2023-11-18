import React from 'react'
import { Box, Card, CardContent, CardHeader, TextField, Unstable_Grid2 as Grid } from '@mui/material';
import Button from '@/components/Button';

interface ProfessionalInfoProps {
  name: string;
  city: string;
  uf: string;
  telefone: string;
  email: string;
};

const AccountProfileDetails = ({name, city, uf, telefone, email}: ProfessionalInfoProps) => {
  return (
    <form
      autoComplete="off"
      noValidate
      // onSubmit={handleSubmit}
      className='shadow-2xl dark:shadow-whiteBG/10 bg-white dark:bg-darkBGLighter text-black dark:text-white rounded-lg p-4'
    >
      <Card className='shadow-none'>
        <CardHeader
          title="Seu perfil"
          subheader="Mantenha suas informações atualizadas!"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Digite seu nome completo"
                  name="name"
                  required
                  // onChange={handleChange}
                  value={name}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  required
                  // onChange={handleChange}
                  value={email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Digite seu número de telefone"
                  name="phone"
                  type="number"
                  // onChange={handleChange}
                  value={telefone}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Cidade"
                  name="city"
                  required
                  // onChange={handleChange}
                  value={city}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Selecione o estado"
                  name="state"
                  required
                  select
                  // onChange={handleChange}
                  value={uf}
                >
                  {/* {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))} */}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <div className='flex justify-end'>
        <Button variant="primary">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default AccountProfileDetails;