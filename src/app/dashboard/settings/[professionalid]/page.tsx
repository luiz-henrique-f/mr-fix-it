import * as React from 'react';
import { prisma } from '@/lib/prisma';
import { Prestador } from '@prisma/client';

import SideMenu from '../../[professionalid]/components/SideMenu';
import TopDetails from '../../[professionalid]/components/TopDetails';


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

            <div>
              {/* conteudo da pagina aqui! */}
            </div>
            
          </div>

        </div>
      </div>

    </>
  );

};

export default Settings;