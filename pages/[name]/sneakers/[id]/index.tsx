import React, { Component, useState, useEffect } from 'react';
import Slider from "react-slick";
import { useRouter } from 'next/router';

export class SimpleSlider extends Component< {images: string[]}> {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
         {this.props.images.map( (item, index) => (
          <div key={index}>
            <img src={item} alt=''/>
          </div>
         ))}
        </Slider>
      </div>
    );
  }
}

const Sneaker = () => {
  
  const router = useRouter();
  const { images }  = router.query;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState: string[]  = []
  const [imageArr, setImageArr] = useState(initialState)

   useEffect(() => {
    const wishlistData = JSON.parse(localStorage.getItem("images")!);
    if (wishlistData) {
      setImageArr(wishlistData);
    }
  }, []);

  useEffect(() => {
    if (imageArr !== initialState) {
      localStorage.setItem("images", images as string);
    }
  }, [imageArr, images, initialState]);

  console.log(imageArr)


  return (
    <>
      <SimpleSlider images={imageArr}/>
    </>
  )
}

export default Sneaker