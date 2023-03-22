import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImage from "../../assests/spinner.jpg";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import "./OrderDetails.css";

const OrderDetails = () => {
	const { id } = useParams();
	const { document } = useFetchDocument("orders", id);
	const [order, setOrder] = useState(null);

	useEffect(() => {
		setOrder(document);
	}, [document]);

	return (
		<section>
			<Container className="table">
				<h3>Order Details</h3>
				<div>
					<Link to="/order-history"> &larr; Back To Orders</Link>
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
							<b>Order Amount:</b> {order.orderAmount}
						</p>
						<p>
							<b>Order Status:</b> {order.orderStatus}
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
									<th>Actions</th>
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
											<td className="icons">
												<Button variant="contained">
													<Link
														to={`/review-product/${id}`}
														style={{ color: "white" }}
													>
														Review Product
													</Link>
												</Button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</>
				)}
			</Container>
		</section>
	);
};

export default OrderDetails;
