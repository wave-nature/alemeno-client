import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import classes from "./Header.module.css";
import { AuthState, removeUser } from "../store/slices/authSlice";

function Header() {
  const { isLoggedIn, user } = useSelector(
    (state: any) => state.auth as AuthState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    Cookies.remove("token");
    localStorage.clear();

    dispatch(removeUser());
    toast.success("Logged out successfully");
    navigate("/", {
      replace: true,
    });
  }

  return (
    <header className={classes["header"]}>
      <Link className={classes["header_title"]} to="/">
        Alemeno
      </Link>

      {isLoggedIn ? (
        <div className="flex gap-2 items-center gap-3">
          {window.innerWidth > 500 && (
            <div className={classes["header_title"]}>{user?.username}</div>
          )}
          <Link
            to="/student/dashboard"
            className={`${classes["btn"]} ${classes["login"]}`}
          >
            My Courses
          </Link>
          <button
            className={`${classes["btn"]} ${classes["signup"]}`}
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            to="/auth/login"
            className={`${classes["btn"]} ${classes["login"]}`}
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className={`${classes["btn"]} ${classes["signup"]}`}
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
