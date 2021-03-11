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

    useEffect(() => {
        if(channelId){
            db.collection("channels")
                .doc(channelId)
                .collection("messages")
                .orderBy('timestamp','desc')
                .onSnapshot((snapshot) => 
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
       
    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("channels").doc(channelId).collection("messages")
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,
            
        });
        setInput("");
    };


    

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
                    />
                     
                     
                ))}
                
                {/* <button className="del__button" type="submit" onClick={removeProject}>remove</button> */}
                
            </div>

            <div className="chat__input">
                {/* <AddCircleIcon fontSize="large" /> */}
                <form>
                    <input 
                        value={input} 
                        disabled={!channelId}
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder={`Message #${channelName}`}
                    />
                    <button className="chat__inputButton" type="submit" onClick={sendMessage}>send message</button>
                </form>

                {/* <div className="chat__inputIcons">
                    <CardGiftcardIcon />
                    <GifIcon />
                    <EmojiEmotionsIcon />
                </div> */}
            </div>
        </div>
    )
}

export default Chat;
                                