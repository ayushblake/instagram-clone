import React,{useState} from 'react'
import './App.css';
import Post from './Post';

function App() {

  const[posts,setPosts]=useState([
    {
      username:"Ayush",
      caption:"This is the caption",
      imageUrl:"https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
    },
    {
      username:"Ayush",
      caption:"This is the caption",
      imageUrl:"https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
    }
  ])
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram logo"/>
      </div>
      {/* <h1>Hello Alll....</h1>   */}
      {posts.map(post => (
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
  ))}
    </div>
  );
}

export default App;
  