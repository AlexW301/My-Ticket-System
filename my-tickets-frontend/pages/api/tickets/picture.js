import { parseCookies, setCookie, destroyCookie } from "nookies";

export default async function handler(req, res) {
  const cookies = parseCookies({ req });
  console.log(req.body);
  console.log(cookies.jwt);
  const formData = new FormData();

  formData.append("files", image);

  formData.append("ref", "Picture");
  formData.append("refId", ticket.id);
  formData.append("field", "image");

  const post = await fetch(`http://localhost:1337/upload`, formData);
  if (post.status === 200) {
    const data = await post.json();
    res.status(200).json(data);
  } else {
    res.status(200).json({ error: "There was a problem uploading!" });
  }
  res.status(200).json({ error: "There was a problem uploading!" });
}
