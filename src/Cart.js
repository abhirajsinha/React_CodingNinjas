import React, { Component } from "react";
import CartItem from "./CartItem";
export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
        productsArray: [
        {
          price: 999,
          title: "Mobile Phone",
          qty: 1,
          img: "",
          id: 1,
        },
        {
          price: 99,
          title: "Watch",
          qty: 10,
          img: "",
          id: 2,
        },
        {
          price: 999,
          title: "Laptop",
          qty: 20,
          img: "",
          id: 3,
        },
      ],
    };
  }

  handleIncreaseQuantity = (productWhosQuantityToBeIncreased) => {
    const { productsArray } = this.state;
    const index = productsArray.indexOf(productWhosQuantityToBeIncreased);

    productsArray[index].qty += 1;
    this.setState({
        productsArray
    });
  };

  handleDecreaseQuantity = (productWhosQuantityToBeDecreased) => {
    const { productsArray } = this.state;
    const index = productsArray.indexOf(productWhosQuantityToBeDecreased);

    if (productsArray[index].qty == 0) return;

    productsArray[index].qty -= 1;
    this.setState({
        productsArray,
    });
  };

  handleDelete = (idOfProductToBeDeleted) => {
    const { productsArray } = this.state;
    const items = productsArray.filter((item) => item.id !== idOfProductToBeDeleted);
    this.setState({
        productsArray:items
    })
  };

  render() {
    const { productsArray } = this.state;
    return (
      <div className="cart">
        {productsArray.map((product) => {
          return (
            <CartItem
              product={product}
              key={product.id}
              onIncreaseQuantity={this.handleIncreaseQuantity}
              onDecreaseQuantity={this.handleDecreaseQuantity}
              onDelete={this.handleDelete}
            />
          );
        })}
      </div>
    );
  }
}
