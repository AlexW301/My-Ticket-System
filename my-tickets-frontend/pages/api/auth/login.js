// import {sign} from "jsonwebtoken"
// var Cookies = require('cookies')
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { API_URL } from "../../../config";
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
  const login = await fetch(`${API_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });

  // Response to client if successful login
  if (login.status === 200) {
    const loginResponse = await login.json();
    // Sets the browsers http only cookie to the jwt recieved from strapi
    setCookie({ res }, "jwt", loginResponse.jwt, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 72576000,
      httpOnly: true,
      path: "/",
    });

    // Also Set name and Email in Cookies
    setCookie({ res }, "name", loginResponse.user.username, {
      secure: process.env.NODE_ENV === "production",
      maxAge: 72576000,
      httpOnly: true,
      path: "/",
    });

    setCookie({ res }, "email", loginResponse.user.email, {
        secure: process.env.NODE_ENV === "production",
        maxAge: 72576000,
        httpOnly: true,
        path: "/",
      });
    res.status(200).json(loginResponse);
  } else {
    res.status(400).json({ error: "Wrong Log in Information" });
  }
}
