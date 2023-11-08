import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CourseDetail from "../pages/CourseDetail";
import PrivateRoute from "./PrivateRoute";
// import AuthRoutes from "./AuthRoutes";

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/courses" element={<Home />} />
      <Route path="/student/*" element={<PrivateRoute />} />
      <Route path="/*" element={<Home />} />
      {/* <Route path="/auth" element={<AuthRoutes />} /> */}
    </Routes>
  );
}

export default PublicRoutes;
