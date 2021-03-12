import React, { useEffect, useState} from 'react';
import './Chat.css';
import ChatHeader from '../ChatHeader/ChatHeader';
import Message from '../Message/Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { selectChannelId, selectChannelName } from '../../../features/appSlice';
import db from '../../../firebase';
import firebase from 'firebase';
require('firebase/auth')

//import DeleteIcon from '@material-ui/icons/Delete';

function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages,setMessages] = useState([]);

    const [tweetImage, setTweetImage] = useState("");


    useEffect(() => {
        
            db.collection("channels")
                
                
                .orderBy('timestamp','desc')
                .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        
       
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("channels")
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,
            image: tweetImage,
            // image: file,
            
        });
        setInput("");
        setTweetImage("");

        // setFile("")
    };


    // function handleUpload(event){
    //     setFile(event.target.files[0]);
    // }

    

    return (
        <div className="chat">
            <ChatHeader  channelName={channelName}/>

            <div className="chat__messages">
                {messages.map(message => (
                    <Message 
                        DeleteIcon={messages.DeleteIcon}
                        timestamp={message.timestamp}
                        message={message.message}
                        user = {message.user}
                        image = {message.image}
                    />
                     
                     
                ))}
                
               
            </div>

            <div className="chat__input">
                
                <form>
                    <input  
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type a Message"
                    />
                    <input 
                        onChange={(e) => setTweetImage(e.target.value)}
                        value={tweetImage}
                        className="tweetBox__inputImage" 
                        placeholder="Enter image url">
                    </input>


                    {/* <input 
                        type="file" 
                        value={file}
                        onChange={(e) => setFile(e.target.value)}/> */}
                    <button className="chat__inputButton" type="submit" onClick={sendMessage}>send message</button>
                </form>

             
            </div>
        </div>
    )
}

export default Chat;
                                