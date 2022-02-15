import { parseCookies, setCookie, destroyCookie } from "nookies";
import styles from "../styles/Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";
// MUI
import { Button, Card, Backdrop, TextField } from "@mui/material";

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
      <div className={styles.container}>
        <Card className={styles.card}>
          <p>Login</p>
          <form onSubmit={login}>
            <TextField
              type={"text"}
              placeholder={"Email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              type={"text"}
              placeholder={"Password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
          <Link href={"/register"}>Register</Link>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
