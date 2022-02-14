import { useState } from "react";

const Ticket = ({ ticket }) => {
  const [comment, setComment] = useState("");
  const submitComment = async (e) => {
    e.preventDefault()
    const payload = {
      data: {
        content: comment,
      }, 
      ticket
    };
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
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f4f4f4",
        width: "400px",
        margin: "1rem",
      }}
    >
      <span>{ticket.id}</span>
      <p>{ticket.attributes.Problem}</p>
      <p>{ticket.attributes.Description}</p>
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
    </div>
  );
};

export default Ticket;
