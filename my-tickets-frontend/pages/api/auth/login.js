// import {sign} from "jsonwebtoken"
// var Cookies = require('cookies')
import { parseCookies, setCookie, destroyCookie } from "nookies";

export default async function handler(req, res) {
  //Get current cookies
  const cookies = parseCookies({ req });
  console.log(cookies.jwt);
  const { username, password } = JSON.parse(req.body);

  // Set log in info to the username and password provided
  const loginInfo = {
    identifier: username,
    password: password,
  };

  //The "real" api call to strapi for authentication
  const login = await fetch("http://localhost:1337/api/auth/local", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });

  const loginResponse = await login.json();

  // Sets the browsers http only cookie to the jwt recieved from strapi
  setCookie({ res }, "jwt", loginResponse.jwt, {
    secure: process.env.NODE_ENV === "production",
    maxAge: 72576000,
    httpOnly: true,
    path: "/",
  });

  // Response to client
  res.status(200).json({ message: "success" });
}
