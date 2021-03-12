import React, { forwardRef } from 'react'
import './Message.css'
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
            <Avatar src={user.photo}/>
            <div className="message__info">
                <h4>
                    {user.displayName}
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}    
                    </span>
                </h4>
                                
                <p>{message}</p>
                <img src={image} alt="" />
            </div>
        </div>
    )
}

)



// -----------------------------------------------------***************************-----------------------------------------------------------
// functional Component


// function Message({timestamp, user, message, image}) {
//     return (
//         <div className="message">
//             <Avatar src={user.photo}/>
//             <div className="message__info">
//                 <h4>
//                     {user.displayName}
//                     <span className="message__timestamp">
//                         {new Date(timestamp?.toDate()).toUTCString()}    
//                     </span></h4>
                                
//                 <p>{message}</p>

//                 <img src={image} alt="" />
//             </div>
//         </div>
//     )
// }

// ------------------------------------------------------***********************-------------------------------------------------------

export default Message
