import React, { useEffect, useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkout/CheckoutSummary";
import spinner from "../../assests/spinner.jpg";
import { Card } from "@mui/material";
import "./CheckoutForm.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { cartAction } from "../../store/CartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const userEmail = useSelector((state) => state.auth.email);
	const userId = useSelector((state) => state.auth.userID);
	const cartItems = useSelector((state) => state.cart.cartItems);
	const shippingAddress = useSelector(
		(state) => state.checkout.shippingAddress
	);
	const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}
	}, [stripe]);

	const saveOrder = () => {
		const today = new Date();
		const date = today.toDateString();
		const time = today.toLocaleTimeString();
		const orderConfig = {
			userId,
			userEmail,
			orderDate: date,
			orderTime: time,
			orderAmount: cartTotalAmount,
			orderStatus: "Order Placed...",
			cartItems,
			shippingAddress,
			createdAT: Timestamp.now().toDate(),
		};

		try {
			addDoc(collection(db, "orders"), orderConfig);
			dispatch(cartAction.clearCart());
			toast.success("Order saved");
			navigate("/checkout-success");
		} catch (error) {
			toast.error(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);
		if (!stripe || !elements) {
			return;
		}
		setIsLoading(true);
		await stripe
			.confirmPayment({
				elements,
				confirmParams: {
					return_url: "https://ushop-api.onrender.com/checkout-success",
				},
				redirect: "if_required",
			})
			.then((result) => {
				if (result.error) {
					toast.error(result.error.message);
					setMessage(result.error.message);
					return;
				}
				if (result.paymentIntent) {
					if ((result.paymentIntent.status = "succeeded")) {
						setIsLoading(false);
						toast.success("Payment Successful");
						saveOrder();
					}
				}
			});
		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

	return (
		<section>
			<div className="container payment-checkout">
				<h3>Checkout</h3>
				<form onSubmit={handleSubmit}>
					<div className="card-checkout">
						<Card>
							<CheckoutSummary />
						</Card>
					</div>
					<div className="pay">
						<Card sx={{ p: 2 }}>
							<h3>Stripe Checkout</h3>
							<PaymentElement
								id="payment-element"
								options={paymentElementOptions}
							/>
							<button
								disabled={isLoading || !stripe || !elements}
								id="submit"
								className="button"
							>
								<span id="button-text">
									{isLoading ? (
										<img
											src={spinner}
											alt="loading..."
											style={{ width: "20px" }}
										/>
									) : (
										"Pay now"
									)}
								</span>
							</button>
							{message && <div id="payment-message">{message}</div>}
						</Card>
					</div>
				</form>
			</div>
		</section>
	);
};
export default CheckoutForm;
