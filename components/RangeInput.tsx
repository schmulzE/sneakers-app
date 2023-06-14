import React, {useState, Dispatch, useEffect} from 'react'
import style from '../styles/RangeInput.module.css'

type Props = {
  initialMin: number,
  initialMax: number,
  min: number,
  max: number,
  step: number,
  priceCap: number,
  setFiltered: Dispatch<any>,
  fetchedData: any[]
}
const RangeInput: React.FC<Props> = ({ initialMin, initialMax, min, max, step, priceCap, setFiltered, fetchedData }) => {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

   useEffect(() => {
     setFiltered(previousState => {
      const filters = new Set(previousState.filters)
      const filterPrice = previousState.products.filter(item => item.priceInfo?.finalPrice > minValue && item.priceInfo?.finalPrice < maxValue)
      const products = filterPrice
      return {
        products,
        filters
      }
    })
  }, [fetchedData, maxValue, minValue, setFiltered])

  const handleMin = (e: { target: { value: string; }; }) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > maxValue) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e: { target: { value: string; }; }) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < minValue) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };
  
  return (
    <>
      <div className='text-center my-6 lg:my-0'>
        <input type="text" value={`$${minValue.toLocaleString()}`} className="w-24 border p-3 m-1"  readOnly/>
        <input type="text" value={`$${maxValue.toLocaleString()}`} className="w-24 border p-3 m-1" readOnly/>
      </div>
      <span className={`style['multi-range'] lg:w-[150px]`}>
        <input type="range" min={min} max={max} step={step} value={minValue} id="lower" onChange={handleMin} readOnly/>
        <input type="range" min={min} max={max}  step={step} value={maxValue} id="upper" onChange={handleMax} readOnly/>
      </span>
    </>
  )
}

export default RangeInput