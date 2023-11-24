"use client"

import * as React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

import Button from '@/components/Button';
import PricingItems from './components/PricingItems';
import PlanCard from './components/PlanCard';
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
    <>
      <div className='flex flex-col 2sm:flex-row gap-12 justify-center items-center h-full p-8'>
        <PlanCard 
          className='2sm:hover:drop-shadow-[25px_25px_5px_rgba(102,102,102,0.3)] 2sm:hover:scale-[1.03] transition-all duration-[0.4s] ease-[ease-in-out] hover:transition-all hover:duration-[0.4s] hover:ease-[ease-in-out]'
        
          tipo_plano='Anualmente'
          valor='R$200'
          texto='Melhor opção para profissionais requisitados!'
          
          corFundo1='from-whiteBGDarker'
          corFundo2='to-grayPrimary'

          corTexto='text-white'
          corSubTexto='text-gray-200'
          
          item1={<PricingItems name='Boost nas buscas.' />}
          item2={<PricingItems name='Acesso ao Dashboard.' />}
          item3={<PricingItems name='Personalização completa do perfil.' />}
        />

        <PlanCard
          className='2sm:hover:drop-shadow-[25px_25px_5px_rgba(102,102,102,0.3)] 2sm:hover:scale-[1.03] transition-all duration-[0.4s] ease-[ease-in-out] hover:transition-all hover:duration-[0.4s] hover:ease-[ease-in-out]'
        
          tipo_plano='Mensalmente'
          valor='R$25'
          texto='Bom para os que estão começando!'

          corFundo1='from-primary'
          corFundo2='to-primaryDarker'

          corTexto='text-white'
          corSubTexto='text-gray-200'

          item1={<PricingItems name='Boost nas buscas.' />}
          item2={<PricingItems name='Acesso ao Dashboard.' />}
          item3={''}
        />
      </div>
    </>
  );
};
// };
export default PagamentoPlano;

