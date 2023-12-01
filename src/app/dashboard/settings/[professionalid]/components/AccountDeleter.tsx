import React from 'react';

import Button from '@/components/Button';

import { FaTrashCan } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";

const AccountDeleter = () => {
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

        <div className="flex justify-evenly items-center w-full">
          <Button variant='outlined'>
            <ImCancelCircle />
            Cancelar
          </Button>

          <Button variant='primary'>
            <FaRegCheckCircle />
            Concluir
          </Button>
        </div>

      </div>
    </>
  );
};

export default AccountDeleter;