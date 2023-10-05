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

  // const handleLoginClick = () => signIn("google", {
  //   redirect: true,
  //   callbackUrl: "/",
  // });

  const onSubmit = async () => {
    const result = await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    })
  }

  // const fetchCategories = async () => {
  //   const categories = await fetch('/categoria');

  //   const json = await categories.json();
  //   console.log(json);

  // };

    return (
      <div className="flex items-center justify-center flex-col bg-neutral-200 dark:bg-zinc-800 overflow-hidden">
        <div className="rounded-3xl overflow-hidden w-full bg-white dark:bg-zinc-500 h-[37rem] shadow-lg shadow-gray-400 dark:border-solid dark:border dark:border-gray-600 dark:shadow-none">

          <div className="absolute top-0 h-full left-0 w-6/12">

            <div className="absolute top-8">
              <Link
                href="/"
                className="text-base flex items-center justify-center ml-8 gap-3 font-bold hover:text-primary text-primaryDarker">
                <IoIosArrowBack /> Página Inicial
              </Link>
            </div>

            <form className="h-full flex items-center justify-center flex-col py-0 px-10 bg-white dark:bg-zinc-800/40">
              <h1 className="text-4xl pb-2 font-semibold text-primaryDarker">Entre com</h1>

              <div className="pb-5 my-5 mx-0 text-primaryDarker">
                <button
                  className="inline-flex justify-center items-center rounded-2xl my-0 mx-3 gap-2 border border-gray-200 p-4 hover:bg-gray-200/60 transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]"
                  onClick={onSubmit}
                  >
                  <FcGoogle className="text-xl" /> Entre com sua conta google
                </button>
              </div>

              <span className="text-xs p-2 text-gray-500 dark:text-white">
                A opção de logar por e-mail está em manutenção no momento.
              </span>
              
              <input
                type="text"
                placeholder="E-mail ou Usuário"
                disabled
                className="text-xs rounded-lg w-4/5 file:border-none outline-none py-4 px-4 my-4 mx-0 bg-gray-200"
              />
              <input
                type="password"
                placeholder="Senha"
                disabled
                className="text-xs rounded-lg w-4/5 file:border-none outline-none py-4 px-4 my-4 mx-0 bg-gray-200"
              />

              <div className="flex gap-2 text-xs no-underline text-gray-400 mx-0 my-1">
                <Link href="#" className="hover:text-primary">
                  Esqueci minha senha
                </Link>
                
                <span>|</span>

            Não tem uma conta? <CreateProfessional />
              </div>
              
              
              <button className="text-base rounded-lg font-semibold uppercase mt-4 cursor-pointer border-spacing-px bg-primary hover:bg-primaryDarker border-opacity-0 tracking-wide py-3 px-11 text-white transition-all duration-[0.5s] ease-[ease-in-out]">
                Entrar
              </button>
              
            </form>
          </div>

          <div className="absolute top-0 w-6/12 h-full overflow-hidden left-2/4">
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
                className="absolute opacity-10" />
            </div>
          </div>
          
        </div>
        
      </div>
    );
  };
// };
export default Login;

