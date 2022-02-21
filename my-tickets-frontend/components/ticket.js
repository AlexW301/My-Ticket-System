import { useState, useCallback } from "react";
import * as React from "react";
import styles from "../styles/Ticket.module.scss";
import { useRouter } from "next/router";
import ImageGallery from "react-image-gallery";
import Link from "next/link";
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
  Slide,
  DialogContent,
  Chip,
  Stack,
  Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import dateFormat, { masks } from "dateformat";
//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Ticket = ({ ticket }) => {
  // console.log(ticket);
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const setPics = (ticket) => {
    const picArray = ticket.attributes.Picture.data;
    if(picArray) {
      const images = picArray.map((pic) => {
        const original = pic.attributes.url
        const thumbnail = pic.attributes.formats.thumbnail.url
        const imageObj = {
          original: `http://localhost:1337${original}`,
          thumbnail: `http://localhost:1337${thumbnail}`
        }
        return imageObj
      })
      return images
    }
  };

  const images = setPics(ticket)

  const closeImageViewer = () => {
    setCurrentImage(0);
  };

  const success = () => toast.success("Comment Posted!");

  const uploadSuccess = () => toast.success("Successfully Uploaded!");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const refresh = () => {
    router.reload();
  };

  function capitalizeFirstLetter(string) {
    if(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  const submitComment = async (e) => {
    e.preventDefault();
    const payload = {
      data: {
        content: comment,
        ticket: ticket,
      },
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
    // console.log(data);
    success();
    refresh();
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("files", image);

    formData.append("ref", "api::ticket.ticket");
    formData.append("refId", ticket.id);
    formData.append("field", "Picture");

    const authenticate = await fetch(`/api/auth/getsession`);
    const token = await authenticate.json();

    const res = await fetch(`http://localhost:1337/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      body: formData,
    });

    if (res.ok) {
      uploadSuccess()
      router.reload()
    }
  };

  return (
    <>
      <Card variant="outlined" className={styles.card} onClick={handleClickOpen}>
        <Typography
          variant="h7"
          style={{color: "#bf1b09", fontWeight: '500'}}
        >
          <span>status: </span>
          {ticket.attributes.Status}
        </Typography>
        <Typography
          variant="h5"
          style={{ marginTop: ".3rem", marginBottom: ".5rem" }}
        >
          <Divider style={{marginBottom: '.7rem'}}/>
          {ticket.attributes.Problem}
        </Typography>
        <Typography variant="p">
          {ticket.attributes.Description.length > 80
            ? `${ticket.attributes.Description.slice(0, 70)}...`
            : ticket.attributes.Description}
        </Typography>
        <Typography className={styles.id}><ConfirmationNumberIcon/>#{ticket.id}</Typography>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
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
            <Button autoFocus color="inherit" onClick={refresh}>
              Refresh
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className={styles.dialogContent}>
          <Paper className={styles.informationSection}>
          <Typography variant="h6" className={styles.pubDate}>
              Created:{" "}
              {dateFormat(
                ticket.attributes.createdAt,
                "dddd, mmmm dS, yyyy, h:MM TT"
              )}
            </Typography>
            <Typography
              variant="h3"
              style={{
                marginBottom: "1.3rem",
                fontWeight: "200",
                fontSize: "2.5rem",
                color: '#bf1b09'
              }}
            >
              {ticket.attributes.Problem}
            </Typography>
            <Stack direction="row" spacing={1} style={{marginBottom: '1rem'}}>
              <Chip label={`Type: ${ticket.attributes.Type}`} />
              <Chip label={`Status: ${capitalizeFirstLetter(ticket.attributes.Status)}`} />
              <Chip label={`Priority: ${ticket.attributes.Priority}`} />
            </Stack>
            <Typography
              variant="h5"
              style={{ marginTop: "1rem", marginBottom: ".5rem" }}
            >
              Description
            </Typography>
            <Typography className={styles.description}>
              {ticket.attributes.Description}
            </Typography>
            {images && (
              <ImageGallery
              showNav={false}
              showBullets={true}
              showThumbnails={false}
              showPlayButton={false}
              items={images} />
            )}
            <div className={styles.form}>
              <form onSubmit={handleSubmit}>
                <Typography style={{ marginBottom: "1rem", marginTop: '1rem' }} variant="h6">
                  Upload Image
                </Typography>
                <div>
                  <input type="file" onChange={handleFileChange} />
                  <Button
                    variant="contained"
                    type="submit"
                    value="Upload"
                    className="btn"
                  >
                    Upload
                  </Button>
                </div>
              </form>
            </div>
          </Paper>
          <div className={styles.commentSection}>
            <Typography style={{ marginBottom: "1.5rem" }} variant="h2">
              Discussion
            </Typography>
            {/* COMMENTS */}
            <div className={styles.commentsGrid}>
              {ticket.attributes.comments.data.map((comment) => (
                <Card className={styles.commentCard} key={Math.random()}>
                  <div className={styles.commentMeta}>
                    <p style={{ fontSize: "12px" }}>
                      {comment.attributes.user.data.attributes.username}
                    </p>
                    <p style={{ fontSize: "12px" }}>
                      {dateFormat(
                        comment.attributes.createdAt,
                        "dddd, mmmm dS, yyyy, h:MM TT"
                      )}
                    </p>
                  </div>
                  <Typography style={{ marginBottom: ".2rem" }}>
                    {comment.attributes.content}
                  </Typography>
                </Card>
              ))}
            </div>
            {/* SUBMIT COMMENT AREA */}
            <form className={styles.commentSubmit} onSubmit={submitComment}>
              <TextField
                type={"text"}
                value={comment}
                placeholder="Comment"
                style={{ maxWidth: "300px", width: "300px" }}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Button type={"submit"}>Comment</Button>
            </form>
          </div>
        </DialogContent>
        <ToastContainer />
      </Dialog>
    </>
  );
};

export default Ticket;
