import React, { useEffect, useState } from "react";
import Search from "../home/Search";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import classes from "./Categories.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { authAction } from "../../store/authSlice";
import { Container } from "@mui/material";
import { filterAction } from "../../store/filterSlice";
import { AiOutlineHeart } from "react-icons/ai";

const Categories = () => {
  const [search, setSearch] = useState("");
  const [displayUName, setDisplayUName] = useState("");
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterAction.filterBySearch({ products, search }));
  }, [dispatch, products, search]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const displayEmail = user.email.split("@")[0];
          const uName =
            displayEmail.charAt(0).toUpperCase() + displayEmail.slice(1);
          setDisplayUName(uName);
        } else {
          setDisplayUName(user?.displayName);
        }
        dispatch(
          authAction.setActiveUser({
            email: user?.email,
            userName: displayUName,
            userID: user?.uid,
          })
        );
      } else {
        setDisplayUName("");
        dispatch(authAction.removeActiveUser());
      }
    });
  });

  return (
    <section>
      <Container maxWidth="xl">
        <div className={classes.categoryContainer}>
          <div className={classes.searchContainer}>
            <Search
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className={classes.displayContainer}>
            {isUserLoggedIn ? (
              <NavLink to="/orders" className={classes.navLink}>
                <p className={classes.navText}>
                  HI,
                  <span className={classes.displayName}> {displayUName}</span>
                </p>
              </NavLink>
            ) : (
              ""
            )}

            <div className={classes.wishList}>
              <AiOutlineHeart style={{ color: "#F05941" }} />
              <span>wishlist</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Categories;
