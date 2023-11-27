// "use client"

import * as React from 'react';
import Image from 'next/image'
import { prisma } from '@/lib/prisma';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Comentarios_Prestador } from '@prisma/client';

import SideMenu from './components/SideMenu';
import TopDetails from './components/TopDetails';
import TopCards from './components/TopCards';
import GraphCard from './components/GraphCard';
import ProfessionalRaiting from '@/app/professionals/[professionalid]/components/ProfessionalRaiting';

import { IoMdStar } from 'react-icons/io'
import { FaHammer, FaThumbsUp, FaThumbsDown } from 'react-icons/fa6';

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
 
const Dashboard = async ({ params }: { params: { professionalid: string } }) => {

    const professional = await getProfessionalDetails(params.professionalid);
    const data = await getCommentsDetails(params.professionalid);

    // if (!professional) return null;
    
    return (
        <>
            <div className='absolute top-0 left-0 h-screen w-screen bg-gradient-to-b from-primaryDarker from-35% to-35% to-whiteBG dark:to-darkBG overflow-hidden'>
                
                <div className='flex gap-4 mr-6'>
                    <SideMenu id_prestador={params.professionalid}/>

                    <div className='flex flex-col w-full gap-4'>
                        <div className='flex justify-end items-center mb-4'>
                            <TopDetails />
                        </div>

                        <div className='flex justify-between gap-4'>

                            <div className='flex flex-col flex-[70%] gap-4'>
                                <div className='flex flex-col md:flex-row gap-4'>
                                    <TopCards
                                        name='Novos Comentários'
                                        value={12}
                                        positive={false}
                                        difference={16}
                                        icon={<IoMdStar />}
                                        color={'#a28'}
                                        />

                                    <TopCards
                                        name='Avaliações Positivas'
                                        value={15}
                                        positive={false}
                                        difference={36}
                                        icon={<FaThumbsUp />}
                                        color={'#2a6'}
                                        />

                                    <TopCards
                                        name='Avaliações Negativas'
                                        value={6}
                                        positive
                                        difference={24}
                                        icon={<FaThumbsDown />}
                                        color={'#d33'}
                                        />
                                </div>
                                
                                <div>
                                    <GraphCard itemName='2023' itemName2='2022' title='Grafico de tal coisa!' />
                                </div>

                            </div>

                            <div className="flex flex-[20%] bg-white dark:bg-darkBGLighter rounded-2xl h-[79vh] ">
                                <div className="overflow-y-scroll w-full">
                                    
                                    {data.map((comments: Comentarios_Prestador) => (
                                        <ProfessionalRaiting key={comments.id} name={comments.nome} title={comments.titulo_comentario} message={comments.comentario} valueComment={comments.nota} />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <GoogleAnalytics measurementId='G-FWQ879X8DX'/> */}
          </div>
        </>
    )

};

export default Dashboard;