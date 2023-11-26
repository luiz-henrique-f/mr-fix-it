import * as React from 'react';

import SideMenu from '../../[professionalid]/components/SideMenu';
import TopDetails from '../../[professionalid]/components/TopDetails';


const Settings = ({ params }: { params: { professionalid: string } }) => {
  return (
    <>
      <div className='absolute top-0 left-0 h-screen w-screen bg-gradient-to-b from-primaryDarker from-35% to-35% to-whiteBG dark:to-darkBG overflow-hidden'>
        <div className='flex gap-4 mr-6'>
          <SideMenu id_prestador={params.professionalid}/>

          <div className='flex flex-col w-full gap-4'>
            <div className='flex justify-end items-center mb-4'>
              <TopDetails prestador={params.professionalid} />
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