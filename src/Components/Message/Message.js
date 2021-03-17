import React, { forwardRef } from 'react'
import './Message.scss'
import { Avatar } from '@material-ui/core';
// import { Component } from 'react';

const Message = forwardRef(({
    timestamp,
    user,
    message,
    image,
}, ref) => {
    return (
        <div className="message">
            <Avatar className="message__avatar" src={user.photo}/>
            <div className="message__info">
                <h4>
                    {user.displayName}
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}    
                    </span>
                </h4>               
                <p className="message__infoMessage">{message}</p>
                {image && <img src={image} alt="" /> }    
            </div>
        </div>
    )
}
)

export default Message
