import ProfilesParams from '@/app/components/ProfilesParams';
import InputSearch from '@/app/search/components/InputSearch';
import React from 'react';

const SearchParams = async ({ params }: { params: { categoria: string, uf: string, cidade: string } }) => {

  return (
    <>
      <div className='mx-[5%]'>
        <InputSearch />

        <ProfilesParams 
        categoria={params.categoria}
        cidade={params.cidade}
        uf={params.uf}/>

      </div>
    </>
  );
};

export default SearchParams;