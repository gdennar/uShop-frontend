import * as React from "react";
import { Typography, Toolbar } from "@mui/material";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <section className={classes.navBar}>
      <Toolbar>
        <Typography
          className={classes.navBarTypography} // Add the class here
        >
          &copy;{`${"Copyright Golden "}${new Date().getFullYear()}`}
        </Typography>
      </Toolbar>
    </section>
  );
}

export default Footer;
