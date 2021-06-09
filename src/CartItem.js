import React from "react";

class CartItem extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 999,
      title: "Mobile Phone",
      qty: 1,
      img: "",
    };
    //  Binding This 
    
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.decreaseQuantity = this.decreaseQuantity.bind(this);
    // this.delete = this.delete.bind(this);

    // this.testing();
  }
  // testing(){
  //   const promise=new Promise((resolve,reject) => {
  //     setTimeout(()=>{
  //       resolve('done');
  //     },5000);
  //   })
  //   promise.then(()=>{
  //     //setState acts like a synchronous call
  //     this.setState({qty: this.setState.qty+1});
  //     this.setState({qty: this.setState.qty+1});
  //     this.setState({qty: this.setState.qty+1});

  //     console.log('this.state',this.state);
  //   });
  // }
  // Arrow Function for *Binding this*
  increaseQuantity = () => {
    //setState form 1
    //this.setState({
    //qty:this.state.qty+1
    //})

    //setState form 2
    this.setState( (prevState) => {
      return{
        qty: prevState.qty+1
      }
    })
  };
// From the both 2 states here we will use the 2nd one because here we need the
//prev state where we don't need the state we will use state1
  decreaseQuantity = () => {
    const{qty}=this.state;
    if(qty===0){
      return;
    }
        //setState form 1
        // this.setState({
        // qty:this.state.qty-1
        // })
    
        //setState form 2
        this.setState( (prevState) => {
          return{
            qty: prevState.qty-1
          }
        })
  };

  delete = () => {};

  render() {
    const { price, title, qty } = this.state;
    return (
      <div className="cart-item">
        <div className="left-block">
          <img style={styles.image} />
        </div>
        <div className="right-block">
          <div style={{ fontSize: 25 }}>{title}</div>
          <div style={{ color: "#777" }}>Rs: {price}</div>
          <div style={{ color: "#777" }}>Qty: {qty}</div>
          <div className="cart-item-actions">
            {/* Button */}
            <img
              alt="increase"
              className="action-icons"
              src="https://image.flaticon.com/icons/png/128/753/753317.png"
              onClick={this.increaseQuantity}
            />
            <img
              alt="decrease"
              className="action-icons"
              src="https://image.flaticon.com/icons/png/128/929/929430.png"
              onClick={this.decreaseQuantity}
            />
            <img
              alt="delete"
              className="action-icons"
              src="https://image.flaticon.com/icons/png/128/1632/1632602.png"
              onClick={this.delete}
            />
          </div>
        </div>
      </div>
    );
  }
}


const styles = {
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background: "#ccc",
  },
};
export default CartItem;