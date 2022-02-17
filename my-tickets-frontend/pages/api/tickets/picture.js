import { parseCookies, setCookie, destroyCookie } from "nookies";

export default async function handler(req, res) {
  const cookies = parseCookies({ req });

  const upload = await fetch(`http://localhost:1337/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
    body: req.body
  });
    const data = await upload.json()
    console.log(data)
    res.status(200).json(data);

}
