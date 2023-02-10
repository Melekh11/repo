import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "../../hooks/useRedux";
import { type RootState } from "../store";

const initialState = { loading: false };

const orgSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    closeLoading: (state) => {
      state.loading = false;
    }
  }
});

export const loaderSelector = (state: RootState) => state.loader.loading;
export default orgSlice.reducer;
export const { setLoading, closeLoading } = orgSlice.actions;
