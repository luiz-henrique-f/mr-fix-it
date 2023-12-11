import * as React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

import Button from '@/components/Button';
import SettingsPass from './components/SettingsPass';
import AccountDeleter from './components/AccountDeleter';
import SideMenu from '../../[professionalid]/components/SideMenu';
import TopDetails from '../../[professionalid]/components/TopDetails';
import MenuSpacer from '../../[professionalid]/components/MenuSpacer';


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

const getPlanDetails = async (data_fim: string) => {
  const planoAtivo = await prisma.prestador_Ativo.findFirst({
    where: {
      data_fim: data_fim,
    },
  }).finally(() => {
    prisma.$disconnect();
  });

  return planoAtivo;
}

const Settings = async ({ params }: { params: { professionalid: string, data_fim: string } }) => {

  const professional = await getProfessionalDetails(params.professionalid);
  const planoAtivo = await getPlanDetails(params.data_fim);

  return (
    <>
      <div className='absolute top-0 left-0 h-screen w-screen bg-gradient-to-b from-primaryDarker from-35% to-35% to-whiteBG dark:to-darkBG overflow-hidden'>
        <div className='flex h-full gap-4 mr-6'>
          <SideMenu id_prestador={professional?.id as any} />

          <div className='flex flex-col w-full gap-4 overflow-y-scroll'>
            <div className='flex justify-end items-center mb-4'>
              <TopDetails url_foto={professional?.url_foto as any} />
            </div>

            <div className='flex justify-center items-center'>
              <div className='bg-white dark:bg-darkBGLighter rounded-lg w-full 1sm:w-[90vw] 2md:h-[85vh]'>

                <div className='flex flex-col justify-center items-center gap-6 h-2/5 py-8 2md:py-0 scale-75 1sm:scale-100'>
                  
                  <h2 className='text-2xl md:text-4xl text-center text-black dark:text-white font-bold uppercase'>Quer mudar o plano?</h2>
                  <p className='text-lg md:text-xl text-center text-grayPrimary dark:text-grayLighter'>Cansou de faturas mensais ou escolheu um plano muito longo?</p>

                  <div className='flex justify-center items-center text-center gap-1'>
                    <span className='text-xs sm:text-base text-grayPrimary dark:text-grayLighter'>Seu plano termina em,</span>
                    <span className='text-xs sm:text-base text-black font-mono font-bold dark:text-white'>{planoAtivo?.data_fim}</span>
                    <span className='text-xs sm:text-base text-grayPrimary dark:text-grayLighter'>!</span>
                  </div>
                  
                  <Link href="/pagamentoPlano">
                    <Button variant='primary' className='text-center'>
                      Mude agora!
                    </Button>
                  </Link>

                </div>

                <div className='mx-[10%] 2md:scale-75 1sm:scale-100'>
                  <MenuSpacer />
                </div>

                <div className='flex flex-col 2md:flex-row justify-evenly items-center h-full 2md:h-3/5 py-8 2md:py-0 gap-11 2md:gap-0 scale-75 1sm:scale-100'>
                  <SettingsPass />

                  <AccountDeleter />
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    </>
  );

};

export default Settings;

function useState(arg0: number): [any, any] {
  throw new Error('Function not implemented.');
}
