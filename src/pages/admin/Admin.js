import React from "react";
import "./Admin.css";
import NavBar from "../../components/adminNavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "../../components/Loader";

const Home = lazy(() => import("../../components/admin/Home"));
const ViewProducts = lazy(() => import("../../components/admin/ViewProducts"));
const Order = lazy(() => import("../../components/admin/Order"));
const AddProducts = lazy(() => import("../../components/admin/AddProducts"));
const OrderDetails = lazy(() => import("../../components/admin/OrderDetails"));

const Admin = () => {
	return (
		<div className="admin">
			<div className="navbar">
				<NavBar />
			</div>
			<div className="adminContent">
				<Suspense fallback={<LoadingSpinner />}>
					<Routes>
						<Route path="home" element={<Home />} />
						<Route path="add-product/:id" element={<AddProducts />} />
						<Route path="all-products" element={<ViewProducts />} />
						<Route path="orders" element={<Order />} />
						<Route path="order-details/:id" element={<OrderDetails />} />
					</Routes>
				</Suspense>
			</div>
		</div>
	);
};

export default Admin;
