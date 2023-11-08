import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import classes from "./CourseDetail.module.css";
import { CourseResponse } from "../types/courses";
import { enrollIntoCourse, getEnrolledCourses } from "../api/courses";
import { AuthState, setEnrolledCourses } from "../store/slices/authSlice";
import Loader from "../components/Loader";

function CourseDetail() {
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const { isLoggedIn, enrolledCourses } = useSelector(
    (state: any) => state.auth as AuthState
  );
  const [tab, setTab] = useState("name");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) getMyCourses();
  }, []);

  async function getMyCourses() {
    setLoader(true);
    const { data, error } = await getEnrolledCourses();
    setLoader(false);
    if (error) {
      toast.error("Error fetching courses");
    } else {
      dispatch(setEnrolledCourses(data.enrolledCourses));
    }
  }

  const course: CourseResponse = location.state.course;

  async function enrollCourseHandler() {
    if (!isLoggedIn) {
      toast.error("Please login to enroll into course");
      setTimeout(() => {
        navigate("/auth/login", {
          replace: true,
        });
      }, 1000);
      return;
    }
    const payload = {
      courseId: course._id,
    };
    setLoader(true);
    const { error } = await enrollIntoCourse(payload);
    if (error) {
      toast.error("Error enrolling into course");
    } else {
      toast.success("Enrolled into course");
    }
    getMyCourses();
  }

  return (
    <div className={classes["container"]}>
      <div className={classes["img_container"]}>
        <img className={classes["img"]} src={course.thumbnail} alt="img" />
      </div>

      <div>
        {loader ? (
          <Loader />
        ) : enrolledCourses.find((data) => data.course?._id === course._id) ? (
          <button className={`${classes["btn"]} ${classes["not-enrolled"]}`}>
            Enrolled
          </button>
        ) : (
          <button
            className={`${classes["btn"]} ${classes["not-enrolled"]}`}
            onClick={enrollCourseHandler}
          >
            Enroll Now
          </button>
        )}
      </div>

      <div className={classes["tabs_wrapper"]}>
        {/* tabs */}
        <div className={classes["tabs-container"]}>
          <ul className={classes["tabs"]}>
            {Object.keys(course)
              .filter((key) => !["thumbnail", "_id", "__v"].includes(key))
              .map((key, i) => (
                <li
                  key={i}
                  className={`${classes["tab"]} ${
                    tab === key && classes["tab-active"]
                  }`}
                  onClick={() => setTab(key)}
                >
                  {key}
                </li>
              ))}
          </ul>
        </div>
        {/* active tab */}
        <div className={classes["tab-content"]}>
          <div>
            {tab === "students" || tab === "syllabus"
              ? course[tab].map((item) => (
                  <div className={classes["tab-content-detail"]}>
                    {Object.entries(item).map(([key, val]) => (
                      <div key={key} className={classes["more_content"]}>
                        <span>{key}</span>
                        <span className={classes["more_content-value"]}>
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                ))
              : course[tab as keyof CourseResponse]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
