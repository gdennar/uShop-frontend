import { Button, Card } from "@mui/material";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import Loader from "../Loader";
import "./ChangeOrderStatus.css";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrderStatus = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userId: order.userId,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAT: order.createdAT,
      editedAt: Timestamp.now().toDate(),
    };
    try {
      setDoc(doc(db, "orders", id), orderConfig);
      setIsLoading(false);
      toast.success("Status changed to " + status);
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  };

  return (
    <div className="order-status">
      {isLoading && <Loader />}
      <Card className="card">
        <h4 style={{ margin: 0 }}>Update Order Status</h4>
        <form onSubmit={(e) => editOrderStatus(e, id)}>
          <span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="" disabled>
                -- Choose one --
              </option>
              <option value="Order Placed">Order Placed</option>
              <option value="Processing...">Processing...</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </span>
          <span>
            <Button variant="contained" type="submit">
              Update Status
            </Button>
          </span>
        </form>
      </Card>
    </div>
  );
};

export default ChangeOrderStatus;
