import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import MenuSpacer from './MenuSpacer';
import Button from '@/components/Button';

import { AiFillSetting, AiFillHome } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { FaUser } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

interface ProfessionalInfoProps {
  id_prestador: string;
};


const SideMenu = ({ id_prestador }: ProfessionalInfoProps) => {
  return (
    <>
      <div className='h-[calc(100vh-225px)] flex justify-start items-start'>
        <ul className='text-gray-500 dark:text-gray-300 font-bold flex flex-col gap-4 text-lg p-2 rounded-2xl bg-white dark:bg-darkBGLighter'>
          
          <Link
            href={'/'}
            className='flex justify-center items-center pt-2'>
            <Image 
              src="/Logo_3.0_roxo.png" 
              height={45} 
              width={45} 
              alt='Website Logo'
            />

          </Link>
          
          <MenuSpacer />

          <li className='group'>
            <Link 
              href={'/'}>
              <Button variant='icon'>
                <AiFillHome className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                <span>Página Inicial</span>
              </Button>
            </Link>
          </li>
          
          <MenuSpacer />
          
          <li className='group'>
            <Link 
              href={`/dashboard/${id_prestador}`}>
              <Button variant='icon'>
                <BsGraphUp className='text-xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                <span>Dashboard</span>
              </Button>
            </Link>
          </li>
          
          <li className='group'>
            <Link href={`/dashboard/profile/${id_prestador}`}>
              <Button variant='icon'>
                <IoInformationCircleOutline className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                <span>Informações</span>
              </Button>
            </Link>
          </li>

          <li className='group'>
            <Link href={`/`}>
              <Button variant='icon'>
                <FaUser className='text-xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                <span>Perfil</span>
              </Button>
            </Link>
          </li>

          <MenuSpacer />
          
          <li className='group'>
            <Link href={`/dashboard/settings/${id_prestador}`}>
              <Button variant='icon'>
                <AiFillSetting className='text-xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                <span>Configurações</span>
              </Button>
            </Link>
          </li>

        </ul>
      </div>
    </>
  );
};

export default SideMenu;