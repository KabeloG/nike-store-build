import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { BiArrowBack } from 'react-icons/bi';

const HeroBanner = () => {
  return (
    <div className='relative text-white text-[20px] w-full max-w-[1360px] mx-auto'>
      <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        showIndicators={false}
        showArrows={false} 
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className='absolute right-[31px] md:right-[51px] bottom-0
            w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10
            flex items-center justify-center cursor-pointer hover:opacity-90'
          >
            <BiArrowBack className='text-sm md:text-lg' />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
            <div
              onClick={clickHandler}
              className='absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] 
              md:h-[50px] bg-black z-10 flex items-center justify-center 
              cursor-pointer hover:opacity-90'
            >
              <BiArrowBack className='rotate-180 text-sm md:text-lg' />
            </div>
          )}
      >
        <div>
          <img src='./assets/slide-1.png' />
          <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] absolute 
          bottom-[25px] left-0 bg-white text-black/[0.9] font-oswald text-[15px] 
          md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90
          transition-opacity ease-in-out duration-300'>
            Shop now
          </div>
        </div>

        <div>
          <img src='./assets/slide-2.png' />
          <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] absolute 
          bottom-[25px] left-0 bg-white text-black/[0.9] font-oswald text-[15px] 
          md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90
          transition-opacity ease-in-out duration-300'>
            Shop now
          </div>
        </div>

        <div>
          <img src='./assets/slide-3.png' />
          <div className='px-[15px] md:px-[40px] py-[10px] md:py-[25px] absolute 
          bottom-[25px] left-0 bg-white text-black/[0.9] font-oswald text-[15px] 
          md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90
          transition-opacity ease-in-out duration-300'>
            Shop now
          </div>
        </div>
      </Carousel>
    </div>
  )
}

export default HeroBanner