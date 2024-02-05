import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { adminNavData } from "../../data/AdminNavData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import classes from "./NavBar.module.css";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [showNav, setShowNav] = useState(true);
  const adminUserName = useSelector((state) => state.auth.userName);

  return (
    <div className={classes.navbarr}>
      <div className={classes.user}>
        <AccountCircleIcon
          sx={{
            fontSize: "50px",
          }}
        />
        {adminUserName}
      </div>
      <nav>
        <ul>
          {adminNavData.map((item) => {
            return (
              <li
                key={item.id}
                className=""
                onClick={() => setShowNav(!showNav)}
              >
                <NavLink to={item.path} className={classes["nav-link"]}>
                  <div className={classes.text}>{item.text}</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
