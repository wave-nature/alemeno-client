import { useEffect, useState } from "react";
import { FaClock, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import classes from "./CourseCard.module.css";
import { CourseResponse } from "../types/courses";
import { AuthState } from "../store/slices/authSlice";
import { likeCourse, updateStatusOfCourse } from "../api/courses";

function CourseCard({
  course,
  status,
  enrollmentId,
  getMyCourses,
}: {
  course: CourseResponse;
  status?: string;
  enrollmentId?: string;
  getMyCourses?: () => void;
}) {
  const { isLoggedIn, user } = useSelector(
    (state: any) => state.auth as AuthState
  );
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout: any;
    // register like when component unmounts
    const likeAfterPause = () => {
      if (liked) {
        registerLike();
        return;
      } else {
        clearTimeout(timeout);
      }
    };

    timeout = setTimeout(likeAfterPause, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [liked]);

  async function likeHandler() {
    if (!isLoggedIn) return toast.error("Please login to like course");

    const alreadyLiked = course.likes.includes(user?._id);
    if (alreadyLiked) return;

    setLiked((prev) => !prev);
  }

  async function registerLike() {
    const { error } = await likeCourse(course._id);

    if (error) {
      toast.error("Error liking course");
    }
  }

  async function updateCourseStatus() {
    if (status === "completed") return;
    const payload = {
      enrollmentId,
      status: "completed",
    };

    const { error } = await updateStatusOfCourse(payload);
    if (error) {
      toast.error("Error updating course status");
    }
    getMyCourses!();
  }

  return (
    <div
      className={classes["card"]}
      onClick={(e: any) => {
        const parentEl = e.target?.parentNode?.id;
        const markedAsComplete = e.target?.id === "complete";
        if (parentEl === "like" || markedAsComplete) return;
        navigate(`/courses/${course._id}`, {
          replace: true,
          state: { course },
        });
      }}
    >
      <div className={classes["img_container"]}>
        <img className={classes["img"]} src={course.thumbnail} alt="img" />
      </div>

      <div className={classes["course_container"]}>
        <h3>{course.name}</h3>
        <h6>{course.instructor}</h6>
      </div>

      <div className={classes["course_stats_container"]}>
        {/* likes */}
        <div id="like" className={classes["stats_data"]} onClick={likeHandler}>
          <FaHeart
            id="like"
            className={`${classes["like"]} ${
              liked || course.likes.includes(user?._id)
                ? classes["like-active"]
                : ""
            }`}
          />
          <span>{course.likes.length + (liked ? 1 : 0)} Likes</span>
        </div>
        {/* duration */}
        <div className={classes["stats_data"]}>
          <FaClock />
          <span>{course.duration}</span>
        </div>
      </div>

      {/* progress bar */}
      {enrollmentId && (
        <>
          <div className={`${classes["course_progress"]}`}>
            <div
              className={`${
                status === "progress"
                  ? classes["course_progress_bar"]
                  : classes["course_complete"]
              }`}
            ></div>
          </div>
          <button
            type="button"
            role="button"
            className={classes["btn"]}
            onClick={updateCourseStatus}
            id="complete"
          >
            {status === "progress" ? "Mark as Complete" : "Course Completed"}
          </button>
        </>
      )}
    </div>
  );
}

export default CourseCard;
