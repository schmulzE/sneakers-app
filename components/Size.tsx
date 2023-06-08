import React from 'react'

type Props = {
  image: string
}

const Size:React.FC<Props> = ({image}) => {
  return (
    <div className='grid grid-cols-2 gap-15'>
    <div id="section-1">
      <div className="grid grid-cols-2 gap-1 w-80 my-5">
        <h3 className="capitalize font-medium">measurements</h3>
        <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
          <input type="checkbox" value="" id="default-toggle" className="sr-only peer"/>
          <div className="w-11 h-6 bg-neutral-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-neutral-900"></div>
          <span className="ml-3 text-sm font-medium text-gray-900">cm --&gt; in</span>
        </label>
      </div>
      <p className="xl:text-lg">Product measurements for size (IT)</p>
      <button className='border-2 border-neutral-900 cursor-pointer py-2 px-6 mt-3 mb-2'>43</button>
      <div className="grid grid-cols-2 gap-1 w-80 my-5">
        <p className="text-lg">height </p>
        <p className='ml-1'>4cm</p>
        <p className="text-lg">Sole height  </p>
        <p className='ml-1'>3cm</p>
      </div>
      <p className="text-lg">Still need help? <span className='underline'>Try our size guide</span></p>
    </div>

      <img src={image} alt="" className='justify-self-end self-end hidden xl:block'/>
    </div>
  )
}

export default Size