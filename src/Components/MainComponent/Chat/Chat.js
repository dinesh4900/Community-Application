import React, { useEffect, useState} from 'react';
import './Chat.css';
// import ChatHeader from '../ChatHeader/ChatHeader';
import Message from '../Message/Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import { selectChannelId, selectChannelName } from '../../../features/appSlice';
import db from '../../../firebase';
import firebase from 'firebase';

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'




require('firebase/auth');


//import DeleteIcon from '@material-ui/icons/Delete';

function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages,setMessages] = useState([]);
    const [tweetImage, setTweetImage] = useState("");

    const [emojiPickerState, SetEmojiPicker] = useState(false);
    const [message, SetMessage] = useState("");

    useEffect(() => {
            db.collection("channels")
                .orderBy('timestamp','desc')
                .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
    }, []);



        let emojiPicker;
        if (emojiPickerState) {
            emojiPicker = (
                <Picker
                    title="Pick your emoji…"
                    emoji="point_up"
                    onSelect={emoji => SetMessage(message + emoji.native)}
                />
            );
        }
        
        function triggerPicker(e) {
            e.preventDefault();
            SetEmojiPicker(!emojiPickerState);
        }

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





   


    // function handleUpload(event){
    //     setTweetImage(event.target.files[0]);
    // }

   

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
                    />
                    <input 
                        onChange={(e) => setTweetImage(e.target.value)}
                        value={tweetImage}
                        className="tweetBox__inputImage" 
                        placeholder="Enter image url">
                    </input>
                    <input 
                        value={message}
                        onChange={e => SetMessage(e.target.value)}
                    />

                    {emojiPicker}
                    <button onClick={triggerPicker}>Add an Emoji!</button>


                    {/* <input 
                        type="file" 
                        value={tweetImage}
                        onChange={(e) => setTweetImage(e.target.value)}/> */}
                    <button className="chat__inputButton" type="submit" onClick={sendMessage}>send message</button>
                </form>

                

             
            </div>
        </div>
    )
}

export default Chat;
                                