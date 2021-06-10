import React from "react";
import Cart from "./Cart";
import CartItem from "./CartItem";
import Navbar from "./Navbar";

class App extends React.Component {
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
      productsArray,
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
    const items = productsArray.filter(
      (item) => item.id !== idOfProductToBeDeleted
    );
    this.setState({
      productsArray: items,
    });
  };

  getCartCount = () => {
    const { productsArray } = this.state;
    let count = 0;

    productsArray.forEach((product) => {
      count += product.qty;
    });
    return count;
  }

  getTotalPrice = () => {
    const { productsArray } = this.state;
    let cartTotal = 0;
    productsArray.map((product) => {
      cartTotal = cartTotal + product.qty * product.price;
    });
    return cartTotal;
  };

  render() {
    const { productsArray } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart
          products={productsArray}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDelete={this.handleDelete}
        />
        <div>
          <h1>Total:{this.getTotalPrice()}</h1>
        </div>
      </div>
    );
  }
}
export default App;
