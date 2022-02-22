import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import Link from "next/link";
import { Typography } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#bf1b09",
    },
    secondary: {
      main: "#09adbf",
    },
  },
});


const Layout = ({ title, keywords, description, children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
        </Head>
        {children}
        <footer className={"footer"}>
          <Link href={"mailto:alex@pmlhomeloans.com"} passHref>
            <div className="footerContent">
              <CodeIcon />
              <Typography variant="h6" className={"footerText"}>
                Developed By Alex Waller
              </Typography>
            </div>
          </Link>
        </footer>
      </ThemeProvider>
    </>
  );
};

Layout.defaultProps = {
  title: "IT Help",
  description: "Get the best IT help around for all your needs.",
  keywords: "it, help desk, it tickets, ticket system",
};

export default Layout;
