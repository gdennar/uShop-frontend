import * as React from "react";
import { Typography, Toolbar } from "@mui/material";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <section className={classes.navBar}>
      <Toolbar>
        <Typography
          sx={{
            mr: 2,
            fontFamily: "monospace",
            letterSpacing: ".1rem",
            color: "white",
            textDecoration: "none",
            fontWeight: "12px",
          }}
        >
          &copy;{`${"Copyright Golden "}${new Date().getFullYear()}`}
        </Typography>
      </Toolbar>
    </section>
  );
}

export default Footer;
