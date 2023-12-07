import React from 'react';

import UsersCard from './components/UsersCard';

const AdminPage = () => {

  return (
    <>
      <div className='overflow-y-scroll h-[calc(100dvh-190px)] mt-6 mx-4'>
        <UsersCard />
      </div>
    </>
  );
};

export default AdminPage;