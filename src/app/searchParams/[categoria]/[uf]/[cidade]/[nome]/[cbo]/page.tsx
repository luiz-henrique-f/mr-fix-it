import ProfilesParams from '@/app/components/ProfilesParams';
import InputSearch from '@/app/search/components/InputSearch';
import React from 'react';

const SearchParams = async ({ params }: { params: { categoria: string, uf: string, cidade: string, nome: string, cbo: string } }) => {

  return (
    <>
      <div className='mx-[5%]'>
        <InputSearch />

        <ProfilesParams 
          categoria={params.categoria}
          cidade={params.cidade}
          uf={params.uf}
          nome={params.nome}
          cbo={params.cbo}
        />

      </div>
    </>
  );
};

export default SearchParams;