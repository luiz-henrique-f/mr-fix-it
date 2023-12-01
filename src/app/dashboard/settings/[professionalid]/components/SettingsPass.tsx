"use client"

import React from 'react';
import { useCallback, useState } from 'react';

import { Card, CardActions, CardContent, Stack, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Button from '@/components/Button';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#aaa"
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#aaa"
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9055dd"
          },
          "& .MuiOutlinedInput-input": {
            color: "#aaa"
          },
        }
      }
    }
  }
});

const SettingsPass = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Card className='shadow-none bg-transparent'>

          <div className='p-4 flex flex-col justify-center items-start gap-1'>
            <h1 className='text-2xl font-semibold text-black dark:text-white'>Senha</h1>
            <p className='text-lg text-gray-400 dark:text-gray-500'>Deixe sua senha sempre atualizada!</p>
          </div>

          <CardContent
            sx={{
              input: {
                '&.Mui-focused': {
                  color: '#9055dd'
                },
                color: '#aaa',
              },
              label: {
                '&.Mui-focused': {
                  color: '#9055dd'
                },
                color: '#aaa',
              },
              select: {
                '&.Mui-focused': {
                  color: '#9055dd'
                },
                color: '#aaa',
              },
              svg: {
                '&.Mui-focused': {
                  color: '#9055dd'
                },
                color: '#aaa',
              },
            }}
          >
            <Stack
              spacing={3}
              sx={{ width: 400 }}
            >
              <TextField
                fullWidth
                label="Senha"
                type="password"
              />
              <TextField
                fullWidth
                label="Confirme a senha"
                type="password"
              />
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="primary">
              Atualizar
            </Button>

          </CardActions>
        </Card>
      </ThemeProvider>
    </>
  );
};

export default SettingsPass;