import React, { useState,useEffect } from "react";
import './Sidebar.css'
import {Avatar} from "@material-ui/core"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton } from "@material-ui/core";
import {SearchOutlined} from '@material-ui/icons';
import SidebarChats from "./SidebarChats"
import db from "../../firebase"
import { useStateValue } from "../../StateProvider";


function Sidebar() {
  const [rooms,setRooms]=useState([])
  const [{user},dispatch]=useStateValue()
  useEffect(()=>{
    const unsubsribe=db.collection('rooms').onSnapshot(snap=>{
      setRooms(snap.docs.map((doc)=>
      (
        {
          id:doc.id,
          data:doc.data()  
        }
      )))
    })
    return ()=>{
      unsubsribe()
    }
  },[])
    return (
      <div className="sidebar">
        <div className="sidebar__header">
          <IconButton>
            <Avatar src={user?.photoURL}/>
          </IconButton>
          <div className="sidebar__headerRight">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlined />
            <input placeholder="Search or start new chat" />
          </div>
        </div>
        <div className="sidebar__chats">
          <SidebarChats addNewChat/>
          {rooms.map(room=>
          (
            <SidebarChats key={room.id} id={room.id} name={room.data.name}/>
          )
          )}
        </div>
      </div>
    );
}

export default Sidebar
