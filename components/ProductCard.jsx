import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'

const ProductCard = ({ shoe }) => {
  const getPercentage = (x, y) => {
    let diff = 100 * Math.abs( (x - y) / ( (x + y) / 2) )

    return Math.round(diff)
  }

  return (
    <Link href={`/product/${shoe?.slug.current}`} className="transform 
    overflow-hidden bg-white duration-300 hover:scale-105 cursor-pointer">
      <img
        src={urlFor(shoe.mainImage).url()}
        alt='product image'
        height={370.667}
        width={370.667}
        className='w-full object-contain'
      />
      
      <div className="p-4 text-black/[0.9]">
        <h2 className='text-lg font-medium'>{shoe.title}</h2>
        <div className='flex items-center text-black/[0.5]'>
          <p className='mr-2 text-lg font-semibold'>R{shoe.price.toFixed(2)}</p>
          {shoe.oldPrice && (
            <p className='text-lg font-medium line-through text-red-400'>
              R{shoe.oldPrice.toFixed(2)}
            </p>
          )}

          {shoe.oldPrice && (
            <p className='ml-auto text-lg font-medium text-green-500'>
            {getPercentage(shoe.oldPrice, shoe.price)}% off
          </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard