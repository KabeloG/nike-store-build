import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { sizesDropdown } from "../constants";

import { urlFor } from "../sanity";
import { removeFromCart, updateCart } from "../src/features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: item.shoe._id,
    };
    dispatch(updateCart(payload));
  };

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
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

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <h1
            className="text-lg md:text-2xl font-semibold 
                    text-black/[0.8]"
          >
            {item.shoe.title}
          </h1>

          {/* PRODUCT SUBTITLE */}
          <h2
            className="text-sm md:text-base font-medium 
                    text-black/[0.5] block md:hidden"
          >
            {item.shoe.category}
          </h2>

          {/* PRODUCT DESCRIPTION */}
          <p
            className="text-sm md:text-base font-medium 
                    text-black/[0.5] block mt-4 md:hidden"
          >
            {item.shoe.descriptionText.children.text}
          </p>

          {/* PRODUCT PRICE */}
          <h2
            className="text-sm md:text-base font-bold 
                    text-black/[0.5] mt-2"
          >
            MRP : R{item.shoe.price.toFixed(2)}
          </h2>
        </div>

        {/* PRODUCT SUBTITLE */}
        <h2
          className="text-base font-medium text-black/[0.5] 
                hidden md:block"
        >
          {item.shoe.category}
        </h2>

        {/* PRODUCT DESCRIPTION */}
        <p
          className="text-sm md:text-base font-medium 
                    text-black/[0.5] hidden md:block mt-4"
        >
          {item.shoe.descriptionText.children.text}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div
            className="flex items-center gap-2 md:gap-10 
                    text-black/[0.5] text-sm md:text-base"
          >
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                className="p-2 rounded-md hover:text-black"
                onChange={(e) => updateCartItem(e, "selectedSize")}
              >
                {sizesDropdown.map((size, index) => {
                  return (
                    <option
                      key={index}
                      value={size.size}
                      disabled={size.enabled ? true : false}
                      selected={item.selectedSize === size.size}
                    >
                      {size.size}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="p-2 rounded-md hover:text-black"
                onChange={(e) => updateCartItem(e, "quantity")}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option key={i} value={q} selected={item.quantity === q}>
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
            onClick={() => dispatch(removeFromCart({ id: item.shoe._id }))}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
