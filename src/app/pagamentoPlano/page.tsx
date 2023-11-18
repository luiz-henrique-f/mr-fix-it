"use client"

import * as React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

import Button from '@/components/Button';
import PricingItems from './components/PricingItems';
// import CardContainer from './components/PricingCardContainer';

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
    <div className='flex flex-col 2sm:flex-row gap-12 justify-center items-center h-full p-8'>
      <div className='flex flex-col bg-gradient-to-b from-whiteBGDarker to-grayPrimary p-10 rounded-md h-[580px] scale-[0.9] 2sm:scale-100 w-[320px] 3xl:w-1/5 gap-2 2sm:hover:drop-shadow-[25px_25px_5px_rgba(102,102,102,0.3)] 2sm:hover:scale-[1.03] transition-all duration-[0.4s] ease-[ease-in-out] hover:transition-all hover:duration-[0.4s] hover:ease-[ease-in-out]'>
        <p className='text-left text-white uppercase font-medium text-lg py-2'>Platina</p>

        <div className='text-left flex flex-row items-baseline gap-2'>
          <h1 className='font-bold text-white text-5xl -mt-2'>R$200</h1>
          <span className='text-gray-200 text-lg font-medium -tracking-wider'>Anualmente</span>  
        </div>

        <p className='text-sm text-gray-300 font-medium -tracking-wider pb-8 border-b-2 border-solid border-gray-300/30'>Melhor opção para profissionais requisitados!</p>

        <div className='relative flex flex-col h-full'>
          <div className='flex flex-col pt-5 text-gray-300 -tracking-wide font-semibold gap-4'>
            <PricingItems name='Boost nas buscas.' />
            <PricingItems name='Acesso ao Dashboard.' />
            <PricingItems name='Personalização completa do perfil.' />
          </div>
          
          <Button
            variant='primary'
            className='absolute bottom-0 w-full py-3 normal-case text-base'
            onClick={() => handleBuyClick(5, 'Plano Anual', 12, 'A')}>
            Escolher Plano
          </Button>
        </div>
      </div>


      <div className='flex flex-col bg-gradient-to-b from-primary to-primaryDarker p-10 rounded-md h-[580px] scale-[0.9] 2sm:scale-100 w-[320px] 3xl:w-1/5 gap-2 2sm:hover:drop-shadow-[25px_25px_5px_rgba(102,102,102,0.3)] 2sm:hover:scale-[1.03] transition-all duration-[0.4s] ease-[ease-in-out] hover:transition-all hover:duration-[0.4s] hover:ease-[ease-in-out]]'>
        <p className='text-left text-white uppercase font-medium text-lg py-2'>Ametista</p>

        <div className='text-left flex flex-row items-baseline gap-2'>
          <h1 className='font-bold text-white text-5xl -mt-2'>R$25</h1>
          <span className='text-gray-200 text-lg font-medium -tracking-wider'>Mensalmente</span>  
        </div>

        <p className='text-sm text-gray-300 font-medium -tracking-wider pb-8 border-b-2 border-solid border-gray-300/30'>Bom para os que estão começando!</p>

        <div className='relative flex flex-col h-full'>
          <div className='flex flex-col pt-5 text-gray-300 -tracking-wide font-semibold gap-4'>
            <PricingItems name='Boost nas buscas.' />
            <PricingItems name='Acesso ao Dashboard.' />
          </div>
          
          <Button
            variant='primary'
            className='absolute bottom-0 w-full py-3 normal-case text-base bg-primaryLighter hover:bg-primary'
            onClick={() => handleBuyClick(5, 'Plano Mensal', 1, 'M')}>
            Escolher Plano
          </Button>
        </div>
      </div>

    </div>
  );
};
// };
export default PagamentoPlano;

