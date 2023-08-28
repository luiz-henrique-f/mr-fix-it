import Button from '@/components/Button'
import Input from '@/components/Input'
import React from 'react'

const SearchSection = () => {
    return (
        <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
            <h1 className='font-semibold text-2xl text-primaryDarker text-center dark:bg-yellow-700'>Encontre o serviço que <span className='text-primary'>precisa!</span></h1>

            <div className="flex">
                <Input placeholder='Qual serviço você precisa?'/>

                <Button />
            </div>
        </div>
    )
}

export default SearchSection