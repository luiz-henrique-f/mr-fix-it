import * as React from 'react';
import { Box, Container, Stack, Unstable_Grid2 as Grid } from '@mui/material';
import Script from "next/script";

import SideMenu from '../components/SideMenu';
import AccountProfile from './components/AccountProfile';
import AccountProfileDetails from './components/AccountProfileDetails';

const Profile = () => {
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
          <SideMenu />

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
                        <AccountProfile name='Luiz Madrid' city='Araçatuba' telefone='(18) 98173-9656' uf='SP' />
                      </Grid>

                      <Grid
                        xs={12}
                        md={6}
                        lg={8}
                      >
                        <AccountProfileDetails name='Luiz Madrid' city='Araçatuba' uf='SP' telefone='(18) 98173-9656' email='luizmadrid.dev@gmail.com' />
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