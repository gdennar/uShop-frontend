import React, { useEffect, useState } from "react";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImage from "../../assests/spinner.jpg";
import "./OrderDetails.css";
import { Link, useParams } from "react-router-dom";
import ChangeOrderStatus from "./ChangeOrderStatus";

const OrderDetails = () => {
	const { id } = useParams();
	const { document } = useFetchDocument("orders", id);
	const [order, setOrder] = useState(null);

	useEffect(() => {
		setOrder(document);
	}, [document]);

	return (
		<>
			<div className="admin-order-table">
				<h3 style={{ margin: 0 }}>Order Details</h3>
				<div>
					<Link to="/admin/orders"> &larr; Back To Orders</Link>
				</div>
				<br />
				{order === null ? (
					<img src={spinnerImage} alt="Loading..." style={{ width: "50px" }} />
				) : (
					<>
						<p>
							<b>Order ID:</b> {order.id}
						</p>
						<p>
							<b>Order Amount:</b> ${order.orderAmount}
						</p>
						<p>
							<b>Order Status:</b> {order.orderStatus}
						</p>
						<p>
							<b>Shipping Address:</b>
							<br />
							Address: {order.shippingAddress.line1},{" "}
							{order.shippingAddress.city}
							<br />
							State: {order.shippingAddress.state}
						</p>
						<br />
						<table>
							<thead>
								<tr>
									<th>s/n</th>
									<th>Products</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{order.cartItems.map((item, index) => {
									const { id, name, price, imageUrl, cartQuantity } = item;
									return (
										<tr key={id}>
											<td>
												<b>{index + 1}</b>
											</td>
											<td>
												<p>
													<b>{name}</b>
												</p>
												<img
													src={imageUrl}
													alt={name}
													style={{ width: "100px" }}
												/>
											</td>
											<td>{`$${price}`}</td>
											<td>{cartQuantity}</td>
											<td>{`$${(price * cartQuantity).toFixed(2)}`}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</>
				)}
				<ChangeOrderStatus order={order} id={id} />
			</div>
		</>
	);
};

export default OrderDetails;
