import React, { useEffect } from "react";
import useFetchCollection from "../../customHooks/useFetchCollection";
import "./OrderHistory.css";
import { orderAction } from "../../store/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector((state) => state.orders.orderHistory);
  const userID = useSelector((state) => state.auth.userID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(orderAction.storeOrders(data));
  }, [dispatch, data]);

  const handleOrderHistory = (id) => {
    console.log(id);
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userId === userID);

  return (
    <section>
      <div className="container order-history-table ">
        <h3>Your Order History</h3>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className="table">
            {filteredOrders.length === 0 ? (
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
                    {filteredOrders.map((order, index) => {
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
                                  ? "order-pending"
                                  : "order-delivered"
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
    </section>
  );
};

export default OrderHistory;
