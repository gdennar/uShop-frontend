import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
	return (
		<div className="not-found">
			<div>
				<h3>404</h3>
				<p>Oops! Page not found</p>
				<Button variant="contained">
					<Link to="/" style={{ color: "white" }}>
						&larr; Back To Home
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
