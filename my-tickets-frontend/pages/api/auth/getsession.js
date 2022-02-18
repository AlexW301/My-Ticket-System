import { parseCookies, setCookie, destroyCookie } from "nookies";

export default async function handler(req, res) {
  const cookies = parseCookies({ req });
  const token = cookies.jwt
    if (token) {
        res.status(200).json({token: token});
    } else {
        res.status(400).json({error: 'not authenticated'});
    }

}