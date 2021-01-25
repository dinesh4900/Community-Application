import React,{useEffect, useState} from 'react';
import './Sidebar.css';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';

import SidebarChannel from './SidebarChannel';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';




function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot =>(
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data()
            })))
        ))
    }, []);

    const handleAddChannel = () => {
        const channelName = prompt("enter new channel name");
        if(channelName){
            db.collection("channels").add({
                channelName: channelName,
            })
        }
    }

    return (
        <div className="sidebar">
           {/*  sidebar Header */ }
            <div className="sidebar__top">
                <h3> Dinesh King</h3>
                <ExpandMoreIcon />
            </div>
            {/* side bar contents */}
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h2>Channel 1</h2>
                    </div>


                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel"/>
                </div>

                {/* .map error while uusing curly braces */}
                <div className="sidebar__channelsList">
                    {channels.map(({id, channel}) => (
                        <SidebarChannel 
                        key={id}
                        id={id}
                        channelName={channel.channelName}/>
                    ))}
                    
                    
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon 
                    className="sidebar__voiceIcon"
                    fontSize="large" 
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>
            
            
            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo}/>
                <div className="sidebar__profileInfo">
                    <h3>#{user.displayName.substring(0,8)}</h3>
                    <p>{user.uid.substring(0,5)}</p>
                </div>

                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
