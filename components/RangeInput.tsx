import React, {useState, useRef} from 'react'
import style from '../styles/RangeInput.module.css'

const RangeInput = () => {
  const [lowerSlider, setLowerSlider] = useState(5)
  const [upperSlider, setUpperSlider] = useState(45)
  const lowerSliderRef = useRef(null)
  const upperSliderRef = useRef(null)

  console.log(lowerSliderRef.current)

    const upperSliderHandler = () => {
    //    lowerVal = parseInt(lowerSlider.value);
    //    upperVal = parseInt(upperSlider.value);

    //    if (upperVal < lowerVal + 4) {
    //       lowerSlider.value = upperVal - 4;

    //       if (lowerVal == lowerSlider.min) {
    //          upperSlider.value = 4;
    //       }
    //    }
    };

    const lowerSliderHandler = () => {
      //  if (lowerSlider > upperSlider - 4) {
          // upperSlider.value = lowerVal + 4;

          // if (upperSlider == upperSlider.max) {
          //    lowerSlider.value = parseInt(upperSlider.max) - 4;
          // }
      //  }
    };

  return (
    <>
      <div className='text-center my-6'>
        <input type="number" value={lowerSlider} min="0" max="120000"/>to
        <input type="number" value={upperSlider} min="0" max="120000"/>
      </div>
      <span className={style['multi-range']}>
        <input type="range" min="0" max="50" ref={lowerSliderRef} value={lowerSlider} id="lower" onChange={lowerSliderHandler} readOnly/>
        <input type="range" min="0" max="50"  ref={upperSliderRef} value={upperSlider} id="upper" onChange={upperSliderHandler} readOnly/>
      </span>
    </>
  )
}

export default RangeInput