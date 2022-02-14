import { parseCookies, setCookie, destroyCookie } from "nookies";

export default async function handler(req, res) {
    const cookies = parseCookies({req});
    console.log(cookies.jwt)
    const post = await fetch("http://localhost:1337/api/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });
  if(post.status === 200) {
      const data = await post.json()
      res.status(200).json(data);
  } else {
    res.status(200).json({ error: "There was a problem submitting your ticket!" });
  }
  }