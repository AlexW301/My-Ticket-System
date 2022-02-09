// import {sign} from "jsonwebtoken"


export default async function handler(req, res) {
    const {username, password} = JSON.parse(req.body)
    console.log(username)
      const loginInfo = {
      identifier: username,
      password: password
  }

  const login = await fetch('http://localhost:1337/api/auth/local', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginInfo)
  })

  const loginResponse = await login.json()
    res.status(200).json(loginResponse)
}