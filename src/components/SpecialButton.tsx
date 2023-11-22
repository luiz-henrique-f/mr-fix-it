import React from 'react'

const SpecialButton = () => {
  return (
    <>
      <div className='flex items-center justify-center scale-110'>
        <button
          className="overflow-hidden relative w-36 p-2 h-12 bg-primaryLighter text-white border-none rounded-md text-lg font-bold cursor-pointer z-10 group">
          Pesquise
          
          <span
            className="absolute w-40 h-32 -top-8 -left-2 bg-white/10 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
          >
          </span>

          <span
            className="absolute w-40 h-32 -top-8 -left-2 bg-purple-300/80 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-[600ms] duration-[800ms] origin-left"
          >
          </span>

          <span
            className="absolute w-40 h-32 -top-8 -left-2 bg-purple-500/80 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
          >
          </span>
          <span

            className="absolute w-40 h-32 -top-8 -left-2 bg-purple-700/80 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-[800ms] duration-[600ms] origin-left"
          >
          </span>

          <span
            className="absolute w-40 h-32 -top-8 -left-2 bg-primary rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"
          >
          </span>

          <span
            className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-[30px] z-10">
            Descubra!
          </span>
        </button>
      </div>
    </>
  )
}

export default SpecialButton