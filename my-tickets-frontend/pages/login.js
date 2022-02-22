import { parseCookies, setCookie, destroyCookie } from "nookies";
import styles from "../styles/Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";
// MUI
import { Button, Typography, TextField, Paper, Container, Checkbox, FormControlLabel } from "@mui/material";
import {Link as MUILink} from "@mui/material"

//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const error = () => toast.error("Incorrect login information!");

  //Calls next api route to login
  const login = async (e) => {
    e.preventDefault();
    const signin = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: email, password: password }),
    });
    if (signin.status === 200) {
      router.push("/");
    } else {
      error()
    }
  };

  return (
    <Layout title={"Login"}>
      <Container className={styles.container}>
      <ToastContainer />
      <Typography variant="h4" style={{marginBottom: '1rem'}}>Welcome Back!</Typography>
      <Typography variant="h7">Enter your credentials to access your tickets</Typography>
        <Paper className={styles.card}>
          <Typography variant="h5">Login</Typography>
          <form className={styles.form} onSubmit={login}>
            <TextField
              type={"email"}
              placeholder={"Email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormControlLabel control={<Checkbox onChange={() => {setShowPassword(showPassword ? false : true)}} />} label="Show Password" />
            <Button variant="contained" type="submit">
              Sign In
            </Button>
          </form>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
          <Link href={"/register"} passHref><MUILink>Dont have an account?</MUILink></Link>
          </div>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Login;
