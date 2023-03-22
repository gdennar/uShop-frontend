import { Button, Card } from "@mui/material";
import { Container } from "@mui/system";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { db } from "../../firebase/config";
import spinnerImg from "../../assests/spinner.jpg";
import "./ReviewProducts.css";

const ReviewProducts = () => {
	const { id } = useParams();
	const [rate, setRate] = useState(0);
	const [review, setReview] = useState("");
	const [product, setProduct] = useState(null);
	const { document } = useFetchDocument("products", id);
	const userID = useSelector((state) => state.auth.userID);
	const userName = useSelector((state) => state.auth.userName);

	useEffect(() => {
		setProduct(document);
	}, [document]);

	console.log(product);

	const submitReviewHandler = (e) => {
		e.preventDefault();
		const today = new Date();
		const date = today.toDateString();

		const reviewConfig = {
			userID,
			userName,
			productID: id,
			rate,
			review,
			reviewDate: date,
			createdAT: Timestamp.now().toDate(),
		};

		try {
			addDoc(collection(db, "reviews"), reviewConfig);

			toast.success("Thanks for your review");
			setRate(0);
			setReview("");
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<section className="review-section">
			<Container className="review">
				<h3>Rate this Product</h3>
				{product === null ? (
					<img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
				) : (
					<>
						<p>
							<b>Product name:</b> {product.name}
						</p>
						<img
							src={product.imageUrl}
							alt={product.name}
							style={{ width: "120px" }}
						/>
					</>
				)}

				<br />
				<Card className="card">
					<form onSubmit={(e) => submitReviewHandler(e)}>
						<label>Rating</label>
						<StarsRating
							value={rate}
							onChange={(rate) => {
								setRate(rate);
							}}
						/>
						<label>Review</label>
						<textarea
							required
							value={review}
							cols="30"
							rows="10"
							onChange={(e) => setReview(e.target.value)}
						></textarea>
						<Button variant="contained" type="submit">
							Submit Review
						</Button>
					</form>
				</Card>
			</Container>
		</section>
	);
};

export default ReviewProducts;
