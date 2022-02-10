import { parseCookies, setCookie, destroyCookie } from "nookies";
import nookies from "nookies"

export default async function handler(req, res) {
  //Get current cookies
  const cookies = parseCookies({ req });

  // Sets all cookies including jwt to deleted
  setCookie({ res }, "name", 'deleted', {
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    httpOnly: true,
    path: "/",
  });

  setCookie({ res }, "email", 'deleted', {
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    httpOnly: true,
    path: "/",
  });

  setCookie({ res }, "jwt", 'deleted', {
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    httpOnly: true,
    path: "/",
  });

  res.status(200).json({ message: "You have successfully logged out" });
}
