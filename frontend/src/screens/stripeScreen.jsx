import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  // eslint-disable-next-line
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 17000,
    productBy: "facebook",
  });

  // const [payoutOpt, setpayoutOpt] = useState("instan")
  const makePayment = async (token) => {
    console.log(token);
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return await fetch(`http://localhost:4000/payment/instant`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/* eslint-disable-next-line */}
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey="pk_test_51JPVeZIR0YG3gIRPb6XoiIIua8fvNl4wvdkuTnQOq4ZcTof3CZqKYDhuAxQa6hemG7a9UxfU3sNFpuHKxbD9Ry7E00cChGr3ZL"
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
          // shippingAddress
          // billingAddress
        >
          <button>Buy react is just {product.price} $</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
