import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Comentarios_Prestador } from '@prisma/client';

import Button from '@/components/Button';
import AddComent from './components/AddComent';
import ChangeButton from '@/components/ChangeButton';
import ProfessionalInfo from './components/ProfessionalInfo';
import ProfessionalRaiting from './components/ProfessionalRaiting';
import ProfessionalCategory from './components/ProfessionalCategory';
import ProfessionalDescription from './components/ProfessionalDescription';

import { AiFillStar } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi';


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

const getCommentsDetails = async (professionalid: string) => {
    const professional = await prisma.comentarios_Prestador.findMany({
        where: {
            id_prestador: professionalid,
        },
    }).finally(() => {
        prisma.$disconnect();
    });

    return professional;
}

const getPhotoProfessional = async (professionalid: string) => {
    const photo = await prisma.foto_Prestador.findFirst({
        where: {
            id_prestador: professionalid,
        },
    }).finally(() => {
        prisma.$disconnect();
      });
  
    return photo;
};


const ProfessionalDetail = async ({ params }: { params: { professionalid: string} }) => {
    const professional = await getProfessionalDetails(params.professionalid);
    const data = await getCommentsDetails(params.professionalid);
    const photo = await getPhotoProfessional(params.professionalid);

    if (!professional) return null;

    return (
        <div className='h-full bg-whiteBG dark:bg-darkBG'>
            <div className="relative h-72 w-full mb-10 bg-gradient-to-br from-primary to-primaryDarker">
                <Image
                    src="/capa-mrfixit.png"
                    fill
                    style={{
                        objectFit: "cover",
                    }}
                    alt='Imagem Logo'
                />

            </div>

            <div className='container relative p-4 mx-auto 2md:flex 2md:gap-10'>
                <div className='w-full 2md:w-[30%] 2md:ml-[10%] -mt-[70%] 2sm:-mt-[25%] 2md:-mt-[20%] xl:-mt-[15%] pb-3 2md:pb-0 h-full flex flex-col gap-6'>
                    <ProfessionalInfo
                        name={professional?.nome as any}
                        city={professional?.desc_cidade as any}
                        uf={professional?.uf as any}
                        telefone={professional?.celular as any}
                        urlFoto={professional?.url_foto as any}
                        id={professional?.id as any}
                    />

                    <ProfessionalCategory
                        categoria={professional?.tipo_categoria as any}
                    />
                </div>

                <div className='w-full 2md:w-3/5 2md:mr-[10%] h-full flex flex-col gap-3'>
                    <ProfessionalDescription
                        description={professional?.observacao as any}
                    />

                    {/* {params.status == 'unauthenticated' && ( */}

                        <div className="relative flex flex-col bg-white dark:bg-darkBGLighter rounded-lg p-8 gap-5 h-96">
                            <div className='flex justify-between'>
                                <h1 className='text-2xl font-bold flex justify-normal items-center gap-2 text-primaryDarker dark:text-white mb-3'>
                                    <AiFillStar className='text-orange-400' />
                                    Avaliações dos Usuários
                                </h1>

                                <AddComent professionalId={params.professionalid} />
                                
                            </div>

                            <div className="overflow-y-scroll flex flex-col gap-5">
                                    
                                {data.map((comments: Comentarios_Prestador) => (
                                    <ProfessionalRaiting 
                                        key={comments.id} 
                                        name={comments.nome} 
                                        title={comments.titulo_comentario} 
                                        message={comments.comentario} 
                                        valueComment={comments.nota}
                                        className='' 
                                    />
                                ))}
                            </div>
                        </div>
                    {/* )} */}
                </div>
            </div>
        </div>
    );
};

export default ProfessionalDetail;