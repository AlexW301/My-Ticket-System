import { useState } from "react";
import styles from "../styles/Ticket.module.scss"
// MUI
import {
  Button,
  Typography,
  TextField,
  Paper,
  Card,
  Container
} from "@mui/material";

const Ticket = ({ ticket }) => {
  console.log(ticket.attributes)
  const [comment, setComment] = useState("");

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
    <Card className={styles.card}>
      <Typography variant="h5">{ticket.attributes.Problem}</Typography>
      <Typography>{ticket.attributes.Description}</Typography>
      <Typography className={styles.id}>#{ticket.id}</Typography>
      <form onSubmit={submitComment}>
        <input
          type={"text"}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <input type={"submit"} />
      </form>
      {/* {ticket.attributes.comments.data.map((comment) => (
        <div key={Math.random()}>
          <p style={{fontSize: '12px'}}>{comment.attributes.user.data.attributes.username}</p>
          <p>{comment.attributes.content}</p>
        </div>
      ))} */}
    </Card>
  );
};

export default Ticket;
