import React from 'react';
import { BsCheck2Circle } from 'react-icons/bs'

interface PricingItemsProps {
  name: string;
  color: string;
}

const PricingItems = ({name, color}: PricingItemsProps) => {
  return (
    <div className='flex justify-start items-center flex-row gap-2'>
      <BsCheck2Circle className={`${color} text-xl`} />
      {name}
    </div>
  )
}

export default PricingItems