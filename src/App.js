import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
// import classes from '*.module.css';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ImageUpload from "./ImageUpload";
// import Button from "@material-ui/core/"
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has Logged In...
        console.log(authUser);
        setUser(authUser);
      }
      // else {
      //   //user has Logged Out...
      //   setUser(null);
      // }
    })

    return () => {
      //perform some cleanup functions
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });
    setOpenSignIn(false);
  };

  return (
    <div className="app">

      {/* SIGN UP MODAL */}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram logo"
              />
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" onClick={signUp}>
                Sign Up!
              </button>
            </center>
          </form>
        </div>
      </Modal>

      {/* SIGN IN MODAL */}
      <Modal
        open={openSignIn}
        onClose={() => {
          setOpenSignIn(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram logo"
              />
              <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" onClick={signIn}>
                Sign In!
              </button>
            </center>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram logo"
        />
        {user ? (
          <button onClick={auth.signOut()}>Logout</button>
        ) : (
            <div className="app__loginContainer">
              <button onClick={() => setOpenSignIn(true)}>Sign IN</button>
              <button onClick={() => setOpen(true)}>Sign UP</button>
            </div>
          )}
      </div>

      {/* <h1>Hello Alll....</h1>   */}
      <div className="app__posts">

        <div className="app__postsLeft">
        {
          posts.map(({ id, post }) => (
            <Post
              key={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))
        }
        </div>

        <div className="app__postsRight">            
          <InstagramEmbed
            url='https://www.instagram.com/p/CJ6Kxr4HO1T/?utm_source=ig_web_copy_link'
            // clientAccessToken='123|456'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {
        user?.displayName ?
          (<ImageUpload username={user.displayName} />)
          : (<h3>Login to Upload please..</h3>)
      }
    </div>
  );
}

export default App;
