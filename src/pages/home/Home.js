import React, { useEffect } from "react";
import Product from "../../components/product/Product";
import Slider from "../../components/Slider";

const Home = () => {
	const url = window.location.href;

	useEffect(() => {
		const scrollToHome = () => {
			if (url.includes("/")) {
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
				return;
			}
		};
		scrollToHome();
	}, [url]);

	useEffect(() => {
		const scrollToProducts = () => {
			if (url.includes("#products")) {
				window.scrollTo({
					top: 700,
					behavior: "smooth",
				});
				return;
			}
		};
		scrollToProducts();
	}, [url]);

	return (
		<div>
			<Slider />
			<Product />
		</div>
	);
};

export default Home;
