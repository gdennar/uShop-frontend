import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./Chart.css";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Order Status Chart",
		},
	},
};

const Chart = () => {
	const orderHistory = useSelector((state) => state.orders.orderHistory);

	const array = [];
	orderHistory.map((order) => {
		const { orderStatus } = order;
		return array.push(orderStatus);
	});

	const getStatusCount = (arr, value) => {
		return arr.filter((num) => num === value).length;
	};

	const [s1, s2, s3, s4] = [
		"Order Placed",
		"Processing...",
		"Shipped",
		"Delivered",
	];

	const placed = getStatusCount(array, s1);
	const processing = getStatusCount(array, s2);
	const shipped = getStatusCount(array, s3);
	const delivered = getStatusCount(array, s4);

	const data = {
		labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
		datasets: [
			{
				label: "Order Count",
				data: [placed, processing, shipped, delivered],
				backgroundColor: [
					"lightBlue",
					"lightSlateGrey",
					"lightPink",
					"lightGreen",
				],
			},
		],
	};
	return (
		<div className="admin-chart">
			<Card className="card">
				<Bar options={options} data={data} width={450} height={300} />
			</Card>
		</div>
	);
};

export default Chart;
