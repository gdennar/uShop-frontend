import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	orderHistory: [],
	totalOrderAmount: null,
};

const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		storeOrders: (state, action) => {
			state.orderHistory = action.payload;
		},
		calculateTotalOrderAmount: (state, action) => {
			const arr = [];
			state.orderHistory.map((item) => {
				const { orderAmount } = item;
				return arr.push(orderAmount);
			});
			const totalAmount = arr.reduce((a, b) => {
				return a + b;
			}, 0);
			state.totalOrderAmount = totalAmount;
		},
	},
});

export const orderAction = orderSlice.actions;

export default orderSlice;
