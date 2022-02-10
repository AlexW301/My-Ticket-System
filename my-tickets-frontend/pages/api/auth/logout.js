import { parseCookies, setCookie, destroyCookie } from "nookies";

export default async function handler(req, res) {
  //Get current cookies
  const cookies = parseCookies({ req });
  console.log(cookies.jwt);
  

    res.status(200).json({message: 'You have successfully logged out'});
}