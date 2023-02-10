import { userModel, type RegisterUserData } from "../models/user";
import { type RegisterValues } from "../pages/Register";
import { setUser, type User } from "../redux/slices/user";
import { type AppDispatch } from "../redux/store";
import { setLoading, closeLoading } from "../redux/slices/loading";
import { type LoginValues } from "../pages/Login";

async function register (user: RegisterValues, dispatch: AppDispatch) {
  dispatch(setLoading());

  await userModel
    .register(user)
    .then((user: RegisterUserData) => {
      dispatch(setUser(user));
      dispatch(closeLoading());
    })
    .catch(async (err) => {
      dispatch(closeLoading());
      return await Promise.reject(err);
    });
}

async function login (user: LoginValues, dispatch: AppDispatch) {
  dispatch(setLoading());

  await userModel
    .login(user)
    .then((user: RegisterUserData) => {
      dispatch(setUser(user));
      dispatch(closeLoading());
    })
    .catch(async (err) => {
      dispatch(closeLoading());
      return await Promise.reject(err);
    });
}

async function changeUserData (newUser: User, dispatch: AppDispatch) {
  dispatch(setLoading());

  await userModel
    .changeUserData(newUser)
    .then((user: RegisterUserData) => {
      dispatch(setUser(user));
      dispatch(closeLoading());
    })
    .catch(async (err) => {
      dispatch(closeLoading());
      return await Promise.reject(err);
    });
}

async function changeUserPassword (
  userData: User & { password: string },
  dispatch: AppDispatch
) {
  dispatch(setLoading());

  await userModel
    .changeUserData({ ...userData })
    .then((user: RegisterUserData) => {
      dispatch(setUser(user));
      dispatch(closeLoading());
    })
    .catch(async (err) => {
      dispatch(closeLoading());
      return await Promise.reject(err);
    });
}

async function getUserData (id: number, dispatch: AppDispatch) {
  dispatch(setLoading());

  await userModel
    .getUserData(id)
    .then((user: RegisterUserData) => {
      dispatch(setUser(user));
      dispatch(closeLoading());
    })
    .catch(async (err) => {
      dispatch(closeLoading());
      return await Promise.reject(err);
    });
}

export const userController = {
  register,
  login,
  changeUserData,
  changeUserPassword,
  getUserData
};
