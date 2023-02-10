import { api } from "../helpers/api"
import { type ReviewValues } from "../pages/CreateReview"

// id_post", type=int)
// parser.add_argument("help_desc", type=str)
// parser.add_argument("contacts", type=str)
// parser.add_argument("time_option", type=str)
// parser.add_argument("make_better_desc"

async function createRew (rewData: ReviewValues, idPost: number) {
  const requestParams: RequestInit = {
    method: "POST",
    mode: 'cors',
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id_post: idPost,
      help_desc: rewData.helpDesc,
      contacts: rewData.contacts,
      time_option: rewData.timeOption,
      make_better_desc: rewData.helpDesc
    })
  }

  console.log(idPost);

  return await api<Record<string, never>>('/review', requestParams)
}

export const rewModal = {
  createRew
}
