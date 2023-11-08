import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

import { AuthState, removeUser, setUser } from "./store/slices/authSlice";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import AuthRoutes from "./routes/AuthRoutes";
import Layout from "./components/Layout";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isLoggedIn } = useSelector((state: any) => state.auth as AuthState);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const token = !!Cookies.get("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const enrolledCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );

    if (token && Object.keys(user).length) {
      dispatch(setUser({ token, user, enrolledCourses }));
    } else {
      dispatch(removeUser());
    }
    navigate("/");
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Layout>
      <Routes>
        {isLoggedIn ? (
          <Route path="/student/*" element={<PrivateRoute />} />
        ) : (
          <Route path="/auth/*" element={<AuthRoutes />} />
        )}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
      <ToastContainer
        style={{ fontSize: "1.6rem" }}
        position="top-center"
        autoClose={1500}
      />
    </Layout>
  );
}

export default App;
