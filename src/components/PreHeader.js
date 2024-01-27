import classes from "./PreHeader.module.css";
import HelpIcon from "@mui/icons-material/Help";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const PreHeader = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();

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

  return (
    <section>
      <div className={classes.bgColor}>
        <div className={classes.contact}>
          <p>
            <HelpIcon fontSize="1rem" />
            online help
          </p>
          <p>
            <HeadsetMicIcon fontSize="1rem" />
            +2348035103956
          </p>
        </div>

        <div className={classes.order}>
          {isUserLoggedIn && (
            <NavLink to="/order-history">
              <p className={classes.navText}>Track Orders</p>
            </NavLink>
          )}
          <p>EN</p>
          <p>USD</p>
          {!isUserLoggedIn && (
            <NavLink to="/login" className={classes.login}>
              <p>Login</p>
            </NavLink>
          )}
          {isUserLoggedIn && (
            <div className={classes.navLink}>
              <p>
                <LogoutIcon onClick={logoutHandler} />
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreHeader;
