import "../styles/globals.scss";
import Divider from '@mui/material/Divider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
