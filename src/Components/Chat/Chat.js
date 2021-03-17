import React, { useEffect, useState} from 'react';
import './Chat.scss';
import Message from '../Message/Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import firebase from 'firebase';
import 'emoji-mart/css/emoji-mart.css'


require('firebase/auth');

function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const [messages,setMessages] = useState([]);
    const [tweetImage, setTweetImage] = useState("");
    const [emojiPickerState, SetEmojiPicker] = useState(false);

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
                emoji: emojiPickerState,
            });
            setInput("");
            setTweetImage("");  
            SetEmojiPicker("")        
    };

    return (
        <div className="chat">
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
                        name="title"
                    />

                    <input 
                        onChange={(e) => setTweetImage(e.target.value)}
                        value={tweetImage}
                        className="tweetBox__inputImage" 
                        placeholder="Enter image url" 
                    />

                    <button className="chat__inputButton" type="submit" onClick={sendMessage} disabled={!input}>send message</button>                 
                </form>
            </div>
        </div>
    )
}

export default Chat;
                                