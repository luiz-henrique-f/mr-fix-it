"use client"

import Button from '@/components/Button';
import * as React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { signIn, signOut, useSession } from "next-auth/react";


const PagamentoPlano = () => {

  const { data } = useSession();

  const getDates = (typeRet: String, numberMonths: number) => {
    const date = new Date()

    let day = date.getDate()
    let month = typeRet == 'endDate' && numberMonths == 1 ? date.getMonth() + numberMonths : date.getMonth() 
    let year = typeRet == 'endDate' && numberMonths == 12 ? date.getFullYear() + 1 : date.getFullYear()
    
    return `${day}/${month}/${year}`;
  }
  

  const handleBuyClick = async (price: Number, name: String, months: number, planoType: String) => {
    const res = await fetch("/payment", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          price: price,
          userId: (data?.user as any)?.id,
          name: name,
          startDate: getDates('startDate', 0),
          endDate: getDates('endDate', months),
          planoType: planoType
        })
      ),
    });

    // if (!res.ok) {
    //   return toast.error("Ocorreu um erro ao realizar a reserva!", { position: "bottom-center" });
    // }

    // const response = await res.json();

    // console.log({ response })

    const { sessionId } = await res.json();

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

    await stripe?.redirectToCheckout({ sessionId });

    // toast.success("Reserva realizada com sucesso!", { position: "bottom-center" });
  };

  return (
    <div className='flex gap-3 justify-center items-center align-middle h-96'>
      <button 
      onClick={() =>  handleBuyClick(5, 'Plano Anual', 12, 'A')} 
      className="flex text-black dark:text-white items-center justify-center py-2 px-4 gap-2 text-sm uppercase bg-transparent font-semibold border-2 border-solid border-black/50 dark:border-white/70 rounded-md hover:bg-primary hover:border-primary dark:hover:border-primary hover:text-white transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]">
        Plano Anual
      </button>
      <button 
      onClick={() =>  handleBuyClick(5, 'Plano Mensal', 1, 'M')} 
      className="flex text-black dark:text-white items-center justify-center py-2 px-4 gap-2 text-sm uppercase bg-transparent font-semibold border-2 border-solid border-black/50 dark:border-white/70 rounded-md hover:bg-primary hover:border-primary dark:hover:border-primary hover:text-white transition-all duration-[0.3s] ease-[ease-in-out] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in-out]">
        Plano mensal
      </button>
    </div>
  );
};
// };
export default PagamentoPlano;

