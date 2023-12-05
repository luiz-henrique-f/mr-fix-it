import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { Prestador } from '@prisma/client';

import Button from '@/components/Button';
import SettingsPass from './components/SettingsPass';
import AccountDeleter from './components/AccountDeleter';
import SideMenu from '../../[professionalid]/components/SideMenu';
import TopDetails from '../../[professionalid]/components/TopDetails';
import MenuSpacer from '../../[professionalid]/components/MenuSpacer';
import Link from 'next/link';


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

const Settings = async ({ params }: { params: { professionalid: string } }) => {

  const professional = await getProfessionalDetails(params.professionalid);

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
              <div className='bg-white dark:bg-darkBGLighter rounded-lg w-[90vw] h-[85vh]'>

                <div className='flex flex-col justify-center items-center gap-6 h-2/5'>
                  <h2 className='text-4xl text-black dark:text-white font-bold uppercase'>Quer mudar o plano?</h2>
                  <p className='text-xl text-grayPrimary dark:text-grayLighter'>Cansou de faturas mensais ou escolheu um plano muito longo?</p>
                  <Link href="/pagamentoPlano">
                    <Button variant='primary' className='text-center'>
                      Mude agora!
                    </Button>
                  </Link>
                </div>

                <div className='mx-[10%]'>
                  <MenuSpacer />
                </div>

                <div className='flex flex-row justify-evenly items-center'>
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