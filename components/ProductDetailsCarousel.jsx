import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { urlFor } from '../sanity';

const ProductDetailsCarousel = ({ shoe }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        <img src={urlFor(shoe.mainImage).url()} alt='shoe image' />
        {shoe.images.map((item) => (
          <img key={item._key} src={urlFor(item).url()} alt='shoe image' />
        ))}
      </Carousel>
    </div>
  )
}

export default ProductDetailsCarousel