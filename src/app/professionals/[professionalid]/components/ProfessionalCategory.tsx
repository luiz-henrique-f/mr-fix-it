"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';

import Button from '@/components/Button';
import ChangeButton from '@/components/ChangeButton'

import { Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { FiLogIn } from 'react-icons/fi';
import { title } from 'process';

interface ProfessionalCategoryProps {
    title: string;
    input: string;
};

const ProfessionalCategory = ({ input, title }: ProfessionalCategoryProps) => {

    return (
        <div className="relative flex flex-col bg-white dark:bg-darkBGLighter rounded-lg w-full gap-5 p-8">

            <h1 className='flex justify-center font-bold text-2xl text-primaryDarker dark:text-white items-center'>{title}</h1>

            <div className='items-center'>
                <p className='flex justify-center font-semibold bg-primary dark:bg-primaryLighter text-white text-sm py-2 px-3 rounded-md'>{input}</p>
            </div>

        </div>
    );
};

export default ProfessionalCategory;