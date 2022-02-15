import Head from "next/head";
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#bf1b09',
    },
    secondary: {
      main: '#09adbf',
    },
  },
});

const Layout = ({ title, keywords, description, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {children}
    </ThemeProvider>
  );
};

Layout.defaultProps = {
  title: "IT Help",
  description: "Get the best IT help around for all your needs.",
  keywords: "it, help desk, it tickets, ticket system",
};

export default Layout;
