"use client"

import * as React from 'react';
import Image from 'next/image'

const Dashboard = () => {

    return (
        <div>
            <h1 className='text-6xl uppercase tracking-[10px] text-gray-500/40 font-bold'>Dashboard</h1>
            <div className='flex justify-center items-center'>
                <Image
                    src="/Under construction.png"
                    width={700}
                    height={700}
                    alt="Logo"
                />
            </div>
        </div>
    )

};

export default Dashboard