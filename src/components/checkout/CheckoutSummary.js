import { Button, Card } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

  return (
    <div className={classes["checkout-card"]}>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart</p>
            <Button>
              <Link to="./#products">Back to shop</Link>
            </Button>
          </>
        ) : (
          <>
            <div>
              <p
                className={classes["cart-item"]}
              >{`Cart items(s): ${totalQuantity}`}</p>
              <div className={classes["checkout-text"]}>
                <h4>
                  <b>SubTotal</b>
                </h4>
                <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
              </div>
              {cartItems.map((item) => {
                const { id, name, price, cartQuantity } = item;

                return (
                  <Card key={id} className={classes["checkout-product"]}>
                    <h4>Product: {name} </h4>
                    <p>Quantity: {cartQuantity}</p>
                    <p>Unit Price: {`$${price.toFixed(2)}`}</p>
                    <p>
                      Total Product Price:
                      {`$${cartQuantity * price}`}
                    </p>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
