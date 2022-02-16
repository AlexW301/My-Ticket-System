import { parseCookies, setCookie, destroyCookie } from "nookies";
import styles from "../styles/Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";
// MUI
import { Button, Typography, TextField, Paper, Container } from "@mui/material";
import {Link as MUILink} from "@mui/material"
// import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Calls next api route to login
  const login = async (e) => {
    e.preventDefault();
    const signin = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: email, password: password }),
    });
    if (signin.status === 200) {
      const data = await signin.json();
      console.log(signin);
      router.push("/");
    } else {
      console.log("Error Signing in, try different password");
    }
  };

  return (
    <Layout title={"Login"}>
      <Container className={styles.container}>
      <Typography variant="h4" style={{marginBottom: '1rem'}}>Welcome Back!</Typography>
      <Typography variant="h7">Enter your credentials to access your tickets</Typography>
        <Paper className={styles.card}>
          <Typography variant="h5">Login</Typography>
          <form className={styles.form} onSubmit={login}>
            <TextField
              type={"text"}
              placeholder={"Email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              type={"password"}
              placeholder={"Password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button variant="contained" type="submit">
              Sign In
            </Button>
          </form>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
          <Link href={"/register"} passHref><MUILink>Register</MUILink></Link>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Login;
