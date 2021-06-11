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
      loading: true,
    };
    this.db = firebase.firestore();
  }

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("products")
    //   .get()
    //   .then((snapshot) => {
    //     // console.log("snap---------",snapshot);
    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data());
    //     });

    //     const productsArray = snapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       data["id"] = doc.id;
    //       return data;
    //     });
    //     this.setState({
    //       productsArray,
    //       loading:false
    //     });
    //   });

    this.db.collection("products").onSnapshot((snapshot) => {
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
        loading: false,
      });
    });
  }

  handleIncreaseQuantity = (productWhosQuantityToBeIncreased) => {
    const { productsArray } = this.state;
    const index = productsArray.indexOf(productWhosQuantityToBeIncreased);

    // productsArray[index].qty += 1;
    // this.setState({
    //   productsArray,
    // });

    const docRef = this.db.collection("products").doc(productsArray[index].id);

    docRef
      .update({
        qty: productsArray[index].qty + 1,
      })
      .then(() => {
        console.log("Document Updated Successfully");
      })
      .catch((error) => {
        console.log("Error !!!", error);
      });
  };

  handleDecreaseQuantity = (productWhosQuantityToBeDecreased) => {
    const { productsArray } = this.state;
    const index = productsArray.indexOf(productWhosQuantityToBeDecreased);

    if (productsArray[index].qty == 0) return;

    // productsArray[index].qty -= 1;
    // this.setState({
    //   productsArray,
    // });

    const docRef = this.db.collection("products").doc(productsArray[index].id);

    docRef
      .update({
        qty: productsArray[index].qty - 1,
      })
      .then(() => {
        console.log("Document Updated Successfully");
      })
      .catch((error) => {
        console.log("Error !!!", error);
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

  addProduct = () => {
    this.db
      .collection("products")
      .add({
        img: "",
        price: 900,
        qty: 34,
        title: "Protein",
      })
      .then((docRef) => {
        console.log("Product has been added", docRef);
      })
      .catch((error) => {
        console.log("error!", error);
      });
  };

  render() {
    const { productsArray, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
          Add a Product
        </button>
        <Cart
          products={productsArray}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDelete={this.handleDelete}
        />
        {loading && <h1>Loading Products ...</h1>}
        <div>
          <h1>Total:{this.getTotalPrice()}</h1>
        </div>
      </div>
    );
  }
}
export default App;
