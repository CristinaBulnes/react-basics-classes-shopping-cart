import React, { Component } from "react";

import "./App.scss";

import img_1 from "./img/img_1.jpeg";
import img_2 from "./img/img_2.jpeg";
import img_3 from "./img/img_3.jpeg";
import img_4 from "./img/img_4.jpeg";
import img_5 from "./img/img_5.jpeg";
import img_6 from "./img/img_6.jpeg";

import ProductCard from "./components/ProductCard";
import ShoppingCartItem from "./components/ShoppingCartItem";

// Render the products dinamically with a loop
import products from "./products";

class App extends Component {
  constructor(props) {
    super(props);

    const cartProducts = [];
    products.map((product) => {
      const { id, img, title, price, quantity = 0 } = product;
      cartProducts.push({id, img, title, price, quantity});
    })
    this.state = {cartProducts};
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  calculateCartPrice () {
    let cartPrice = 0;
    this.state.cartProducts.forEach((product) => {
      if (product.quantity > 0) {
        cartPrice = cartPrice + product.quantity*product.price;
      }
    })
    return cartPrice;
  }

  handleRemove(id) {
    const cartProducts = this.state.cartProducts;
    let cartPrice = 0;
    const indexProd = cartProducts.findIndex((product) => {
      return product.id === id;
    })
    cartProducts[indexProd].quantity = 0;
    cartProducts.forEach((product) => {
      if (product.quantity > 0) {
        cartPrice = cartPrice + product.quantity*product.price;
      }
    })
    this.setState(cartProducts);
  }

  handleChange(event) {
    const id = event.target.id;
    const quantity = event.target.value;
    let cartPrice = 0;
    const cartProducts = this.state.cartProducts;
    const indexProd = cartProducts.findIndex((product) => {
      return product.id === Number(id);
    })
    cartProducts[indexProd].quantity = quantity;
    this.setState(cartProducts);
  }

  render() {
    return (
      <main className="container-fluid">
        <div className="row">
          <div className="col col-6 col-lg-8 p-4">
            <section className="row row-cols-1">
              <div className="col">
                <h1 className="mb-4">Shop</h1>
              </div>
              <div className="col">
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                  {products.map((product) => (
                      <ProductCard
                      key={product.id}
                      img={product.img}
                      title={product.title}
                      price={product.price}
                      handleAddToCart={() => {
                        const cartProducts = this.state.cartProducts;
                        const indexProd = cartProducts.findIndex((elem) => {
                          return elem.id === product.id;
                        })
                        if (cartProducts[indexProd].quantity < 10) {
                          cartProducts[indexProd].quantity = Number(cartProducts[indexProd].quantity) + 1;
                        } else {
                          cartProducts[indexProd].quantity = 10;
                        }
                        this.setState({cartProducts});
                      }}
                      />
                    ))}
                </div>
              </div>
            </section>
          </div>
          <aside className="col col-6 col-lg-4 p-4">
            <div className="row flex-column">
              <div className="col shopping__cart__header">
                <h2 className="h3 mt-2">Shopping Cart</h2>
                <hr className="mb-3" />
              </div>
              {this.state.cartProducts.find((product) => { return product.quantity > 0}) ? 
              (this.state.cartProducts.map((product) => (
                product.quantity > 0 ? (
                  <ShoppingCartItem
                    key = {product.id}
                    id = {product.id}
                    title={product.title}
                    price={product.price}
                    img={product.img}
                    quantity = {product.quantity}
                    handleRemove={this.handleRemove}
                    handleChange={this.handleChange}
                    />
                ) : null))) : 
                <div className="col h5">Your cart is empty</div>}
              <div className="col shopping__cart__footer">
                <div className="row row-cols-1 flex-column">
                  <div className="col">
                    <div className="d-flex justify-content-between">
                      <h4 className="h5">Total</h4>
                      <h4>
                        <strong>{this.calculateCartPrice()} €</strong>
                      </h4>
                    </div>
                    <hr />
                  </div>
                  <div className="col">
                    <button
                      type="btn"
                      className="btn btn-primary btn-block btn-lg"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    );
  }
}

export default App;
