import React from 'react';

import PlanCard from '../pagamentoPlano/components/PlanCard';
import PricingItems from '../pagamentoPlano/components/PricingItems';

const PricesSection = () => {

  return (
    <>
      <div className='h-full'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320">

          <path
            fill="#312A4F"
            fillOpacity="1"
            d="M0,96L80,122.7C160,149,320,203,480,208C640,213,800,171,960,149.3C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
          </path>
        </svg>

        <div className='flex flex-col justify-center items-center bg-primaryDarker -my-1'>

          <div className='text-whiteBGDarker font-bold m-6 mb-0 lg:mb-6 flex items-center justify-center gap-6 flex-col'>
            <h1 className='text-center text-5xl uppercase tracking-widest bg-gradient-to-r from-primaryLighter to-secondary bg-clip-text text-transparent'>Nossos Planos</h1>
            <p className='text-base text-center lg:text-xl tracking-tight'>Escolha o melhor plano para você!!</p>
          </div>

          <div className='flex flex-col lg:flex-row mt-12 drop-shadow-[0px_100px_90px_rgba(255,255,255,0.3)] dark:drop-shadow-[0px_100px_90px_rgba(200,200,200,0.2)]'>

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

            </PlanCard>

          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 225">

          <path
            fill="#312A4F"
            fillOpacity="1"
            d="M0,96L120,122.7C240,149,480,203,720,218.7C960,235,1200,213,1320,202.7L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z">
          </path>
        </svg>

      </div>
    </>
  );
};

export default PricesSection;