import React, { useState, useEffect } from "react"
import { Avatar,IconButton } from '@material-ui/core'
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons"
import './Chat.css'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import {useParams } from 'react-router-dom'
import db from "../../firebase"
import {useStateValue} from '../../StateProvider'
import firebase from "firebase"

function Chat() {
    const [input,setInput]=useState("")
    const [seed, setSeed] = useState("")
    const {roomId}=useParams()
    const [roomName, setRoomName] = useState("");
    const [messages,setMessages]=useState([])
    const [{user},]=useStateValue()
    useEffect(()=>{
      if (roomId) {
        db.collection("rooms")
          .doc(roomId)
          .onSnapshot((snapshot) => {
            setRoomName(snapshot.data() ? snapshot.data().name : "No data");
          });

        db.collection("rooms")
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot(snapshot=>(
          setMessages(snapshot.docs.map(doc=>doc.data()))
        ))
      }
    },[roomId])
    useEffect(() => {
      setSeed(Math.floor(Math.random() * 100));
    }, [roomId]);
    const sendMessage=(e)=>{
        e.preventDefault()
        db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .add({
          message:input,
          user:user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('')
    }
    return (
      <div className="chat">
        <div className="chat__header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
      <p> Last seen as <br/>
      {new Date(messages[messages.length-1]?.timestamp.toDate()).toUTCString()}
      </p>
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
            <IconButton>
              <SearchOutlined />
            </IconButton>
          </div>
        </div>
        <div className="chat__body">
          {messages && messages.map((m) => (
            <p className={`chat__message ${m.name ===user.displayName && "chat__receiver"}`}>
              <span className="chat__name"> {m.name}</span>
              {m.message}
              <span className="chat__timestamps">
                {new Date(m.timestamp?.toDate()).toUTCString()}
                </span>
            </p>
          ))}
        </div>
        <div className="chat__footer">
          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>
          <form>
            <input
              value={input}
              placeholder="Type a message"
              type="text"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button onClick={sendMessage} type="submit">
              Send
            </button>
          </form>
          <IconButton>
            <MicIcon />
          </IconButton>
        </div>
      </div>
    );
}

export default Chat
