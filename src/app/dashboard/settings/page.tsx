import * as React from 'react';
import Script from "next/script";

import SideMenu from '../components/SideMenu';

const Settings = () => {
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

      <h1 className='text-6xl uppercase tracking-[10px] text-gray-500/40 dark:text-gray-400 font-bold'>Dashboard</h1>

      <SideMenu />

    </>
  );

};

export default Settings;