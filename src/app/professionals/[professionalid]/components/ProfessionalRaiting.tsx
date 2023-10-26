import React from 'react';
import BasicRating from './Raiting';
import { AiFillStar } from 'react-icons/ai'

interface ProfessionalRaitingUsersProps {
  name: string
  title: string
  message: string
}

const ProfessionalRaiting = ({name, title, message}: ProfessionalRaitingUsersProps) => {
  return (
    <div className='gap-2 border border-solid border-grayPrimary/20 shadow-xl p-5 rounded-md'>
      <h2 className='text-base pl-1 font-medium text-grayPrimary dark:text-grayLighter italic'>{name}</h2>
      <BasicRating />

      <h3 className='text-lg font-bold text-primaryDarker dark:text-white my-2'>{title}</h3>
      <p className='text-primaryDarker dark:text-white'>{message}</p>
    </div>
  )
}

export default ProfessionalRaiting