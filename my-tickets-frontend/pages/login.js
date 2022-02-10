import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useState } from 'react';
import { useRouter } from "next/router";

const Login = () => {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Calls next api route to login
    const login = async (e) => {
        e.preventDefault()
        const signin = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({username: email, password: password})
        })
        if(signin.status === 200) {
            const data = await signin.json()
            console.log(signin)
            router.push('/')
        } else {
            console.log('Error Signing in, try different password')
        }
      }
    return (
        <div style={{flexDirection: 'column'}}>
            <p>Login</p>
            <form onSubmit={login} style={{flexDirection: 'column'}}>
                <input type={'text'} placeholder={'Email'} value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <input type={'text'} placeholder={'Password'} value={password} onChange={(e) => {setPassword(e.target.value)}} />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login;