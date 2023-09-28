"use client"

import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation'

const Login = () => {
  // function handleLoginClick()  {
  //   return <Link href="/"></Link>
  // }

  const handleLoginClick = () => signIn();

  const { status, data } = useSession();
  // const router = useRouter();

  // {status == 'authenticated' && <Link href={'/'}></Link>}

    if(status == 'authenticated'){
      return redirect('/')
    }

    if(status == 'unauthenticated'){

  return (
    <div className="flex items-center justify-center flex-col bg-neutral-200 dark:bg-zinc-800 transition-all duration-[0.3s] ease-[ease-in-out]">
      <div className="rounded-3xl overflow-hidden w-full bg-white dark:bg-zinc-500 h-[37rem] shadow-lg shadow-gray-400 dark:border-solid dark:border dark:border-gray-600 dark:shadow-none">

        <div className="absolute top-0 h-full left-0 w-6/12">

          <div className="absolute top-8">
            <Link
              href="/"
<<<<<<< Updated upstream
              className="text-base flex items-center justify-center ml-8 gap-3 font-bold hover:text-primary">
=======
              className="text-base flex items-center justify-center ml-8 gap-3 text-zinc-700 font-bold hover:text-purple-600">
>>>>>>> Stashed changes
              <IoIosArrowBack /> Página Inicial
            </Link>
          </div>

<<<<<<< Updated upstream
          <form className="h-full flex items-center justify-center flex-col py-0 px-10 bg-white dark:bg-zinc-800/40">
            <h1 className="text-4xl pb-2 font-semibold">Entre com</h1>

            <div className="pb-5 my-5 mx-0">
              <a
                href="#"
                className="inline-flex justify-center items-center rounded-2xl my-0 mx-3 gap-2 border border-gray-200 p-4 hover:bg-gray-200/60 transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]">
=======
          <form className="h-full flex items-center justify-center text-primaryDarker flex-col py-0 px-10 bg-white dark:bg-[#000000aa]">
            <h1 className="text-4xl pb-2 font-semibold">Entre com</h1>

            <div className="pb-5 my-5 mx-0">
              <button
                className="inline-flex justify-center text-primaryDarker items-center rounded-2xl my-0 mx-3 gap-2 border border-gray-200 p-4"
                onClick={handleLoginClick}
                >
>>>>>>> Stashed changes
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

            <div className="flex gap-5 text-xs no-underline text-gray-400 mx-0 my-1">
              <Link href="#" className="hover:text-blue-700">
                Esqueci minha senha
              </Link>
              
              <span>|</span>
              
              <Link href="#" className="hover:text-blue-700">
                Não tem conta? <span className="underline">Cadastre-se</span>
              </Link>
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
}
}
export default Login;