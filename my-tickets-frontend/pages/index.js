import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home({data, authData}) {
  const login = async () => {
    const signin = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({username: 'test@gmail.com', password: 'password'})
    })
    const data = await signin.json()
    console.log(data)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello</h1>
      <button onClick={login}>Login</button>
    </div>
  )
}

export async function getServerSideProps() {

  const res = await fetch('http://localhost:1337/api/users', {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
    }
    })

  const data = await res.json()

  // const loginInfo = {
  //     identifier: 'test@gmail.com',
  //     password: 'password'
  // }

  // const login = await fetch('http://localhost:1337/api/auth/local', {
  //   method: "POST",
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(loginInfo)
  // })

  // const loginResponse = await login.json()

    const login = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: {username: 'test@gmail.com', password: 'password'}
    })
    
    

  // axios.post('http://localhost:1337/api/auth/local', loginInfo)
  // .then(response => {
  //   //Handle Success
  //   console.log('Well done!');
  //   console.log(response.data.user);
  //   console.log(response.data.jwt);
  // })
  // .catch(error => {
  //   //Handle Error
  //   console.log('An error occured:', error.response)
  // })

  return {
    props: {
      data,
      authData: 'loginResponse'
    }
  }
}
