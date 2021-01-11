import React, { useState } from 'react'
import { db, storage } from "./firebase";
import firebase from 'firebase';
import './ImageUpload.css';


function ImageUpload(props) {

    const [image, setImage] = useState(null);
    // const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function .....
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //Error function ...
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: props.username
                        });

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    }
    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a Caption" onChange={event => setCaption(event.target.value)}></input>
            <input type="file" onChange={handleChange}></input>
            <button onClick={handleUpload}>UPLOAD</button>
        </div>
    )
}

export default ImageUpload
