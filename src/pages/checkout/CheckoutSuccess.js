import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h3>Checkout Successful </h3>
        <p>Thank you for your purchase</p>
        <br />

        <Button variant="contained">
          <Link to="/order-history" style={{ color: "white" }}>
            View Order Status
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
