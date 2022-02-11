import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";

const Register = () => {

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Calls next api route to login
    const login = async (e) => {
        e.preventDefault()
        const register = await fetch('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({username: name, password: password, email: email})
        })
        if(register.status === 200) {
            const data = await register.json()
            console.log(register)
            router.push('/login')
        } else {
            console.log('You have failed to registered!')
        }
      }
    return (
        <div style={{flexDirection: 'column'}}>
            <p>Register</p>
            <form onSubmit={login} style={{flexDirection: 'column'}}>
                <input type={'text'} placeholder={'Name'} value={name} onChange={(e) => {setName(e.target.value)}} />
                <input type={'text'} placeholder={'Email'} value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <input type={'text'} placeholder={'Password'} value={password} onChange={(e) => {setPassword(e.target.value)}} />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Register;