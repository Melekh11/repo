import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "../../hooks/useRedux";
import { type RootState } from "../store";
import { type PostValues } from "../../pages/CreatePost";

export type PostData = PostValues & { id: number };

const initialState = {
  allPosts: [] as PostData[],
  currentPost: {} as PostData
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostData[]>) => {
      state.allPosts = action.payload;
    },
    setCurrentPost: (state, action: PayloadAction<PostData>) => {
      state.currentPost = action.payload;
    }
  }
});

export const allPostsSelector = (state: RootState) => state.posts.allPosts;
export const currentPostSelector = (state: RootState) =>
  state.posts.currentPost;
export default postSlice.reducer;
export const { setCurrentPost, setPosts } = postSlice.actions;
