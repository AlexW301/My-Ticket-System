import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useState } from 'react';
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import styles from "../styles/Register.module.scss";
import Link from "next/link";
import { Button, Typography, TextField, Paper, Container, Checkbox, FormControlLabel } from "@mui/material";
import {Link as MUILink} from "@mui/material"
//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const router = useRouter();

    const error = () => toast.error("Try a different email");

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    //Calls next api route to login
    const register = async (e) => {
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
            error()
        }
      }
    return (
        <Layout title={'Create Account'}>
        <Container className={styles.container}>
        <ToastContainer />
        <Typography variant="h4" style={{marginBottom: '1rem'}}>Create an Account</Typography>
        <Typography variant="h7" style={{ lineHeight: '1.7' }}>After you create your account you will be able to submit an IT ticket</Typography>
            <Paper className={styles.card}>
            <Typography variant="h5">Sign Up</Typography>
            <form className={styles.form} onSubmit={register} style={{flexDirection: 'column'}}>
                <TextField type={'text'} placeholder={'Name'} value={name} onChange={(e) => {setName(e.target.value)}} />
                <TextField type={'email'} placeholder={'Email'} value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <TextField type={showPassword ? 'text' : 'password'} placeholder={'Password'} value={password} onChange={(e) => {setPassword(e.target.value)}} />
                <FormControlLabel control={<Checkbox onChange={() => {setShowPassword(showPassword ? false : true)}} />} label="Show Password" />
                <Button type="submit" variant="contained">Sign Up</Button>
            </form>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
            <Link href={"/login"} passHref><MUILink>Already have an account?</MUILink></Link>
            </div>
            </Paper>
        </Container>
        </Layout>
    )
}

export default Register;