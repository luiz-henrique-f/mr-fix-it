import * as React from 'react';
import { prisma } from '@/lib/prisma';

import { Box, Container, Stack, Unstable_Grid2 as Grid } from '@mui/material';

import SideMenu from '../../[professionalid]/components/SideMenu';
import AccountProfile from './components/AccountProfile';
import AccountProfileDetails from './components/AccountProfileDetails';
import TopDetails from '../../[professionalid]/components/TopDetails';
import { Prestador } from '@prisma/client';

const getProfessionalDetails = async (professionalid: string) => {
  const professional = await prisma.prestador.findFirst({
      where: {
          id: professionalid,
      },
  }).finally(() => {
      prisma.$disconnect();
    });

  return professional;
}

const getPhotoProfessional = async (professionalid: string) => {
  const photo = await prisma.foto_Prestador.findFirst({
      where: {
          id_prestador: professionalid,
      },
  }).finally(() => {
      prisma.$disconnect();
    });

  return photo;
}

interface ProfileInfoProps {
  prestador: Prestador 
};

const Profile = async ({ params }: { params: { professionalid: string, prestador: Prestador } }) => {
  const professional = await getProfessionalDetails(params.professionalid);
  const photo = await getPhotoProfessional(params.professionalid);

  if (!professional) return null;

  return (
    <>
      <div className='absolute top-0 left-0 h-screen w-screen bg-gradient-to-b from-primaryDarker from-35% to-35% to-whiteBG dark:to-darkBG overflow-hidden'>

        <div className='flex gap-4 m-6'>
          <SideMenu id_prestador={professional?.id as any}/>

          
          <div className='flex flex-col w-full gap-4'>
            <div className='flex justify-end items-center mb-4'>
              {/* <TopDetails prestador={params.prestador} key={params.prestador.id} /> */}
            </div>
          
            <div className='flex flex-col justify-start items-center gap-8'>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  py: 8
                }}
              >
                <Container maxWidth="lg">
                  <Stack spacing={3}>
                    <div>
                      <Grid
                        container
                        spacing={3}>

                        <Grid
                          xs={12}
                          md={6}
                          lg={4}
                        >
                          <AccountProfile 
                            name={professional?.nome as any} 
                            city={professional?.cidade as any}
                            telefone={professional?.celular as any} 
                            uf={professional?.uf as any}
                            id_prestador={professional?.id as any}
                            url_foto={photo?.url_foto as any} 
                          />
                        </Grid>

                        <Grid
                          xs={12}
                          md={6}
                          lg={8}
                        >
                          <AccountProfileDetails 
                            name={professional?.nome as any} 
                            city={professional?.cidade as any} 
                            uf={professional?.uf as any}
                            telefone={professional?.celular as any}
                            cpf_cnpj={professional?.cpf_cnpj as any} 
                            observacao={professional?.observacao as any} 
                            sexo={professional?.sexo as any}
                            categoria={professional?.tipo_categoria as any}
                          />
                        </Grid>

                      </Grid>

                    </div>
                    
                  </Stack>
                </Container>
              </Box>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );

};

export default Profile;