import { useState } from "react";
import * as React from "react";
import styles from "../styles/Ticket.module.scss"
// MUI
import {
  Button,
  Typography,
  TextField,
  Paper,
  Card,
  Container,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Transitions,
  Slide
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Ticket = ({ ticket }) => {
  console.log(ticket.attributes)
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log('test')
  };

  const submitComment = async (e) => {
    e.preventDefault()
    const payload = {
      data: {
        content: comment,
        ticket: ticket
    }};
    const res = await fetch("/api/tickets/comment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <>
    <Card className={styles.card} onClick={handleClickOpen}>
      <Typography variant="h7" style={ticket.attributes.Status === 'open' ? {color: '#3cb371', fontWeight: 'bold'} : {fontWeight: 'bold'}}><span style={{color: '#000000'}}>status: </span>{ticket.attributes.Status}</Typography>
      <Typography variant="h5" style={{marginTop: '.3rem', marginBottom: '.5rem'}}>{ticket.attributes.Problem}</Typography>
      <Typography variant="p">{ticket.attributes.Description.length > 80 ? `${ticket.attributes.Description.slice(0, 70)}...` : ticket.attributes.Description}</Typography>
      <Typography className={styles.id}>#{ticket.id}</Typography>
      {/* <form onSubmit={submitComment}>
        <TextField
          type={"text"}
          value={comment}
          placeholder='Comment'
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button type={"submit"}>Comment</Button>
      </form> */}
      {/* {ticket.attributes.comments.data.map((comment) => (
        <div key={Math.random()}>
          <p style={{fontSize: '12px'}}>{comment.attributes.user.data.attributes.username}</p>
          <p>{comment.attributes.content}</p>
        </div>
      ))} */}
    </Card>
    <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {ticket.attributes.Problem}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              close
            </Button>
          </Toolbar>
        </AppBar>

      </Dialog>
    </>
  );
};

export default Ticket;
