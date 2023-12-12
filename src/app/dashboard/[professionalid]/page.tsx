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
import CommentList from './components/ComentList';
import Button from '@/components/Button';

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


const Dashboard = async ({ params }: { params: { professionalid: string } }) => {

    const professional = await getProfessionalDetails(params.professionalid);
    
    const comentarios = await prisma.comentarios_Prestador.findMany({
        where: {
            id_prestador: params.professionalid,
        },
    })
    
    const comentarios_positives = await prisma.comentarios_Prestador.findMany({
        where: {
            id_prestador: params.professionalid,
        AND:{
            nota: {gte: 4},
        }
        },
    })
    
    const comentarios_negatives = await prisma.comentarios_Prestador.findMany({
        where: {
            id_prestador: params.professionalid,
        AND:{
            nota: {lte: 3},
        }
        },
    })

    const resultNewComments = await prisma.$queryRaw`SELECT "public"."Comentarios_Prestador"."nome"
                                          FROM   "public"."Comentarios_Prestador"
                                          WHERE  TO_CHAR("public"."Comentarios_Prestador"."data", 'MM') = TO_CHAR(current_date, 'MM')
                                          AND    "public"."Comentarios_Prestador"."id_prestador" = ${params.professionalid}`.finally(() => {
        prisma.$disconnect();
    });

    const resultNewCommentsPositives = await prisma.$queryRaw`SELECT "public"."Comentarios_Prestador"."nome"
                                             FROM   "public"."Comentarios_Prestador"
                                             WHERE  TO_CHAR("public"."Comentarios_Prestador"."data", 'MM') = TO_CHAR(current_date, 'MM')
                                             AND    "public"."Comentarios_Prestador"."nota"        >= 4
                                             AND    "public"."Comentarios_Prestador"."id_prestador" = ${params.professionalid}`.finally(() => {
        prisma.$disconnect();
    });

    const resultNewCommentsNegatives = await prisma.$queryRaw`SELECT "public"."Comentarios_Prestador"."nome"
                                             FROM   "public"."Comentarios_Prestador"
                                             WHERE  TO_CHAR("public"."Comentarios_Prestador"."data", 'MM') = TO_CHAR(current_date, 'MM')
                                             AND    "public"."Comentarios_Prestador"."nota"       <= 3
                                             AND    "public"."Comentarios_Prestador"."id_prestador" = ${params.professionalid}`.finally(() => {
        prisma.$disconnect();
    });

    return (
        <>
            <div className='absolute top-0 left-0 h-screen w-screen bg-gradient-to-b from-primaryDarker from-35% to-35% to-whiteBG dark:to-darkBG'>

                <div className='flex h-full gap-4 mr-6'>
                    <SideMenu id_prestador={params.professionalid} />

                    <div className='flex flex-col w-full gap-4 overflow-y-scroll mb-4'>
                        <div className='flex justify-end items-center mb-4'>
                            <TopDetails url_foto={professional?.url_foto as any} />
                        </div>

                        <div className='flex justify-between flex-col 3xl:flex-row gap-4 h-full mr-4 4xl:mr-0'>

                            <div className='flex flex-col gap-6 justify-between flex-[70%] 3xl:w-4/5'>
                                <div className='grid grid-flow-row 2md:grid-flow-col 2md:grid-col-3 gap-4'>
                                    <TopCards
                                        name='Novos Comentários'
                                        value={(resultNewComments as any).length}
                                        positive
                                        difference={Math.round(((resultNewComments as any).length as any) * 100 / comentarios.length)}
                                        icon={<IoMdStar />}
                                        color={'#8C55D9'}
                                    />

                                    <TopCards
                                        name='Avaliações Positivas'
                                        value={(resultNewCommentsPositives as any).length}
                                        positive
                                        difference={Math.round(((resultNewCommentsPositives as any).length as any) * 100 / comentarios_positives.length)}
                                        icon={<FaThumbsUp />}
                                        color={'#4BC567'}
                                    />

                                    <TopCards
                                        name='Avaliações Negativas'
                                        value={(resultNewCommentsNegatives as any).length}
                                        positive
                                        difference={Math.round(((resultNewCommentsNegatives as any).length as any) * 100 / comentarios_negatives.length)}
                                        icon={<FaThumbsDown />}
                                        color={'#D95559'}
                                    />
                                </div>

                                <div>
                                    <GraphCard />
                                </div>

                            </div>

                            <div className="flex flex-[20%] flex-col 3xl:w-1/5 w-full h-full min-h-[50vh] max-h-[88vh] overflow-y-scroll bg-white dark:bg-darkBGLighter rounded-2xl">

                                {(comentarios.length as any) != '0' ?
                                    <CommentList params={params} />
                                    :
                                    <div className="flex items-center justify-center">
                                        <span className="text-xl font-semibold font-mono mt-56 3xl:mt-96 text-center">
                                            Você ainda não possui avaliações!
                                        </span>
                                    </div>
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )

};

export default Dashboard;