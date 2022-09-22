import React, { ReactElement } from 'react'

interface Props{
  icon: ReactElement,
  header: string,
  text: string,
}

const Card: React.FC<Props> = ({ icon, header, text}) => {
  return (
    <div className='w-full px-2 border-slate-200 border my-3 p-4'>
      <div className='py-2'>{icon}</div>
      <h3 className='py-3'>{header}</h3>
      <p className='capitalize text-sm my-1'>{text}</p>
    </div>
  )
}

export default Card