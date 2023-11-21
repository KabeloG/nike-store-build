import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCartItems } from "../src/features/cart/cartSlice";
import Wrapper from "../components/Wrapper";
import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const dispatch = useDispatch();
  const itemsInCart = useSelector(selectCartItems);

  {
    /* useMemo is a React Hook that lets you cache the result 
  of a calculation between re-renders. */
  }
  const subTotal = useMemo(() => {
    return itemsInCart.reduce((total, val) => total + val.shoe.price, 0);
  }, [itemsInCart]); // reduce adds each price in array, initial value 0

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({ body: itemsInCart }),
      });

      const data = await response.json();
      if (data.session) {
        stripe?.redirectToCheckout({ sessionId: data?.session.id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full py-20">
      <Wrapper>
        {itemsInCart.length > 0 && (
          <>
            <div>
              <h1
                className="text-[28px] md:text-[34px] mb-5 font-semibold
                leading-tight"
              >
                Shopping Cart
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <h2 className="text-lg font-bold">Cart Items</h2>
                {itemsInCart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-[1]">
                <h1 className="text-lg font-bold">Summary</h1>

                <div className="p-5 my-5 bg-black/[0.2] rounded-xl">
                  <div className="flex justify-between">
                    <h2
                      className="uppercase text-md md:text-lg
                    font-medium text-black"
                    >
                      Subtotal
                    </h2>
                    <h3
                      className="text-md md:text-lg font-medium 
                    text-black"
                    >
                      R{subTotal.toFixed(2)}
                    </h3>
                  </div>
                  <p className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </p>
                </div>

                <button
                  className="w-full py-4 rounded-full bg-black
                text-white text-lg font-medium transition-all
                active:scale-95 duration-300 ease-in-out mb-3 hover:opacity-75 
                flex items-center gap-2 justify-center"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
        {itemsInCart.length < 1 && <EmptyCart />}
      </Wrapper>
    </div>
  );
};

export default Cart;
