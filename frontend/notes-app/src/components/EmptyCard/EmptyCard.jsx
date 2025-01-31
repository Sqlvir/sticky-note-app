import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className='flex flex-col items-center justify-center emptycards'>
      <img src={imgSrc} alt="No notes" className='notes-img' />

      <p className='w-1/2 text-xl font-small text-slate-600 text-center leading-7'>
         {message}
      </p>
    </div>
  )
}

export default EmptyCard
