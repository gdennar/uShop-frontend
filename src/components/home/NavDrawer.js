import { Drawer, IconButton, List, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { sidebarData } from "../../data/SideBarData";
import { NavLink } from "react-router-dom";
import classes from "./NavDrawer.module.css";

const NavDrawer = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <Drawer open={showNav} onClose={() => setShowNav(false)}>
        <Box
          sx={{
            width: "250px",
            height: "100vh",
            backgroundColor: "var(--color-background)",
          }}
        >
          {sidebarData.map((item) => {
            return (
              <List
                onClick={() => setShowNav(!showNav)}
                key={item.id}
                className={classes["sideNav-list"]}
                sx={{
                  m: 2,
                }}
              >
                <NavLink to={item.path} className={classes["nav-link"]}>
                  <span className={classes["nav-icon"]}>{item.icon}</span>
                  <span className={classes["text"]}>{item.text}</span>
                </NavLink>
              </List>
            );
          })}
        </Box>
      </Drawer>
      <IconButton
        sx={{ color: "var(--color-background)", marginLeft: "auto" }}
        onClick={() => setShowNav(!showNav)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default NavDrawer;
