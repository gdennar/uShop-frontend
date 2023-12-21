import React, { useState, useEffect } from "react";
import { useTheme, useMediaQuery, Button } from "@mui/material";
import { Container } from "@mui/material";
import classes from "./Header.module.css";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavDrawer from "./NavDrawer";
import { AdminLink } from "./adminRoute/AdminRoute";
import { cartAction } from "../store/CartSlice";

function Header() {
  const [scrollPage, setScrollPage] = useState(false);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

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

  return (
    <section
      className={`${classes.sectionContainer} ${
        scrollPage ? classes.headerFixed : null
      }`}
    >
      <Container maxWidth="xl">
        <div className={classes.navBar}>
          <div className={classes.logo}>Ushop</div>

          <div className={classes.nav}>
            {isMatch ? (
              <NavDrawer />
            ) : (
              <>
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
                  <p className="navText">Home</p>
                </NavLink>
                <NavLink to="#products" className={navStyle}>
                  <p className="navText">Products</p>
                </NavLink>
                <NavLink to="#about" className={navStyle}>
                  <p className="navText">About us</p>
                </NavLink>
                <NavLink to="#blog" className={navStyle}>
                  <p className="navText">Blog</p>
                </NavLink>
                <NavLink to="contact" className={navStyle}>
                  <p className="navText">Contact Us</p>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
export default Header;
