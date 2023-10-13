import React from "react";
import { selectCartItems } from "../src/features/cart/cartSlice";
import { useSelector } from "react-redux";

const about = () => {
  const itemsInCart = useSelector(selectCartItems);
  return (
    <div>
      <p>Number: {itemsInCart.length}</p>
    </div>
  );
};

export default about;
