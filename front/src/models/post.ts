import { api } from "../helpers/api";
import { type PostValues } from "../pages/CreatePost";
import { OrgValues } from "../pages/CreateOrg";
import { type Dayjs } from "dayjs";

async function createPost (postData: PostValues & ({ startData: Dayjs }), orgName: string) {
  const requestParams: RequestInit = {
    method: "POST",
    mode: 'cors',
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: postData.name,
      date_start: `${postData.startData.year()}-${postData.startData.month() + 1}-${postData.startData.date()}`,
      delta_time: postData.saveTime,
      short_desc: postData.desc,
      org_name: orgName
    })
  }

  return await api<Record<string, never>>('/post', requestParams);
}

export interface PostFromServer {
  id: number,
  name: string,
  'date_publish': string,
  'date_start': string,
  'short_desc': string,
  'id_org': number,
  'org_name': string
}

async function getAllPosts () {
  const requestParams: RequestInit = {
    method: "GET",
    mode: 'cors',
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: { 'Content-Type': 'application/json' }
  }

  return await api<PostFromServer[]>('/posts', requestParams)
}

export const postModel = {
  createPost,
  getAllPosts
}
