import React from 'react';
import Link from 'next/link';

import PlanCard from '../pagamentoPlano/components/PlanCard';
import PricingItems from '../pagamentoPlano/components/PricingItems';

const PricesPage = () => {
  return (
    <>
      <div>
        <svg 
          className='-mt-32'
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320">
          <path 
            fill="#312A4F" 
            fill-opacity="1" 
            d="M0,96L80,122.7C160,149,320,203,480,208C640,213,800,171,960,149.3C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
          </path>
        </svg>
      
        <div className='flex flex-col justify-center items-center h-screen bg-primaryDarker -mt-24'>
        
          <div className='text-whiteBGDarker font-bold m-6 flex items-center justify-center gap-6 flex-col'>
            <h1 className='text-5xl uppercase tracking-widest'>Nossos Planos</h1>
            <p className='text-xl tracking-tight'>Escolha o melhor plano para você!!</p>
          </div>

          <div className='flex mt-12 drop-shadow-[0px_25px_30px_rgba(244,244,244,0.3)] dark:drop-shadow-[0px_25px_30px_rgba(200,200,200,0.2)]'>
            <PlanCard 
              className=""
            
              tipo_plano=''
              valor='R$0'
              texto='Para clientes que somente querem pesquisar profissionais!'

              corFundo1='from-white'
              corFundo2='to-gray-300'
              
              corTexto='text-black'
              corSubTexto='text-gray-400'

              item1={<PricingItems name='Busque profissionais por categoria!' color='text-primary' />}
              item2={<PricingItems name='Veja as avaliações do Profissional' color='text-primary' />}
              item3={''}

              link=''
            />

            <PlanCard 
              className="scale-110 my-1 z-50"
            
              tipo_plano='Mensalmente'
              valor='R$25'
              texto='Bom para os que estão começando!'
              
              corFundo1='from-primaryLighter'
              corFundo2='to-primary'

              corTexto='text-white'
              corSubTexto='text-gray-200'
              
              item1={<PricingItems name='Boost nas buscas.' color='text-white' />}
              item2={<PricingItems name='Acesso ao Dashboard.' color='text-white' />}
              item3={''}

              link=''
            />

            <PlanCard 
              className=""

              tipo_plano='Anualmente'
              valor='R$200'
              texto='Melhor opção para profissionais requisitados!'
              
              corFundo1='from-white'
              corFundo2='to-gray-300'

              corTexto='text-black'
              corSubTexto='text-gray-400'

              item1={<PricingItems name='Boost nas buscas.' color='text-primary' />}
              item2={<PricingItems name='Acesso ao Dashboard.' color='text-primary' />}
              item3={<PricingItems name='Personalização completa do perfil.' color='text-primary' />}

              link=''
            />
          </div>
        </div>

        <svg
          className='-mt-16'
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320">
          <path 
            fill="#312A4F" 
            fill-opacity="1" 
            d="M0,96L120,122.7C240,149,480,203,720,218.7C960,235,1200,213,1320,202.7L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z">
          </path>
        </svg>
      </div>
    </>
  );
};

export default PricesPage;