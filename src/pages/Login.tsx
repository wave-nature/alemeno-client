import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import classes from "./Auth.module.css";
import { login } from "../api/auth";
import { setUser } from "../store/slices/authSlice";
import { getEnrolledCourses } from "../api/courses";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function loginHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) return toast.error("Please fill all the fields");

    const payload = {
      email,
      password,
    };

    const { error, data: userData } = await login(payload);
    if (error) {
      toast.error(userData);
    } else {
      toast.success("Login Success!");

      const { error, data } = await getEnrolledCourses();
      if (error) {
        toast.error("Error fetching enrolled courses");
        return;
      } else {
        const token = userData.token;
        const user = userData.user;
        const enrolledCourses = data.enrolledCourses;

        localStorage.setItem(
          "enrolledCourses",
          JSON.stringify(enrolledCourses)
        );

        dispatch(setUser({ token, user, enrolledCourses }));
        navigate("/");
      }
    }
  }

  return (
    <div className={classes["login"]}>
      <h1>Login</h1>
      <h6>Please Enter Details For Login</h6>

      {/* form */}
      <form className={classes["form"]} onSubmit={loginHandler}>
        <div>
          <input
            className={classes["input"]}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            className={classes["input"]}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span
            className={classes["show_password"]}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="text-lg" />
            ) : (
              <FaEye className="text-lg" />
            )}
          </span>
        </div>

        <button className={classes["btn"]} type="submit">
          Login
        </button>
      </form>

      <div className={classes["sub_text"]}>
        <p>
          New user? Please <Link to="/auth/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
