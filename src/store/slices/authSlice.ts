import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/auth";

const initialState = {
  user: null,
  isLoggedIn: false,
  enrolledCourses: [],
};

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  enrolledCourses: any[];
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = action.payload?.token;
      state.user = action.payload?.user;
      state.enrolledCourses = action.payload?.enrolledCourses;
    },

    removeUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.enrolledCourses = [];
    },

    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
  },
});

export const { setUser, removeUser, setEnrolledCourses } = authSlice.actions;

export default authSlice.reducer;
