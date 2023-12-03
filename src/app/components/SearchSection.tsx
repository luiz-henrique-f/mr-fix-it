"use client"

import { useEffect, useState } from 'react'
import Link from "next/link";

import SpecialButton from '@/components/SpecialButton'
import Button from '@/components/Button';
import { BsCheck2Square } from 'react-icons/bs';
import axios from 'axios';
import { useSession } from 'next-auth/react';

type Response = {
	nome: string;
	plano: string;
};

const SearchSection = () => {
	const { status, data } = useSession();

	const [nome, setNome] = useState<Response[]>([]);
	const [id_prestador, setIdPrestador] = useState<Response[]>([]);
	const [planoAtivo, setPlanoAtivo] = useState<Response[]>([]);

	useEffect(() => {
		axios.get(`/professionalUser/${(data?.user as any)?.id}`)
			.then((response) => {
				setIdPrestador((response.data[0] as any)?.id)
				setNome((response.data[0] as any)?.nome)
			})
	});

	useEffect(() => {
		axios.get(`/existePlanoAtivo/${(data?.user as any)?.id}`)
			.then((response) => {
				setPlanoAtivo((response.data[0] as any)?.id)
			})
	});

	return (
		<div className="container flex flex-col mx-auto p-5 h-[calc(100vh-85px)] 2sm:bg-search-background 2sm:dark:bg-search-background-dark bg-contain bg-center bg-no-repeat bg-transparent">

			<div className="flex flex-[5%] justify-center items-center">
				{status === "authenticated" && data.user && (
					
					<div className='relative'>
						{id_prestador == undefined && (
							<Link href='/createProfessional'>
								<span className="absolute top-1 left-9 animate-ping flex justify-center items-center h-12 w-36 rounded-md bg-primary opacity-60"></span>
								<Button variant="custom1">
									<BsCheck2Square className='text-white text-xl' />
									<span className="text-base">Completar cadastro</span>
								</Button>
							</Link>
						)}

						{planoAtivo === undefined && id_prestador != undefined && (
							<Link href='/pagamentoPlano'>
								<span className="absolute top-1 left-9 animate-ping flex justify-center items-center h-12 w-36 rounded-md bg-primary opacity-60"></span>
								<Button variant="custom1">
									<span className="text-base">Escolha um Plano!</span>
								</Button>
							</Link>
						)}
					</div>

				)}
			</div>

			<div className='flex flex-[90%] justify-center items-center flex-col w-full'>
				
				<h1 className='font-semibold text-3xl 2sm:text-4xl text-gray-800 dark:text-gray-300 text-center p-3'>A maneira mais fácil de encontrar um profissional <span className='text-primary dark:text-primaryLighter'>capacitado</span>!</h1>
				<p className='text-gray-600 dark:text-gray-400 text-sm 2sm:text-xl text-center p-3 mb-6'>Conheça de forma gratuita os profissionais melhor avaliados!</p>

				<Link href="/search">
					<SpecialButton />
				</Link>
			</div>
		</div>
	)
}

export default SearchSection