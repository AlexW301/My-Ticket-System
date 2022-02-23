import "../styles/globals.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/pmllogo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
