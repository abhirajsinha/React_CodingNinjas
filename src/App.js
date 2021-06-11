import React from "react";
import Cart from "./Cart";
import CartItem from "./CartItem";
import Navbar from "./Navbar";
import firebase from "firebase/app";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productsArray: [],
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        // console.log("snap---------",snapshot);
        snapshot.docs.map((doc) => {
          console.log(doc.data());
        });

        const productsArray = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({
          productsArray,
          
        });
      });
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
  };

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
