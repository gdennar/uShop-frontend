import "./ProductDetails.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./ProductDetails.css";
import "react-toastify/dist/ReactToastify.css";
import SpinnerImg from "../../assests/spinner.jpg";
import { Button, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/CartSlice";
import useFetchDocument from "../../customHooks/useFetchDocument";
import useFetchCollection from "../../customHooks/useFetchCollection";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
	const { id } = useParams();
	const { document } = useFetchDocument("products", id);
	const [product, setProduct] = useState(null);
	const cartItems = useSelector((state) => state.cart.cartItems);
	const { data } = useFetchCollection("reviews");

	const dispatch = useDispatch();

	useEffect(() => {
		setProduct(document);
	}, [document]);

	const findItem = cartItems.find((cart) => cart.id === id);
	const filteredReviews = data.filter((review) => review.productID === id);

	const addToCart = (product) => {
		dispatch(cartAction.addToCart(product));
		dispatch(cartAction.calculateCartQuantity());
	};
	const decreaseProductCount = (cart) => {
		dispatch(cartAction.decreaseCartItem(cart));
		dispatch(cartAction.calculateCartQuantity());
	};

	const increaseProductCount = (cart) => {
		dispatch(cartAction.addToCart(cart));
		dispatch(cartAction.calculateCartQuantity());
	};

	return (
		<section>
			<ToastContainer />
			<div className="container product-product">
				<h3>Product Details</h3>
				<div>
					<Link to="/#products">&larr; back to products</Link>
				</div>
				{product === null ? (
					<img src={SpinnerImg} alt="Loading..." style={{ width: "50px" }} />
				) : (
					<>
						<div className="product-details">
							<div className="product-img">
								<img src={product.imageUrl} alt={product.name} />
							</div>
							<div className="product-content">
								<h3>{product.name}</h3>
								<p className="product-price">{`$${product.price.toFixed(
									2
								)}`}</p>
								<p>{product.desc}</p>
								<p>
									<b>SKU: </b>
									{product.id}
								</p>
								<p>
									<b>Brand:</b>
									{product.brand}
								</p>
								{findItem ? (
									<div className="product-count">
										<button
											className="product--btn"
											onClick={() => decreaseProductCount(product)}
										>
											-
										</button>
										<p>
											<b>{findItem.cartQuantity}</b>
										</p>
										<button
											className="product--btn"
											onClick={() => increaseProductCount(product)}
										>
											+
										</button>
									</div>
								) : (
									""
								)}
								<Button
									sx={{ backgroundColor: "#ffb700", color: "#fff" }}
									onClick={() => {
										addToCart(product);
									}}
									className="product-detail-btn"
								>
									Add to cart
								</Button>
							</div>
						</div>
					</>
				)}
				<Card className="product-review-rate">
					<h3>Product Reviews</h3>
					<div>
						{filteredReviews.length === 0 ? (
							<p>No reviews for this product yet!</p>
						) : (
							<>
								{filteredReviews.map((rev, index) => {
									const { rate, review, reviewDate, userName } = rev;
									return (
										<div className="review" key={index}>
											<StarsRating value={rate} />
											<p>{review}</p>
											<span style={{ color: "gray" }}>{reviewDate}</span>
											<br />
											<span style={{ color: "gray" }}>@{userName}</span>
										</div>
									);
								})}
							</>
						)}
					</div>
				</Card>
			</div>
		</section>
	);
};

export default ProductDetails;
