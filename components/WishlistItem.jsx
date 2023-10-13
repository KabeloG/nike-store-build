import React from 'react'
import Image from 'next/image'
import { IoMdClose } from 'react-icons/io'
import { urlFor } from '../sanity'
import Link from 'next/link'

import { useDispatch } from 'react-redux'
import { removeFromWishlist } from '../src/features/wishlist/wishlistSlice'

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
      <div className="flex relative py-5 gap-3 md:gap-5 border-b">
        {/* IMAGE START */}
          <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
            <Image 
              src={urlFor(item.shoe.mainImage).url()}
              alt={item.shoe.title}
              width={120}
              height={120}
            />
          </div>
        {/* IMAGE END */}

        <Link href={`/product/${item.shoe.slug.current}`}>
          <div className="w-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
              {/* PRODUCT TITLE */}
              <h1 className="text-lg md:text-2xl font-semibold
              text-black/[0.8]">
                {item.shoe.title}
              </h1>
              
              {/* PRODUCT SUBTITLE */}
              <h2 className="text-sm md:text-base font-medium
              text-black/[0.5] block md:hidden">
                {item.shoe.category}
              </h2>
            </div>

            {/* PRODUCT SUBTITLE */}
            <h2 className="text-sm md:text-base font-medium
              text-black/[0.5] hidden md:block">
                {item.shoe.category}
            </h2>

            {/* PRODUCT COLORS */}
            <p className="mt-2">
              {item.shoe.extraInfo.children.map((phrase, index) => {
                return index === 0 ? (
                  <p key={phrase} className="inline-block mr-1">
                    {phrase.text}
                  </p>
                ) : (
                  <p key={index} className="inline-block">
                    {phrase.text}
                  </p>
                )
              })}
            </p>
          </div>
        </Link>

        <IoMdClose 
          size={20} 
          className="text-red-500 absolute top-4 right-3 cursor-pointer" 
          onClick={() => dispatch(removeFromWishlist(item))}
        />
      </div>
  )
}

export default WishlistItem