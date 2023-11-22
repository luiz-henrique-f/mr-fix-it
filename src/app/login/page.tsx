"use client"

import * as React from 'react';
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.min.css';

import Button from '@/components/Button';
import RegisterCredentialsUser from '@/components/RegisterCredentialsUser';

import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from 'react-icons/fi';
import { IoIosArrowBack } from "react-icons/io";

type IBGEUFResponse = {
	id: number;
	sigla: string;
	nome: string;
};

type IBGECITYResponse = {
	id: number;
	nome: string;
};

interface CreateProfessionalForm {
	email: String;
	senha: String;
}

const Login = () => {
	// código que pode ser usado futuramente para o credentials

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		watch,
		setError,
	} = useForm<CreateProfessionalForm>();

	const onSubmit = async (data: CreateProfessionalForm) => {
		console.log(data)

		if (data.email == '') {
			toast.warning("Informe seu E-mail!", { position: "top-right" });
			return null;
		}

		if (data.senha == '') {
			toast.warning("Informe sua senha!", { position: "top-right" });
			return null;
		}

		// const response = await fetch("http://localhost:3000/register", {
		// 	method: "POST",
		// 	body: Buffer.from(
		// 		JSON.stringify({
		// 			username: 'teste@teste',
		// 			password: '123456',
		// 		})
		// 	),
		// });

		// const dados = await response.json()

		// if (!dados.user) return null;

		await signIn('credentials', { username: data.email, password: data.senha, callbackUrl: '/' });
	}

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
		signIn('credentials', { username: 'luizh', password: '123456', callbackUrl: '/' })
	}

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
						<h1 className="text-3xl 2sm:text-4xl pb-2 font-semibold text-primaryDarker dark:text-walterWhite" title='Laele'>Entre</h1>

						{/* <div className="pb-5 my-5 mx-0 text-primaryDarker dark:text-walterWhite">
							<button
								className="inline-flex justify-center items-center rounded-2xl text-xs sm:text-sm 2sm:text-base my-0 mx-3 gap-2 border border-gray-200 p-4 hover:bg-gray-200/60 transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]"
								onClick={handleLoginClick}>
								<FcGoogle className="text-xl 2sm:text-xl" /> Entre com sua conta google
							</button>
						</div> */}

						<span className="text-sm cursor-default p-2 text-gray-400 dark:text-primaryLighter">
							Conecte-se com seu e-mail e senha!
						</span>
						
						<input
							{...register("email")}
							type="text"
							placeholder="E-mail"
							className="text-xs rounded-lg w-full 2sm:w-3/4 md:w-3/5 2md:w-4/5 xl:w-3/5 file:border-none outline-none p-4 my-4 mx-0 bg-gray-200/60"
						/>

						<input
							{...register("senha")}
							type="password"
							placeholder="Senha"
							className="text-xs rounded-lg w-full 2sm:w-3/4 md:w-3/5 2md:w-4/5 xl:w-3/5 file:border-none outline-none p-4 my-4 mx-0 bg-gray-200/60"
						/>

						<RegisterCredentialsUser />


						<Button
							variant="login"
							onClick={() => handleSubmit(onSubmit)()}
						>
							Entrar
						</Button>

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

