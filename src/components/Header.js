import React, { useState, useEffect } from "react";
import {
	AppBar,
	Box,
	useTheme,
	useMediaQuery,
	Toolbar,
	Button,
} from "@mui/material";
import { Container } from "@mui/material";
import logo from "../assests/uShop-logo.png";
import classes from "./Header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/authSlice";
import NavDrawer from "./NavDrawer";
import { AdminLink } from "./adminRoute/AdminRoute";
import { cartAction } from "../store/CartSlice";

function Header() {
	const [displayUName, setDisplayUName] = useState("");
	const [scrollPage, setScrollPage] = useState(false);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const cartTotalQuantity = useSelector(
		(state) => state.cart.cartTotalQuantity
	);

	const navStyle = ({ isActive }) =>
		isActive ? classes.hActive : classes.navLink;

	const dispatch = useDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(cartAction.calculateCartQuantity());
	}, [dispatch]);

	const fixNavBar = () => {
		if (window.scrollY > 30) {
			setScrollPage(true);
		} else {
			setScrollPage(false);
		}
	};
	window.addEventListener("scroll", fixNavBar);

	const logoutHandler = () => {
		signOut(auth)
			.then(() => {
				toast.success("Logged out successfully");
				navigate("/login");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				if (user.displayName == null) {
					const displayEmail = user.email.split("@")[0];
					const uName =
						displayEmail.charAt(0).toUpperCase() + displayEmail.slice(1);
					setDisplayUName(uName);
				} else {
					setDisplayUName(user.displayName);
				}
				dispatch(
					authAction.setActiveUser({
						email: user.email,
						userName: displayUName,
						userID: user.uid,
					})
				);
			} else {
				setDisplayUName("");
				dispatch(authAction.removeActiveUser());
			}
		});
	});

	return (
		<section className={scrollPage ? classes.headerFixed : null}>
			<ToastContainer />
			<AppBar position="static" className={classes.navBar}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						{/* Desktop Menu */}
						<Link to="/">
							<Box>
								<img src={logo} width={150} alt="logo" />
							</Box>
						</Link>
						{isMatch ? (
							<NavDrawer />
						) : (
							<>
								<Box sx={{ m: 1, display: { xs: "none", md: "flex" } }}>
									<AdminLink>
										<Button
											sx={{
												backgroundColor: "#ffb700",
												"&:hover": {
													border: "2px solid #ffb700",
													color: "#ffb700",
													backgroundColor: "white",
												},
											}}
											variant="contained"
											size="small"
											onClick={() => {
												navigate("/admin/home");
											}}
										>
											Admin
										</Button>
									</AdminLink>
									<NavLink to="/" className={navStyle} end>
										<p className="nav-text">Home</p>
									</NavLink>
									{/* <NavLink to="#products" className={navStyle}>
										<p className="nav-text">Products</p>
									</NavLink> */}
									<NavLink to="contact" className={navStyle}>
										<p className="nav-text">Contact Us</p>
									</NavLink>
								</Box>

								{/* Right hand Menu */}
								<Box sx={{ flexGrow: 0, display: "flex", marginLeft: "auto" }}>
									{isUserLoggedIn ? (
										<NavLink to="" className={navStyle}>
											<p className="nav-text">
												HI,
												<span>{displayUName}</span>
											</p>
										</NavLink>
									) : (
										""
									)}
									{isUserLoggedIn && (
										<NavLink to="/order-history" className={navStyle}>
											<p>My Orders</p>
										</NavLink>
									)}
									<NavLink to="/cart" className={navStyle}>
										<p>
											<ShoppingCartIcon />
											<span className={classes.cartQuantity}>
												{cartTotalQuantity}
											</span>
										</p>
									</NavLink>
									{!isUserLoggedIn && (
										<NavLink to="/login" className={navStyle}>
											<p>LOGIN</p>
										</NavLink>
									)}
									{isUserLoggedIn && (
										<div className={classes.navLink}>
											<p>
												<LogoutIcon onClick={logoutHandler} />
											</p>
										</div>
									)}
								</Box>
							</>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</section>
	);
}
export default Header;
