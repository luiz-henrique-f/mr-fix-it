import React from 'react';
import Link from 'next/link';

import PlanCard from '../pagamentoPlano/components/PlanCard';
import PricingItems from '../pagamentoPlano/components/PricingItems';

const PricesPage = () => {
  return (
    <>
     <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='font-bold m-6 text-xl uppercase'>Nossos Planos</h1>
        <p>Escolha o melhor plano para você!!</p>

        <div className='flex mt-12 drop-shadow-[25px_25px_5px_rgba(102,102,102,0.3)]'>
          <PlanCard 
            className="2sm:hover:drop-shadow-none"
          
            tipo_plano=''
            valor='R$0'
            texto='Para clientes que somente querem pesquisar profissionais!'

            corFundo1='from-white'
            corFundo2='to-gray-300'
            
            corTexto='text-black'
            corSubTexto='text-gray-400'

            item1={<PricingItems name='Busque profissionais por categoria!' />}
            item2={<PricingItems name='Veja as avaliações do Profissional' />}
            item3={''}
          />

          <PlanCard 
            className="scale-110 my-1 z-50"
          
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

          <PlanCard 
            className="2sm:hover:drop-shadow-none"

            tipo_plano='Anualmente'
            valor='R$200'
            texto='Melhor opção para profissionais requisitados!'
            
            corFundo1='from-white'
            corFundo2='to-gray-300'

            corTexto='text-black'
            corSubTexto='text-gray-400'

            item1={<PricingItems name='Boost nas buscas.' />}
            item2={<PricingItems name='Acesso ao Dashboard.' />}
            item3={<PricingItems name='Personalização completa do perfil.' />}
          />
        </div>
      </div>
    </>
  );
};

export default PricesPage;