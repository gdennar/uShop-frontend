import React, { useEffect } from "react";
import InfoBox from "./InfoBox";
import PaidIcon from "@mui/icons-material/Paid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../../store/orderSlice";
import { productAction } from "../../store/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";
import Chart from "./Chart";

const earningIcon = <PaidIcon sx={{ fontSize: "30px", color: "green" }} />;
const productIcon = (
	<ShoppingCartIcon sx={{ fontSize: "30px", color: "blue" }} />
);
const ordersIcon = <LocalMallIcon sx={{ fontSize: "30px", color: "orange" }} />;

const Home = () => {
	const products = useSelector((state) => state.product.products);
	const orders = useSelector((state) => state.orders.orderHistory);
	const totalOrderAmount = useSelector(
		(state) => state.orders.totalOrderAmount
	);

	const fbProducts = useFetchCollection("products");
	const { data } = useFetchCollection("orders");

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productAction.storeProducts({ products: fbProducts.data }));
		dispatch(orderAction.storeOrders(data));
		dispatch(orderAction.calculateTotalOrderAmount());
	}, [dispatch, data, fbProducts]);

	const infoDetails = [
		{
			title: "Earnings",
			count: `$${totalOrderAmount}`,
			icon: earningIcon,
			className: "earningPaper",
		},

		{
			title: "Products",
			count: products.length,
			icon: productIcon,
			className: "productPaper",
		},
		{
			title: "Orders",
			count: orders.length,
			icon: ordersIcon,
			className: "ordersPaper",
		},
	];
	return (
		<div className="home">
			<h3>Admin Home</h3>
			<div className="info-box">
				<InfoBox data={infoDetails} />
			</div>
			<div>
				<Chart />
			</div>
		</div>
	);
};

export default Home;
