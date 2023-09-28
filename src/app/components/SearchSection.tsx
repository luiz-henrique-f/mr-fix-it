import Button from '@/components/Button'
import Input from '@/components/Input'
import React from 'react'

const SearchSection = () => {
    return (
        <div className="container flex justify-center flex-col mx-auto p-5 bg-search-background dark:bg-search-background bg-contain bg-no-repeat dark:bg-zinc-800 md:h-[450px] h-[43.75rem]"> {/* LEMBRAR DE TIRAR O HEIGHT FIXO */}
            <div>
                <h1 className='font-semibold text-4xl text-gray-800 dark:text-gray-300 text-center p-3'>A maneira mais fácil de encontrar um profissional <span className='text-primary'>capacitado</span>!</h1>
                <p className='text-gray-600 dark:text-gray-400 text-xl text-center p-3 mb-6'>Conheça de forma gratuita os profissionais melhor avaliados!</p>

                <div className="flex gap-5">
                    <Input placeholder='Qual serviço você precisa?' className='py-3 border-none px-4'/>

                    <select name="regiao" className='w-2/3 border-none rounded-lg px-4 dark:bg-white dark:text-black' >
                        <option value="">Todos os estados</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="SP">São Paulo</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="SC">Santa Catarina</option>
                    </select>

                    <select name="categoria" className='w-2/6 border-none rounded-lg px-4 dark:bg-white dark:text-black'>
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