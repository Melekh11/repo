import { api } from "../helpers/api";
import { type LoginValues } from "../pages/Login";
import { type RegisterValues } from "../pages/Register";
import { type User, type UserPosition } from "../redux/slices/user";
import { type OrgFromServer } from "./org";

export interface RegisterUserData {
  id: number;
  name: string;
  surname: string;
  login: string;
  email: string;
  positions: UserPosition[];
}

async function register (user: RegisterValues): Promise<RegisterUserData> {
  const requestParams: RequestInit = {
    method: "POST",
    mode: "cors",
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };
  return await api<RegisterUserData>("/signup", requestParams);
}

async function login (user: LoginValues) {
  const requestParams: RequestInit = {
    method: "POST",
    mode: "cors",
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return await api<RegisterUserData>("/signin", requestParams);
}

async function changeUserData (newUser: User & { password?: string }) {
  const requestParams: RequestInit = {
    method: "PATCH",
    mode: "cors",
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  };

  return await api<RegisterUserData>(`/user/${newUser.id}`, requestParams);
}

async function getUserData (id: number) {
  const requestParams: RequestInit = {
    method: "GET",
    mode: "cors",
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: { "Content-Type": "application/json" }
  };

  return await api<RegisterUserData>(`/user/${id}`, requestParams);
}

async function createPosition (userLogin: string, orgName: string, posName: string) {
  const requestParams: RequestInit = {
    method: "POST",
    mode: "cors",
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_login: userLogin,
      org_name: orgName,
      status_id: posName === "moder" ? 2 : 1 // 2 - moder 1 - user
    })
  };

  return await api<{ org: OrgFromServer; user: RegisterUserData }>(
    `/add-user`,
    requestParams
  );
}

export const userModel = {
  register,
  login,
  changeUserData,
  getUserData,
  createPosition
};
