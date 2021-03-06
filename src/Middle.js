import IconButton from "@material-ui/core/IconButton";
import React, { useState, useEffect } from "react";
import { db, auth, storage } from "./firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import AttachmentIcon from "@material-ui/icons/Attachment";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Middle.css";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function Middle() {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  // const { userId } = useParams();
  const [description, setDescription] = useState("");
  const user = auth.currentUser;
  const [videourl, setVideourl] = useState("");
  const classes = useStyles();
  const [hide, setHide] = useState(false);

  var inputElement = "";

  // useEffect(() => {
  // 	db.collection("users")
  // 		.doc(user.phoneNumber)
  // 		.collection("profiles")
  // 		.doc("displayName")
  // 		.onSnapshot((snapshot) => setMydisplay(snapshot.data().displayName));
  // }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  triggerFileUpload = triggerFileUpload.bind(this);

  function triggerFileUpload() {
    inputElement.click();
    setHide(true);
  }

  const Upload = (e) => {
    e.target.value = null;
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("uploads").add({
              imageUrl: url,
              name: description,
              video: videourl,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            // {
            // 	storage
            // 		.ref("images")
            // 		.child(image.name)
            // 		.getDownloadURL()
            // 		.then((url) => {
            // 			db.collection("users").add({
            // 				imageUrl: url,
            // 				name: mydisplay,
            // 				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            // 			});
            // 		});
            // }
            setProgress(0);
            setHide(false);
            setImage(null);
          });
        setImage(null);
        setDescription("");
        setVideourl("");
      }
    );
    setImage(null);
  };

  // console.log(image);

  const doublehide = () => {
    setHide(false);
  };
  return (
    <div className="middle">
      <CircularProgress className="image__circle" variant="static" color="smokewhite" value={progress} />
      <Grid>
        <div
          style={{ display: "flex" }}
          className={classes.root}
          style={{
            alignItems: "center",
            left: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space between",
            }}
            className="middle__inputs"
          >
            <input
              type="text"
              value={videourl}
              onChange={(e) => setVideourl(e.target.value)}
              placeholder="Enter URL"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
          </div>
          <input
            className={classes.input}
            type="file"
            ref={(input) => (inputElement = input)}
            onClick={Upload}
            onChange={handleChange}
          />

          {/* <IconButton color="primary"> */}
          <Button
            style={{ color: "white", backgroundColor: "black", zIndex: "1" }}
            onClick={triggerFileUpload}
          >
            Upload
          </Button>
          {/* </IconButton> */}

          <IconButton
            onDoubleClick={doublehide}
            color="primary"
            style={
              hide === true
                ? { display: "" }
                : { display: "none", cursor: "pointer" }
            }
          >
            <SendIcon
              onClick={handleUpload}
              // style={{ color: "white", zIndex: "1" }}
            />
          </IconButton>
        </div>
      </Grid>
    </div>
  );
}

export default Middle;
