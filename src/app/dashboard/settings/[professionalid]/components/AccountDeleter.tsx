'use client'

import React from 'react';

import Button from '@/components/Button';

import { FaTrashCan } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { signIn, signOut, useSession } from "next-auth/react";

const AccountDeleter = () => {

  const { data } = useSession();

  const router = useRouter();

  const onSubmit = async () => {

    const res = await fetch(`/deleteUser/${(data?.user as any)?.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return toast.error("Ocorreu um erro ao cancelar a reserva!");
    }

    signOut({ redirect: false }).then(() => {
      router.push("/"); // Redirect to the dashboard page after signing out
  })

  }

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-transparent gap-6">

        <div className="text-center flex flex-col items-center justify-center gap-2">
          <FaTrashCan className='text-7xl text-gray-600' />

          <h2 className="text-2xl font-bold text-black dark:text-white">
            Deseja excluir a conta?
          </h2>

          <p className="text-grayPrimary dark:text-grayLighter">
            Você realmente quer deletar sua conta? <br /> Esse processo não pode ser desfeito.
          </p>
        </div>

        <Button variant='primary'
        onClick={() => onSubmit()}>
          {/* <FaRegCheckCircle /> */}
          Excluir
        </Button>

      </div>
    </>
  );
};

export default AccountDeleter;