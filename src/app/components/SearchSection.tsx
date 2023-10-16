import Button from '@/components/Button'
import Input from '@/components/Input'
import React from 'react'

const SearchSection = () => {
    return (
        <div className="container flex justify-center items-center flex-col mx-auto p-5 h-[calc(100vh-93px)] bg-none 2sm:bg-search-background 2sm:dark:bg-search-background-dark bg-contain bg-center bg-no-repeat bg-transparent">
            <div className='-mt-[10%] w-full'>
                <h1 className='font-semibold text-3xl 2sm:text-4xl text-gray-800 dark:text-gray-300 text-center p-3'>A maneira mais fácil de encontrar um profissional <span className='text-primary'>capacitado</span>!</h1>
                <p className='text-gray-600 dark:text-gray-400 text-sm 2sm:text-xl text-center p-3 mb-6'>Conheça de forma gratuita os profissionais melhor avaliados!</p>

                <div className="flex flex-col 2md:flex-row gap-5">
                    <Input placeholder='Qual serviço você precisa?' className='py-3 border-none px-4'/>

                    <select name="regiao" className='w-full 2md:w-2/3 border-none rounded-lg py-3 px-4 bg-white dark:bg-white dark:text-primaryDarker text-primaryDarker' >
                        <option value="">Todos os estados</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="SP">São Paulo</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="SC">Santa Catarina</option>
                    </select>

                    <select name="categoria" className='w-full 2md:w-2/6 border-none rounded-lg py-3 px-4 bg-white dark:bg-white dark:text-primaryDarker text-primaryDarker'>
                        <option value="">Categorias</option>

                        <optgroup label="Reparos">
                            <option value="#">Pintor</option>
                            <option value="#">Eletricista</option>
                            <option value="#">Carpinteiro</option>
                        </optgroup>
                    </select>

                    <Button className='p-3' />
                </div>
            </div>
        </div>
    )
}

export default SearchSection