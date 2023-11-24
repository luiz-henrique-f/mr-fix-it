import React from 'react';
import Link from 'next/link';

import PlanCard from '../pagamentoPlano/components/PlanCard';
import PricingItems from '../pagamentoPlano/components/PricingItems';

const PricesPage = () => {
  return (
    <>
      <svg 
        className='-mt-32'
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320">
        <path 
          fill="#312A4F" 
          fill-opacity="1" 
          d="M0,64L80,58.7C160,53,320,43,480,58.7C640,75,800,117,960,112C1120,107,1280,53,1360,26.7L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
          </path>
      </svg>
    
      <div className='flex flex-col justify-center items-center h-screen bg-primaryDarker -mt-48'>
      
        <h1 className='font-bold m-6 text-xl uppercase'>Nossos Planos</h1>
        <p>Escolha o melhor plano para você!!</p>

        <div className='flex mt-12 drop-shadow-[25px_25px_10px_rgba(200,200,200,0.2)]'>
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