"use client"

import * as React from 'react';
// import { google } from 'googleapis';
// import GoogleAnalytics from '@bradgarropy/next-google-analytics';
import Image from 'next/image'
import Script from "next/script";
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';

import SideMenu from './components/SideMenu';
import TopCards from './components/TopCards';
import GraphCard from './components/GraphCard';

import { IoMdStar } from 'react-icons/io'
import { HiCurrencyDollar } from 'react-icons/hi2';
import { FaHammer, FaThumbsUp } from 'react-icons/fa6';
import { MdSupervisorAccount } from 'react-icons/md';
 
const Dashboard = ({ params }: { params: { professionalid: string } }) => {
    return (
        <>
            
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=G-FWQ879X8DX`}
            />

            <Script id="gtm-script" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-FWQ879X8DX', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script>

            <h1 className='text-6xl uppercase tracking-[10px] text-gray-500/40 dark:text-gray-400/80 font-bold'>Dashboard</h1>
            <div className='flex gap-12'>
                <SideMenu id_prestador={params.professionalid}/>

                <div className='flex justify-between w-full mr-[5%] gap-8'>

                    <div className='flex flex-col flex-[70%] gap-10 m-4 w-full'>
                        <div className='flex flex-col md:flex-row gap-8 w-full'>
                            <TopCards
                                name='Novos Comentários'
                                value={12}
                                positive={false}
                                difference={16}
                                icon={<IoMdStar />}
                                color={'#d33'}
                            />

                            <TopCards
                                name='Serviços Prestados'
                                value={6}
                                positive
                                difference={24}
                                icon={<FaHammer />}
                                color={'#a28'}
                            />

                            <TopCards
                                name='Visitas no Perfil'
                                value={1}
                                icon={<MdSupervisorAccount />}
                                color={'#f0f'}
                                
                                positive={false}
                                difference={89}
                            />
                            
                            <TopCards
                                name='Avaliações Positivas'
                                value={15}
                                positive={false}
                                difference={36}
                                icon={<FaThumbsUp />}
                                color={'#2a6'}
                            />
                        </div>
                        
                        <div>
                            <GraphCard itemName='Item' title='Grafico de tal coisa!' valorSeg={10} valorTer={5} valorQua={17} valorQui={13} valorSex={6} valorSab={3} valorDom={8} />
                        </div>

                    </div>

                    <div className="flex flex-[20%] my-4">
                        <div className="bg-white rounded-md w-full h-full"></div>
                    </div>

                </div>
           </div>

            {/* <GoogleAnalytics measurementId='G-FWQ879X8DX'/> */}
        </>
    )

};

export default Dashboard;