"use client"

import * as React from 'react';
import { google } from 'googleapis';
import Image from 'next/image'
import Script from "next/script";
import GoogleAnalytics from '@bradgarropy/next-google-analytics';

const Dashboard = () => {
    return (
        <div>
            
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

            <h1 className='text-6xl uppercase tracking-[10px] text-gray-500/40 font-bold'>Dashboard</h1>
            <div className='flex justify-center items-center'>
                <Image
                    src="/Under construction.png"
                    width={700}
                    height={700}
                    alt="Logo"
                />
            </div>

            <GoogleAnalytics measurementId='G-FWQ879X8DX'/>
        </div>
    )

};

export default Dashboard