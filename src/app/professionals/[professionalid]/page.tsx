import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import ChangeButton from '@/components/ChangeButton';
import ProfessionalDescription from './components/ProfessionalDescription';
import ProfessionalInfo from './components/ProfessionalInfo';
import ProfessionalCategory from './components/ProfessionalCategory';
import ProfessionalRaiting from './components/ProfessionalRaiting';
import { BsWhatsapp } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'

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
        <div className='h-full'>
            <div className="relative h-[200px] w-full mb-10">
                <Image
                    src="/capa-tecnology.png"
                    fill
                    style={{
                        objectFit: "cover",
                    }} 
                    alt='Imagem Capa' 
                />

                <ChangeButton variant='secondary' className='absolute top-3 right-3' />
            </div>

            <div className='container relative p-4 mx-auto 2md:flex 2md:gap-10'>
                    <div className='w-full 2md:w-[30%] 2md:ml-[10%] -mt-[40%] 2sm:-mt-[20%] 2md:-mt-[10%] xl:-mt-[7%] pb-3 2md:pb-0 h-full flex flex-col gap-6'>
                        <ProfessionalInfo />
                        <ProfessionalCategory />
                    </div>

                    <div className='w-full 2md:w-3/5 2md:mr-[10%] h-full flex flex-col gap-3'>
                        <ProfessionalDescription
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                        />

                        <div className="relative flex flex-col bg-white dark:bg-darkBGLighter rounded-lg w-full p-8 gap-5">
                            <h1 className='text-2xl font-bold flex justify-normal items-center gap-2 text-primaryDarker dark:text-white mb-3'>
                                <AiFillStar className='text-orange-400' />
                                Avaliações dos Usuários
                            </h1>
                            
                            <ProfessionalRaiting name='Madrid' title='Não recomendo!' message='Ruim, péssimo profissional!' />
                            <ProfessionalRaiting name='Natan Alonso' title='FAAAAZ O L!!!!' message='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur consequatur ab vero nemo, error deserunt cumque. A aliquam atque sunt, corporis quisquam aut dolore, distinctio delectus alias magni ratione itaque.' />
                        </div>
                        
                    </div>
            </div>
        </div>
    )
}

export default ProfessionalDetail