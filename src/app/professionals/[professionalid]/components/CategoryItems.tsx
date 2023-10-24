import React from 'react';

interface CategoryItemsProps {
    items: string
}

const CategoryItems = ({items}: CategoryItemsProps) => {
    
    return (
        <div>
            <p className='flex justify-center font-semibold bg-primary/70 hover:bg-primaryDarker hover:cursor-pointer text-white text-sm py-2 px-3 rounded-md'>{items}</p>
        </div>
    )
}

export default CategoryItems