import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './extras/VideoPlayer'
import { Form,InputGroup,FormControl,Button } from 'react-bootstrap';

const ChatBody = ({messages,lastMessageRef ,typingStatus,socket}) => {
  const navigate = useNavigate();
  const [showVideoPlayer,setShowVideoPlayer] = useState(false)
  const [link,setLink] = useState()

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
  

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <Form onSubmit={handlePlay}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Paste Link"
            onChange={(e)=>setLink(e.target.value)}
            required
          />
            <Button type="submit">Play</Button>
        </InputGroup>
      </Form>
      
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

        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        {
          showVideoPlayer && <VideoPlayer link= {link} socket={socket}/>
        }
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;