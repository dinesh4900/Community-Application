import React,{useEffect, useState} from 'react';
import './Sidebar.scss';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase';

function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot =>(
            setChannels(snapshot.docs.map(doc => doc.data()))
        ))
        },[]);

    return (
        <div className="sidebar">
            <div className="sidebar__left">
                <h1><span>React</span> Community</h1>
            </div>  

            <div className="sidebar__profile">
                <Avatar className="sidebar__profileAvatar"  src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName.substring(0,8)}</h3>
                </div>
                <button className="sidebar__profileBtn" onClick={() => auth.signOut()} >LogOut</button>
            </div>
        </div>
    )
}

export default Sidebar