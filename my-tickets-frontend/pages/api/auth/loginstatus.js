// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { parseCookies, setCookie, destroyCookie } from "nookies";

export default function handler(req, res) {
    const cookies = parseCookies({req})
    console.log(cookies)
    res.status(200).json({ name: 'John Doe' })
  }
  