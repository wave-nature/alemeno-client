import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Home.module.css";
import CourseCard from "../components/CourseCard";
import Search from "../components/Search";
import Loader from "../components/Loader";
import { CourseResponse } from "../types/courses";
import { getEnrolledCourses } from "../api/courses";
import { AuthState, setEnrolledCourses } from "../store/slices/authSlice";

function EnrolledCourses() {
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const { enrolledCourses } = useSelector(
    (state: any) => state.auth as AuthState
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getMyCourses();
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

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  if (!loader && enrolledCourses.length === 0)
    return (
      <h1 className="text-center mt-3 text-white">No Enrolled Courses Found</h1>
    );
  return (
    <div className="w-full">
      <Search search={search} onChange={onChange} />
      {loader ? (
        <Loader />
      ) : (
        <div className={`grid w-full ${classes["home"]}`}>
          {enrolledCourses
            .filter((data: any) => {
              const course: CourseResponse = data.course;
              return (
                course.name.toLowerCase().includes(search.toLowerCase()) ||
                course.instructor
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                course.description.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((data: any) => {
              const course: CourseResponse = data.course;
              return (
                <CourseCard
                  key={course._id}
                  course={course}
                  status={data?.enrollmentStatus}
                  enrollmentId={data?._id}
                  getMyCourses={getMyCourses}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
