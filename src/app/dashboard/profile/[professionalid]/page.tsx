import * as React from 'react';
import { Box, Container, Stack, Unstable_Grid2 as Grid } from '@mui/material';
import Script from "next/script";

import SideMenu from '../../[professionalid]/components/SideMenu';
import AccountProfile from './components/AccountProfile';
import AccountProfileDetails from './components/AccountProfileDetails';
import { prisma } from '@/lib/prisma';

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

const Profile = async ({ params }: { params: { professionalid: string } }) => {
  const professional = await getProfessionalDetails(params.professionalid);
  const photo = await getPhotoProfessional(params.professionalid);

  return (
    <>
        
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-FWQ879X8DX`}
      />

      <Script id="gtm-script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FWQ879X8DX', {
          page_path: window.location.pathname,
          });
        `}
      </Script>

      <h1 className='text-6xl uppercase tracking-[10px] text-gray-500/40 dark:text-gray-400/80 font-bold'>Dashboard</h1>
        <div className='flex flex-row gap-12'>
          <SideMenu id_prestador={professional?.id as any}/>

          <div className='flex flex-col gap-8 m-4 w-full mr-[5%]'>
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
                        url_foto={photo?.url_foto as any} />
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
    </>
  );

};

export default Profile;