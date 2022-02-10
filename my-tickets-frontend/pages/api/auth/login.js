// import {sign} from "jsonwebtoken"
// var Cookies = require('cookies')
import { parseCookies, setCookie, destroyCookie } from "nookies";
var cookieParser = require("cookie-parser");
import { serialize } from "cookie";
import Cookies from "js-cookie";

export default async function handler(req, res) {
  const { username, password } = JSON.parse(req.body);

  const loginInfo = {
    identifier: username,
    password: password,
  };

  const login = await fetch("http://localhost:1337/api/auth/local", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });

  const loginResponse = await login.json();

  setCookie({ res }, "jwt", loginResponse.jwt, {
    secure: process.env.NODE_ENV === "production",
    maxAge: 72576000,
    httpOnly: true,
    path: "/",
  });
  res.status(200).json({message: 'success'});
}
