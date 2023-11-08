import { Route, Routes, useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

import EnrolledCourses from "../pages/EnrolledCourses";
import { AuthState } from "../store/slices/authSlice";

function PrivateRoute() {
  const { isLoggedIn } = useSelector((state: any) => state.auth as AuthState);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <Routes>
      <Route path="/dashboard" element={<EnrolledCourses />} />
    </Routes>
  );
}

export default PrivateRoute;
