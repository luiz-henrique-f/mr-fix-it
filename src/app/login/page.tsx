"use client"

import * as React from 'react';
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
import CreateProfessional from '../components/CreateProfessional';
import { toast } from 'react-toastify';
import Button from '@/components/Button';

type IBGEUFResponse = {
  id: number;
  sigla: string;
  nome: string;
};

type IBGECITYResponse = {
  id: number;
  nome: string;
};

const Login = () => {
  const router = useRouter();
  const { status, data } = useSession();

  // const handleLoginClick = () => signIn("google", {
  //   redirect: true,
  //   callbackUrl: "/",
  // });

  const redirecionar = () => {
	return "/createProfessional"
  }

//   const handleLoginClick = async () => {
//     const result = await signIn("google", {
//       redirect: true,
//       callbackUrl: "/createProfessional",
//     })
//   }

  const handleLoginClick = () => {
	signIn()
  }

//   const handleLogoutClick = () => {
//     setMenuIsOpen(false);
//     signOut();
//   };

  // const fetchCategories = async () => {
  //   const categories = await fetch('/categoria');

  //   const json = await categories.json();
  //   console.log(json);

  // };

  React.useEffect(() => {
	if(status === "authenticated"){
		return router.push("/createProfessional")
	}
  })

    return (
		<div className="flex items-center justify-center flex-col bg-neutral-200 dark:bg-darkBG overflow-hidden">
			<div className="rounded-3xl overflow-hidden w-full bg-white h-full shadow-lg shadow-gray-400">

				<div className="absolute top-0 h-full left-0 w-full 2md:w-3/5 xl:w-6/12">

					<div className="absolute top-8">
						<Link
							href="/"
							className="text-base flex items-center justify-center ml-8 gap-3 font-bold hover:text-primary text-primaryDarker dark:text-walterWhite">
							<IoIosArrowBack /> Página Inicial
						</Link>
					</div>

					<form className="h-full gap-1 flex items-center justify-center flex-col py-0 px-10 bg-white dark:bg-darkBG">
						<h1 className="text-3xl 2sm:text-4xl pb-2 font-semibold text-primaryDarker dark:text-walterWhite">Entre com</h1>

						<div className="pb-5 my-5 mx-0 text-primaryDarker dark:text-walterWhite">
							<button
								className="inline-flex justify-center items-center rounded-2xl text-xs sm:text-sm 2sm:text-base my-0 mx-3 gap-2 border border-gray-200 p-4 hover:bg-gray-200/60 transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]"
								onClick={handleLoginClick}>
								<FcGoogle className="text-xl 2sm:text-xl" /> Entre com sua conta google
							</button>
						</div>

						<span className="text-xs text-center 2sm:text-sm cursor-default p-2 text-gray-500 dark:text-primaryLighter">
							A opção de logar por e-mail está em manutenção no momento.
						</span>
						
						<input
							type="text"
							placeholder="E-mail ou Usuário"
							disabled
							className="text-xs rounded-lg w-full 2sm:w-3/4 md:w-3/5 2md:w-4/5 xl:w-3/5 file:border-none outline-none p-4 my-4 mx-0 bg-gray-200"
						/>

						<input
							type="password"
							placeholder="Senha"
							disabled
							className="text-xs rounded-lg w-full 2sm:w-3/4 md:w-3/5 2md:w-4/5 xl:w-3/5 file:border-none outline-none p-4 my-4 mx-0 bg-gray-200"
						/>

						<div className="flex flex-col items-center sm:flex-row gap-2 text-sm no-underline text-gray-400 dark:text-primaryLighter mx-0 my-1">
							<Link href="#" className="hover:text-primary">
								Esqueci minha senha
							</Link>
							
							<span className='invisible sm:visible'>|</span>

							{/* <div className='flex items-center flex-col bg-primaryLighter/25 border border-solid border-gray-300/70 rounded-md p-3 sm:bg-transparent sm:border-none sm:flex-row sm:p-0 sm:gap-2'>
								<p>Não tem uma conta?</p>
								
								<CreateProfessional />
							</div> */}
						</div>
						
						
						<button 
							className="text-base rounded-lg font-semibold uppercase w-full 2sm:w-3/4 md:w-3/5 2md:w-4/5 xl:w-3/5 mt-4 cursor-pointer border-spacing-px bg-primary hover:bg-primaryDarker border-opacity-0 tracking-wide py-3 px-11 text-white transition-all duration-[0.5s] ease-[ease-in-out]">
							Entrar
						</button>
						
					</form>
				</div>

				<div className="absolute top-0 invisible 2md:visible 2md:w-2/5 xl:w-6/12 h-full overflow-hidden 2md:left-[60%] xl:left-2/4">
					<div className="h-full flex justify-center items-center flex-col bg-primary bg-gradient-to-br from-primary to-primaryDarker">

						<h1 className="text-4xl font-semibold text-white">
							Seja Bem-vindo de volta!
						</h1>

						<p className="text-base leading-5 mx-0 my-5 text-white">
							Fique por dentro dos pedidos de seus serviços
						</p>

						<Image
							src="/Logo 3.0 (branco).png"
							width={400}
							height={400}
							alt="Logo"
							className="absolute opacity-10"
						/>
					</div>
				</div>
			
			</div>
			
		</div>
    );
  };
// };
export default Login;

