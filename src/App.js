import { Route, BrowserRouter, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import SpinnerImg from "../src/assests/spinner.jpg";

const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./pages/home/Home"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Reset = lazy(() => import("./pages/auth/Reset"));
const AdminRoute = lazy(() => import("./components/adminRoute/AdminRoute"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const ProductDetails = lazy(() =>
	import("./components/product/ProductDetails")
);
const Cart = lazy(() => import("./pages/cart/Cart"));
const CheckoutDetails = lazy(() => import("./pages/checkout/CheckoutDetails"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/checkout/CheckoutSuccess"));
const OrderHistory = lazy(() => import("./pages/orderHistory/OrderHistory"));
const OrderDetails = lazy(() => import("./pages/orderDetails/OrderDetails"));
const ReviewProducts = lazy(() =>
	import("./components/reviewProducts/ReviewProducts")
);
const NotFound = lazy(() => import("./pages/notFound/NotFound"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
	return (
		<>
			<BrowserRouter>
				<Suspense
					fallback={
						<div className="lazy-loading">
							<img
								src={SpinnerImg}
								alt="Loading..."
								style={{ width: "50px" }}
							/>
						</div>
					}
				>
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/reset-password" element={<Reset />} />

						<Route
							path="/admin/*"
							element={
								<AdminRoute>
									<Admin />
								</AdminRoute>
							}
						/>
						<Route path="/product-details/:id" element={<ProductDetails />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/checkout-details" element={<CheckoutDetails />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/checkout-success" element={<CheckoutSuccess />} />
						<Route path="/order-history" element={<OrderHistory />} />
						<Route path="/order-details/:id" element={<OrderDetails />} />
						<Route path="/review-product/:id" element={<ReviewProducts />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
					<Footer />
				</Suspense>
			</BrowserRouter>
		</>
	);
}

export default App;
