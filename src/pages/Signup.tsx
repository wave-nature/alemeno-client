import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

import classes from "./Auth.module.css";
import { signup } from "../api/auth";
import { setUser } from "../store/slices/authSlice";
import { getEnrolledCourses } from "../api/courses";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function registerHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password || !username)
      return toast.error("Please fill all the fields");

    const payload = {
      username,
      email,
      password,
    };

    const { error, data: userData } = await signup(payload);
    if (error) {
      toast.error("Something went wrong");
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
      <h1>Sign Up</h1>
      <h6>Please Enter Details For New User</h6>

      {/* form */}
      <form className={classes["form"]} onSubmit={registerHandler}>
        <div>
          <input
            className={classes["input"]}
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
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
            type="password"
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
          Sign Up
        </button>
      </form>

      <div className={classes["sub_text"]}>
        <p>
          Already have account? Please <Link to="/auth/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
