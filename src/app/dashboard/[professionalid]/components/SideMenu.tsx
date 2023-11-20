import * as React from 'react';
import Link from 'next/link';

import MenuSpacer from './MenuSpacer';
import Button from '@/components/Button';

import { AiFillSetting } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'

interface ProfessionalInfoProps {
  id_prestador: string;
};


const SideMenu = ({ id_prestador }: ProfessionalInfoProps) => {
  return (
    <>
      <div className='h-[calc(100vh-225px)] flex justify-start items-center'>
        <ul className='text-gray-500/70 dark:text-gray-400/80 font-bold flex flex-col gap-4 text-3xl p-3 rounded-xl ml-4 shadow-xl dark:shadow-whiteBG/10 bg-white dark:bg-darkBGLighter'>
          
          <li>
            <Link 
              href={`/dashboard/${id_prestador}`}>
              <Button variant='icon'>
                <BsGraphUp />
              </Button>
            </Link>
          </li>

          <MenuSpacer />
          
          <li>
            <Link href={`/dashboard/profile/${id_prestador}`}>
              <Button variant='icon'>
                <CgProfile />
              </Button>
            </Link>
          </li>

          <MenuSpacer />
          
          <li>
            <Link href={`/dashboard/settings/${id_prestador}`}>
              <Button variant='icon'>
                <AiFillSetting />
              </Button>
            </Link>
          </li>

        </ul>
      </div>
    </>
  );
};

export default SideMenu;