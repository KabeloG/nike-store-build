import React from 'react'
import Image from "next/image";
import Link from "next/link";

const EmptyCart = () => {
  return (
        <div className="flex-[2] flex flex-col items-center pb-[50px]
            md:-mt-14">
            <Image 
                src="/assets/empty-cart.jpg" 
                width={300}
                height={300}
                className="w-[300px] md:w-[400px] mt-20"
            />
            <span className="text-xl font-bold">
                Your cart is empty
            </span>
            <span className="text-center mt-4">
                Looks like you have not added anything to your cart.
                <br />
                Go ahead and explore our shoe catalogue.
            </span>

            <Link
                href="/"
                className="py-4 px-8 rounded-full bg-black text-white 
                text-lg font-medium transition-all duration-300 ease-in-out 
                active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
                Continue Shopping
            </Link>
        </div>
  )
}

export default EmptyCart