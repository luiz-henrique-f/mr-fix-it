import React from 'react';

interface CategoryItemsProps {
    items: string
}

const CategoryItems = ({items}: CategoryItemsProps) => {
    
    return (
        <div>
            <p className='flex justify-center font-semibold bg-primary/70 text-white text-sm py-2 px-3 rounded-md'>{items}</p>
        </div>
    )
}

export default CategoryItems