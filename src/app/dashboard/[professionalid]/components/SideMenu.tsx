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
      <div className='h-screen flex justify-center items-start group/sidebar'>

        <div className='h-full bg-white dark:bg-darkBGLighter text-base flex flex-col justify-between'>
          <ul className='text-gray-500 dark:text-gray-300 font-bold w-[60px] group-hover/sidebar:w-full flex flex-col gap-4 p-2'>
            
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

            <li className='group my-[0.5px] group-hover/sidebar:my-0'>
              <Link 
                href={'/'}>

                <Button variant='icon'className='block group-hover/sidebar:hidden'>
                  <AiFillHome className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                </Button>

                <Button variant='icon' className='hidden group-hover/sidebar:flex'>
                  <AiFillHome className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                  <span>Página Inicial</span>
                </Button>

              </Link>
            </li>

            <li className='group my-[0.5px] group-hover/sidebar:my-0'>
              <Link href={`/professionals/${id_prestador}`}>
                
                <Button variant='icon' className='block group-hover/sidebar:hidden'>
                  <FaUser className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                </Button>

                <Button variant='icon' className='hidden group-hover/sidebar:flex'>
                  <FaUser className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                  <span>Seu Perfil</span>
                </Button>

              </Link>
            </li>
            
            <MenuSpacer />
            
            <li className='group my-[0.5px] group-hover/sidebar:my-0'>
              <Link href={`/dashboard/${id_prestador}`}>
                  
                <Button variant='icon' className='block group-hover/sidebar:hidden'>
                  <BsGraphUp className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                </Button>

                <Button variant='icon' className='hidden group-hover/sidebar:flex'>
                  <BsGraphUp className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                  <span>Dashboard</span>
                </Button>

              </Link>
            </li>
            
            <li className='group my-[0.5px] group-hover/sidebar:my-0'>
              <Link href={`/dashboard/profile/${id_prestador}`}>
                
                <Button variant='icon' className='block group-hover/sidebar:hidden'>
                  <IoInformationCircleOutline className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                </Button>

                <Button variant='icon' className='hidden group-hover/sidebar:flex'>
                  <IoInformationCircleOutline className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                  <span>Informações</span>
                </Button>

              </Link>
            </li>

            <MenuSpacer />

          </ul>

          <ul className='text-gray-500 dark:text-gray-300 font-bold w-14 group-hover/sidebar:w-full flex flex-col gap-4 p-2'>
            <MenuSpacer />
            
            <li className='group my-[0.5px] group-hover/sidebar:my-0'>
              <Link href={`/dashboard/settings/${id_prestador}`}>

                <Button variant='icon' className='block group-hover/sidebar:hidden'>
                  <AiFillSetting className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                </Button>

                <Button variant='icon' className='hidden group-hover/sidebar:flex'>
                  <AiFillSetting className='text-2xl group-hover:text-primary dark:group-hover:text-primaryLighter' />
                  <span>Configurações</span>
                </Button>
                
              </Link>
            </li>

          </ul>

        </div>

      </div>
    </>
  );
};

export default SideMenu;