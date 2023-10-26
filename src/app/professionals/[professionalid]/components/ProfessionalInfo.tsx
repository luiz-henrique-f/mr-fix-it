import React from 'react';
import Image from 'next/image';
import { BsWhatsapp } from 'react-icons/bs'
import { FaMapPin } from 'react-icons/fa'
import ChangeButton from '@/components/ChangeButton'

const ProfessionalInfo = () => {
    return (
        <div className="relative flex flex-col justify-center items-center bg-white dark:bg-darkBGLighter rounded-lg w-full gap-5 p-8">
            <ChangeButton className='absolute top-3 right-3' />

            <div className='rounded-full p-[6px] border-4 border-solid border-darkBGLighter dark:border-whiteBG'>
                <Image
                src="/perfil.png"
                width={140}
                height={140}
                className='overflow-hidden rounded-[100%]'
                style={{
                    objectFit: "cover",
                }} 
                alt='Imagem Usuário' 
                />
            </div>

            <div className='flex flex-col items-center mb-8'>
                <h1 className='font-bold text-2xl text-primaryDarker dark:text-white'>Luiz H.</h1>

                <div className='flex items-center gap-1 my-1 mt-8 text-sm font-semibold text-grayPrimary dark:text-grayLighter'>
                    <FaMapPin className='text-base' />
                    <p>Urânia,</p>
                    <p>São Paulo</p>
                </div>

                <div className='gap-1 my-1'>
                    <p className='flex items-center gap-2 text-sm font-semibold text-grayPrimary dark:text-grayLighter'>
                        <BsWhatsapp className='text-center text-sm' />
                        +55 17 9966-3223
                    </p>
                </div>
            </div>

            <div className='absolute flex justify-center pt-2 bottom-3 border-t-2 border-solid border-whiteBG dark:border-darkBG w-full'>
                <p className='uppercase font-semibold text-sm text-grayPrimary dark:text-grayLighter'>Membro desde: Outubro, 2023</p>
            </div>
        </div>
    )
}

export default ProfessionalInfo