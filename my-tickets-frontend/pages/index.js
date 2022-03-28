import * as React from "react";
import { API_URL } from "../config";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useState } from "react";
import Ticket from "../components/ticket";
import Layout from "../components/Layout";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Link from "next/link";
// MUI
import {
  Button,
  Typography,
  TextField,
  Paper,
  Card,
  Container,
  Pagination,
  Stack,
  Divider,
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
  PaginationItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountCircle from "@mui/icons-material/AccountCircle";
//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function Home({ nameCookie, emailCookie, myTickets }) {

  const router = useRouter();

  const [problem, setProblem] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("Problem");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  function handleClick(event) {
      setCurrentPage(Number(event.target.id));
      router.push('/#')
  }

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(myTickets.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li style={currentPage === number ? {backgroundColor: '#36363615'} : null} key={number} id={number} className={styles.pageNumber} onClick={handleClick}>
        {number}
      </li>
    );
  });

  // Logic for displaying items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = myTickets.slice(indexOfFirstItem, indexOfLastItem);

  const success = () => toast.success("Ticket Recieved!");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: 'POST'
    });
    console.log(res);
    router.reload();
    setAnchorEl(null);
  };

  const submitTicket = async (e) => {
    e.preventDefault();
    const payload = {
      data: {
        Problem: problem,
        Description: description,
        Priority: priority,
        Type: type,
        Status: "delivered",
      },
    };
    const res = await fetch("/api/tickets/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    //Clear all fields and notify user of success
    setProblem("");
    setDescription("");
    setPriority("");
    setType("Problem");
    success();
    router.reload()
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Layout title={"Home"}>
      <Box sx={{ width: "100%", minHeight: '100vh' }}>
        <ToastContainer />
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
                PML Help Desk
              </Typography>
              {/* <Button variant="primary" onClick={handleLogout}>Logout</Button> */}
              <Typography style={{ marginRight: "1rem" }}>
                {nameCookie}
              </Typography>
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
            <Tab label="Create a Ticket" {...a11yProps(0)} />
            <Tab label="My Tickets" {...a11yProps(1)} />
            <Tab label="Knowledge Base" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Container className={styles.container}>
            <Typography style={{ marginBottom: "2rem", textAlign:'center' }} variant="h2">
              New Ticket
            </Typography>
            <Card className={styles.newTicket}>
              <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                Ticket
              </Typography>
              <form
                onSubmit={submitTicket}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "600px",
                  gap: "1.8rem",
                  marginBottom: "10px",
                }}
              >
                <TextField
                  type={"text"}
                  placeholder="Problem"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel id="simple-select-label">Priority</InputLabel>
                  <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={priority}
                    label="Priority"
                    onChange={(e) => {
                      setPriority(e.target.value);
                    }}
                  >
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  multiline={true}
                  minRows={5}
                  maxRows={5}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() =>
                        setType(type === "Problem" ? "Suggestion" : "Problem")
                      }
                    />
                  }
                  label="Check if this is a suggestion"
                />
                <Button variant="contained" type={"submit"}>
                  Submit
                </Button>
              </form>
            </Card>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h2" style={{marginBottom: '2rem'}}>My Tickets</Typography>
          <div className={styles.ticketGrid}>
            {currentTickets.length === 0 && (
              <div>
                <Button variant="outlined" startIcon={<ConfirmationNumberIcon />} onClick={() => {setValue(0)}}>Create Your first ticket </Button>
              </div>
            )}
            {currentTickets.map((ticket) => (
              <Ticket ticket={ticket} key={Math.random()} />
            ))}
          </div>
          <ul id="page-numbers" className={styles.paginationContainer}>{renderPageNumbers}</ul>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="h2" style={{fontSize: '2rem'}}>Coming Soon!</Typography>
        </TabPanel>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);
  const nameCookie = cookies.name;
  const emailCookie = cookies.email;

  if (!cookies.jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      }
    };
  }

  if (!cookies.email === "alex@pmlhomeloans.com") {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      }
    };
  }

  const res = await fetch(
    `${API_URL}/api/tickets?populate=user&populate=comments.user&populate=Picture`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    }
  );

  if (res.status !== 200) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      }
    };
  }

  const data = await res.json();


  console.log(res)

  return {
    props: {
      nameCookie,
      emailCookie,
      myTickets: data.reverse().sort((a, b) => {
        return b.id - a.id
      }),
    },
  };
}
