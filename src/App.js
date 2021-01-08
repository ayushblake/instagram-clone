import React,{useState,useEffect} from 'react'
import './App.css';
import Post from './Post';
import {db}from './firebase'
// import classes from '*.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import Button from "@material-ui/core/"

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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const[posts,setPosts]=useState([])
  const[open,setOpen]=useState(false)


  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  },[])

  return (
    <div className="app">
        <Modal
          open={open}
          onClose={()=>{setOpen(false)}}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
       <div style ={modalStyle} className={classes.paper}>
         <h2>This is inside a Modal</h2>
       </div>
     </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram logo"/>
      </div>
      <button onClick={()=> setOpen(true)}>Sign Up!</button>
      {/* <h1>Hello Alll....</h1>   */}
      {posts.map(({id,post}) => (
        <Post key ={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))}
      
    </div>
  );
}

export default App;
  