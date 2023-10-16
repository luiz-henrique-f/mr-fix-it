import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { BsWhatsapp } from 'react-icons/bs'
import React from 'react';
import ProfessionalDescription from './components/ProfessionalDescription';

// const getProfessionalDetails = async (professionalid: string) => {
//     const professional = await prisma.prestador.findUnique({
//         where: {
//             id: professionalid,
//         },
//     });

//     return professional;
// }

const ProfessionalDetail = async ({params}: { params : { professionalid: string} }) => {
    // const professional = await getProfessionalDetails(params.professionalid);

    // if(!professional) return null;

    return (
        <div className='container flex flex-col mx-auto my-4 px-3 gap-3'>
            <div className='border border-solid border-gray-600/20 dark:border-zinc-900/40 rounded-xl bg-white dark:bg-darkBGLighter overflow-hidden'>
                <div className="relative flex justify-center 2sm:justify-normal h-[200px] w-full">
                    <Image
                        src="/capa-tecnology.png"
                        fill
                        style={{
                            objectFit: "cover",
                        }} 
                        alt='Imagem Capa' 
                    />

                    <div className='absolute top-24 2sm:left-5 p-2 rounded-[100%] bg-white dark:bg-darkBGLighter'>
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
                    {/* <h1>{professional.nome}</h1> */}
                    {/* <Image src={professional?.nome} fill alt={professional.nome}/> */}
                </div>


                <div className='flex flex-col mt-[15%] p-6 sm:mt-[5%] w-full'>
                    <h1 className='font-bold text-2xl text-primaryDarker dark:text-white'>Luiz H.</h1>

                    <div className='flex items-center gap-1 my-1'>
                        <p className='text-sm font-semibold text-grayPrimary dark:text-grayLighter'>Urânia,</p>
                        <p className='text-sm font-semibold text-grayPrimary dark:text-grayLighter'>São Paulo</p>
                    </div>

                    <div className='gap-1 my-1'>
                        <p className='flex items-center gap-2 text-sm font-semibold text-grayPrimary dark:text-grayLighter'>
                            <BsWhatsapp className='text-center text-sm' />
                            +55 17 9966-3223
                        </p>
                    </div>
                </div>
            </div>
            
            <div className='border border-solid border-gray-600/20 dark:border-zinc-900/40 rounded-xl bg-white dark:bg-darkBGLighter overflow-hidden'>
                <ProfessionalDescription description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."/>
            </div>

            {/* <ProfessionalHighlisht /> */}
            {/* <ProfessionalComments /> */}
        </div>

    )
}

export default ProfessionalDetail