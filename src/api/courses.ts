import axios from "axios";

import { config, server } from "../env";
import {
  EnrollCoursePayload,
  StatusUpdateCoursePayload,
} from "../types/courses";

export async function getCourses() {
  let error = false,
    data;

  try {
    const response = await axios.get(`${server}/api/courses`);
    data = response.data.courses;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = true;
      console.log(err.response?.data);
    }
  }

  return { error, data };
}

export async function getCourse(courseId: string) {
  let error = false,
    data;

  try {
    const response = await axios.get(`${server}/api/courses/${courseId}`);
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = true;
      console.log(err.response?.data);
    }
  }

  return { error, data };
}

export async function updateStatusOfCourse(payload: StatusUpdateCoursePayload) {
  let error = false,
    data;

  try {
    const response = await axios.patch(
      `${server}/api/courses/update-status`,
      payload,
      config()
    );
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = true;
      console.log(err.response?.data);
    }
  }

  return { error, data };
}

export async function enrollIntoCourse(payload: EnrollCoursePayload) {
  let error = false,
    data;

  try {
    const response = await axios.post(
      `${server}/api/enroll`,
      payload,
      config()
    );
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = true;
      console.log(err.response?.data);
    }
  }

  return { error, data };
}

export async function getEnrolledCourses() {
  let error = false,
    data;

  try {
    const response = await axios.get(`${server}/api/enroll/mine`, config());
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = true;
      console.log(err.response?.data);
    }
  }

  return { error, data };
}

export async function likeCourse(courseId: string) {
  let error = false,
    data;

  try {
    const response = await axios.patch(
      `${server}/api/courses/like/${courseId}`,
      {},
      config()
    );
    data = response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error = true;
      console.log(err.response?.data);
    }
  }

  return { error, data };
}
