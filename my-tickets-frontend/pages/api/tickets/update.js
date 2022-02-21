import { parseCookies, setCookie, destroyCookie } from "nookies";

export default async function handler(req, res) {
  const cookies = parseCookies({ req });
  const {status, id} = req.body

  const payload = {
      data: {
        Status: status
      }
  }

  const post = await fetch(`http://localhost:1337/api/tickets/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });
  if(post.status === 200) {
      const data = await post.json()
      res.status(200).json(data);
  } else {
    res.status(200).json({ error: "There was a problem updating your ticket!" });
  }
}