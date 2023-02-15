import React, { useState,useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import axios from 'axios';
import VideoPlayer from './extras/VideoPlayer'
import VideoChat from './VideoChat';
import './ChatBody.css'

import { Form,InputGroup,FormControl,Button } from 'react-bootstrap';

const ChatBody = ({messages,lastMessageRef ,typingStatus,socket}) => {
  const navigate = useNavigate();
  const [showVideoPlayer,setShowVideoPlayer] = useState(false)
  const [showVideoChat,setShowVideoChat] = useState(false)
  const [link,setLink] = useState()
  const friendId = localStorage.getItem("friendID")
  const [peer, setPeer] = useState({});
  const [call, setCall] = useState({});
  const [stream,setStream] = useState({})
  var myVideo = useRef();
  var friendVideo = useRef();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  const handlePlay = (e) =>{
      e.preventDefault()
      socket.emit('link', {
        link:link
      });
      setShowVideoPlayer(true)
  }
  useEffect(() => {
    socket.on('link', (data) => setLink(data.link));
    setShowVideoPlayer(true)
  }, [socket]);
  

  useEffect(() => {
    const peer = new Peer(localStorage.getItem('userName'));
    console.log(localStorage.getItem('userName'),friendId)
    peer.on('open', (id) => {
      setPeer(peer);
    });

    peer.on('call', (call) => {
      setShowVideoChat(true)
      setCall(call)
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (stream) => {
        
        if (myVideo.current){
          myVideo.current.srcObject = stream;
          myVideo.current.play().catch((error) => console.error(error));
          setStream(stream)
        }
        
        call.answer(stream);
        
        call.on('stream', (remoteStream) => {
          if (friendVideo.current){
            friendVideo.current.srcObject = remoteStream;
            friendVideo.current.play().catch((error) => console.error(error));
          }
        });

      });
    });

    return () => {
      peer.disconnect()
      peer.destroy();
    }
  }, []);

  
  const videoCall = () => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (stream) => {
      
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
        myVideo.current.play().catch((error) => console.error(error));
        setStream(stream)
      }
      const call = peer.call(friendId, stream);
      setCall(call)
      call.on('stream', (remoteStream) => {
        if (friendVideo.current){
          friendVideo.current.srcObject = remoteStream;
          friendVideo.current.play().catch((error) => console.error(error));
        }
      });
      
    });
  }

  const endCall =() =>{
    socket.emit('endCall', {
      command : true
    })
    call.close()
    setShowVideoChat(false)
  }
  const getDriveFileIdFromUrl = (url)=> {
    const regExp = /\/d\/([a-zA-Z0-9-_]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  const processLink =()=>{
    console.log("myrr",link)
    if  (link.includes("drive.google.com")){
      let id = getDriveFileIdFromUrl(link)
      console.log(id)
      setLink('https://drive.google.com/uc?export=view&id='.concat(id))
    }
  }
  return (
    <div className='chatBody'>  
    {
      showVideoChat && <VideoChat className="videoChat" myVideo={myVideo} friendVideo={friendVideo} endCall={endCall} socket={socket}/>
    }
      <header className="chat__mainHeader">
        <Form className='videoLink' onSubmit={handlePlay}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Paste Link"
            onChange={(e)=>setLink(e.target.value)}
            required
          />
            <Button type="submit" onClick={processLink}>Play</Button>
        </InputGroup>
      </Form>
        <Button onClick={()=>{
          setShowVideoChat(true)
          videoCall()
          }} >Video Call</Button>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">
      {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
        
        {
          showVideoPlayer && <VideoPlayer link= {link} socket={socket}/>
        }
        
        <div ref={lastMessageRef} />
        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;