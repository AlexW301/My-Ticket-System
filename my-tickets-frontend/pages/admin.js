import { parseCookies, setCookie, destroyCookie } from "nookies";
import Layout from "../components/Layout";
import styles from "../styles/Admin.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AdminTicket from "../components/adminTicket";
// MUI
import {
  Button,
  Typography,
  TextField,
  Paper,
  Card,
  Container,
  Fab,
  Tab,
  Tabs,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#101010",
    },
    secondary: {
      main: "#09adbf",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Admin = ({ tickets }) => {
  const router = useRouter();

  const newTickets = tickets.filter((ticket) => ticket.attributes.Status === "delivered")
  const openTickets = tickets.filter((ticket) => ticket.attributes.Status === "open")
  const closedTickets = tickets.filter((ticket) => ticket.attributes.Status === "closed")

  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    console.log("log out");
    const res = await fetch("/api/auth/logout");
    console.log(res);
    router.reload();
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            {/* <Button variant="primary" onClick={handleLogout}>Logout</Button> */}
            <Typography style={{ marginRight: "1rem" }}>Admin</Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Navigation tabs"
        >
          <Tab label="New Tickets" {...a11yProps(0)} />
          <Tab label="Open Tickets" {...a11yProps(1)} />
          <Tab label="Closed Tickets" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography variant="h2" style={{marginBottom: '1.2rem', textAlign: 'center'}}>{newTickets.length} Tickets</Typography>
        <div className={styles.ticketGrid}>
        {newTickets && (
            newTickets.map((ticket) => {
                return (
                    <AdminTicket key={ticket.id} ticket={ticket} />
                )
            })
        )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Typography variant="h2" style={{marginBottom: '1.2rem', textAlign: 'center'}}>{openTickets.length} Tickets</Typography>
      <div className={styles.ticketGrid}>
        {openTickets && (
            openTickets.map((ticket) => {
                return (
                    <AdminTicket key={ticket.id} ticket={ticket} />
                )
            })
        )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Typography variant="h2" style={{marginBottom: '1.2rem', textAlign: 'center'}}>{closedTickets.length} Tickets</Typography>
      <div className={styles.ticketGrid}>
        {closedTickets && (
            closedTickets.map((ticket) => {
                return (
                    <AdminTicket key={ticket.id} ticket={ticket} />
                )
            })
        )}
        </div>
      </TabPanel>
    </ThemeProvider>
  );
};

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);

  if (cookies.email != "alex@pmlhomeloans.com") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const res = await fetch(
    "http://localhost:1337/api/tickets?populate=user&populate=comments.user&populate=Picture",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    }
  );

  const data = await res.json();

  return {
    props: {
      tickets: data.reverse(),
    },
  };
}

export default Admin;