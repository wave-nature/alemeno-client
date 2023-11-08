import { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";

import classes from "./Home.module.css";
import { getCourses } from "../api/courses";
import CourseCard from "../components/CourseCard";
import Search from "../components/Search";
import Loader from "../components/Loader";
import { CourseResponse } from "../types/courses";

function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(true);

  const lastEl = useRef(null);

  const handleObserver = useCallback((entries: any[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    if (loader) return;
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (lastEl.current) observer.observe(lastEl.current);
  }, [handleObserver, loader]);

  useEffect(() => {
    getAllCourses();
  }, []);

  async function getAllCourses() {
    const { data, error } = await getCourses();
    setLoader(false);
    if (error) {
      toast.error("Error fetching courses");
    } else {
      setCourses(data);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <div className="w-full">
      <Search search={search} onChange={onChange} />
      {loader ? (
        <Loader />
      ) : (
        <div className={`grid w-full ${classes["home"]}`}>
          {courses
            .filter((course: CourseResponse) => {
              return (
                course.name.toLowerCase().includes(search.toLowerCase()) ||
                course.instructor
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                course.description.toLowerCase().includes(search.toLowerCase())
              );
            })
            .slice(0, page * 10)
            .map((course: CourseResponse) => (
              <CourseCard key={course._id} course={course} />
            ))}
        </div>
      )}

      <div ref={lastEl}></div>
    </div>
  );
}

export default Home;
