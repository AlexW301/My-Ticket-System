// import {sign} from "jsonwebtoken"
// var Cookies = require('cookies')
import { parseCookies, setCookie, destroyCookie } from "nookies";

export default async function handler(req, res) {
  const { username, password, email } = JSON.parse(req.body);

  const registerInfo = {
      username: username,
      email: email,
      password: password
  }

  console.log(username, password, email)
  const register = await fetch("http://localhost:1337/api/auth/local/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerInfo),
  });
  if(register.status === 200) {
    res.status(200).json({message: 'You have successfully registered!'});
  } else {
    res.status(register.status).json({message: 'You have failed to registered!'});
  }
}