import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { orderAction } from "../../store/orderSlice";
import Loader from "../home/Loader";
import classes from "./Order.module.css";

const Order = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector((state) => state.orders.orderHistory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(orderAction.storeOrders(data));
  }, [dispatch, data]);

  const handleOrderHistory = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      <div className={classes["order-history-table"]}>
        <h3>Order History</h3>
        <p>
          Open an order to <b>change order status</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={classes.table}>
            {orders.length === 0 ? (
              <p>No order found</p>
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Date</th>
                      <th>Order ID</th>
                      <th>Order Amount</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      const {
                        id,
                        orderDate,
                        orderTime,
                        orderAmount,
                        orderStatus,
                      } = order;
                      return (
                        <tr key={id} onClick={() => handleOrderHistory(id)}>
                          <td>{index + 1}</td>
                          <td>{`${orderDate} at ${orderTime}`}</td>
                          <td>{id}</td>
                          <td>{`$${orderAmount}`}</td>
                          <td>
                            <p
                              className={
                                orderStatus !== "Delivered"
                                  ? classes["order-pending"]
                                  : classes["order-delivered"]
                              }
                            >
                              {orderStatus}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Order;
