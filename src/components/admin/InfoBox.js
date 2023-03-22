import { Grid, Paper } from "@mui/material";
import React from "react";
import "./InfoBox.css";

const InfoBox = (props) => {
	const { data } = props;
	return (
		<Grid container spacing={2} p={2}>
			{data.map((item) => (
				<Grid item xs={12} sm={6} md={4} key={item.title}>
					<Paper className={`info-box-paper ${item.className}`}>
						<div className="dashboard-items">
							<div className="dashboard-status">
								<b>{item.title}</b>
							</div>
							<div className="dashboard-icon">{item.icon}</div>
						</div>
						<div className="dashboard-item">{item.count}</div>
					</Paper>
				</Grid>
			))}
		</Grid>
	);
};

export default InfoBox;
