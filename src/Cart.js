import React, { Component } from "react";
import CartItem from "./CartItem";
const Cart = (props) => {
  // console.log("write",this.props.productsArray);
  const { products } = props;
  return (
    <div className="cart">
      {products.map((product) => {
        return (
          <CartItem
            product={product}
            key={product.id}
            onIncreaseQuantity={props.onIncreaseQuantity}
            onDecreaseQuantity={props.onDecreaseQuantity}
            onDelete={props.onDelete}
          />
        );
      })}
    </div>
  );
};

export default Cart;