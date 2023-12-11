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

  const getDateNow = () => {
    const date = new Date()

    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    return `${day}/${month}/${year}`;
  }

  const getDates = (typePlan: String, numberMonths: number) => {
    const date = new Date()

    let day = date.getDate()
    let month = typePlan != 'A' ? date.getMonth() + numberMonths > 12 ? date.getMonth() + numberMonths - 12 : date.getMonth() + numberMonths : date.getMonth()
    let year = typePlan == 'A' && numberMonths == 12 ? date.getFullYear() + 1 : date.getMonth() + numberMonths > 12 ? date.getFullYear() + 1 : date.getFullYear()

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
          startDate: getDateNow(),
          endDate: getDates(planoType, months),
          planoType: planoType
        })
      ),
    });

    const { sessionId } = await res.json();

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <>
      <div className='flex flex-col 2sm:flex-row gap-12 justify-center items-center h-full p-8'>
        <div className='flex flex-col lg:flex-row mt-12 drop-shadow-[0px_25px_30px_rgba(244,244,244,0.3)] dark:drop-shadow-[0px_25px_30px_rgba(200,200,200,0.2)]'>
          <PlanCard
            className="scale-[.85] 2sm:scale-900 lg:scale-100"

            tipo_plano='Mensal'
            valor='R$25'
            texto='Bom para os que estão começando!'

            corFundo1='from-white'
            corFundo2='to-gray-300'

            corTexto='text-black'
            corSubTexto='text-gray-400'

            item1={<PricingItems name='Boost nas buscas.' color='text-primary' />}
            item2={<PricingItems name='Acesso ao Dashboard.' color='text-primary' />}
            item3={<PricingItems name='Personalização completa do perfil.' color='text-primary' />}
          >
            <Button
              variant='primary'
              className='absolute bottom-0 w-full py-3 normal-case text-base'
              onClick={() => handleBuyClick(25, 'Plano Mensal', 1, 'M')}
            >
              Escolher Plano
            </Button>

          </PlanCard>

          <PlanCard
            className="scale-95 2sm:scale-100 lg:scale-110 -my-32 2sm:-my-14 lg:my-0 z-50"

            tipo_plano='Anual'
            valor='R$200'
            texto='Melhor opção para profissionais requisitados!'

            corFundo1='from-primaryLighter'
            corFundo2='to-primary'

            corTexto='text-white'
            corSubTexto='text-gray-200'

            item1={<PricingItems name='Boost nas buscas.' color='text-white' />}
            item2={<PricingItems name='Acesso ao Dashboard.' color='text-white' />}
            item3={<PricingItems name='Personalização completa do perfil.' color='text-white' />}
          >
            <Button
              variant='primaryLight'
              className='absolute bottom-0 w-full py-3 normal-case text-base'
              onClick={() => handleBuyClick(200, 'Plano Anual', 12, 'A')}
            >
              Escolher Plano
            </Button>

            {/* onClick={() => handleBuyClick(5, 'Plano Anual', 12, 'A') } */}
          </PlanCard>

          <PlanCard
            className="scale-[.85] 2sm:scale-90 lg:scale-100"

            tipo_plano='Semestral'
            valor='R$110'
            texto='Para aqueles que preferem esquecer o plano!'

            corFundo1='from-white'
            corFundo2='to-gray-300'

            corTexto='text-black'
            corSubTexto='text-gray-400'

            item1={<PricingItems name='Boost nas buscas.' color='text-primary' />}
            item2={<PricingItems name='Acesso ao Dashboard.' color='text-primary' />}
            item3={<PricingItems name='Personalização completa do perfil.' color='text-primary' />}
          >
            <Button
              variant='primary'
              className='absolute bottom-0 w-full py-3 normal-case text-base'
              onClick={() => handleBuyClick(110, 'Plano Semestral', 6, 'S')}
            >
              Escolher Plano
            </Button>
          </PlanCard>
        </div>
      </div >
    </>
  );
};

export default PagamentoPlano;

