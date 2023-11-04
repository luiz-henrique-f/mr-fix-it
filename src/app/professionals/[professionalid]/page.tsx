import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

import ChangeButton from '@/components/ChangeButton';
import ProfessionalDescription from './components/ProfessionalDescription';
import ProfessionalInfo from './components/ProfessionalInfo';
import ProfessionalCategory from './components/ProfessionalCategory';
import ProfessionalRaiting from './components/ProfessionalRaiting';

import { AiFillStar } from 'react-icons/ai'

const getProfessionalDetails = async (professionalid: string) => {
    const professional = await prisma.prestador.findFirst({
        where: {
            id_user: professionalid,
        },
    });

    return professional;
}

const ProfessionalDetail = async ({params}: { params : { professionalid: string} }) => {
    const professional = await getProfessionalDetails(params.professionalid);

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
                    <ProfessionalInfo
                        name={professional?.nome as any}
                        city={professional?.cidade as any}
                        uf={professional?.uf as any}
                        telefone={professional?.celular as any}
                    />

                    <ProfessionalCategory
                        categoria={professional?.tipo_categoria as any}
                    />
                </div>

                <div className='w-full 2md:w-3/5 2md:mr-[10%] h-full flex flex-col gap-3'>
                    <ProfessionalDescription
                        description={professional?.observacao as any}
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