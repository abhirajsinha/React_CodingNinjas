import React, { Component } from 'react'
import CartItem from './CartItem'
export default class Cart extends Component {
    render() {
        return (
            <div className="cart">
                <CartItem/>
                <CartItem/>
                <CartItem/>
                <CartItem/>
            </div>
        )
    }
}
