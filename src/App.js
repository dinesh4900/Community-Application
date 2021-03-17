import React,{ useEffect} from 'react';
import { useDispatch,useSelector} from 'react-redux'
import './App.scss';
import Chat from '../src/Components/Chat/Chat';
import Sidebar from './Components/Sidebarr/Sidebar';
import {selectUser} from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import { login,logout } from './features/userSlice'


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      console.log("user is", authUser);
      if(authUser){
        // user is loged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      }else{
        // user is logged out
        dispatch(logout());
      }
    });
  },[dispatch]);

  return (
    // BEM naming conventions
    <div className="app">
      {user ? (
        <>
          
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
      
    </div>
  );
}

export default App;
