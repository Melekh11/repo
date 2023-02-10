import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface UserPosition {
  orgId: number;
  status: "moder" | "user";
  org: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  login: string;
  email: string;
  positions: UserPosition[];
}

const initialState = {
  user: {
    id: 0,
    name: "",
    surname: "",
    login: "",
    email: "",
    positions: [] as UserPosition[]
  },
  loggedIn: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<User, "loggedIn">>) => {
      console.log(action.payload, action.payload.id);
      state.loggedIn = true;
      state.user = action.payload;
      state.user.id = action.payload.id;
      state.user.positions = action.payload.positions;
    },
    deleteUser: (state) => {
      state.user.id = 0;
      state.user.name = "";
      state.user.surname = "";
      state.user.email = "";
      state.user.positions = [];
      state.loggedIn = false;
    }
  }
});

export const { setUser, deleteUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.user.user;
export const loggedInSelector = (state: RootState) => state.user.loggedIn;
export default userSlice.reducer;
