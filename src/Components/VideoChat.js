import React,{ useState, useEffect,useRef } from 'react'
import { Button } from 'react-bootstrap'
import './VideoChat.css'

function VideoChat({myVideo,friendVideo,endCall,socket} ) {
  
  useEffect(() => {
    socket.on('endCall', (data) => {
      if(data.command)
        endCall()});
  }, [socket]);

  return (
    <div className='videoChat'>
        <video className='myVideo' ref={myVideo} />
        <video className='friendVideo' ref={friendVideo} />
        <Button className='endCallBtn' variant='danger' onClick={endCall}>End Call</Button>
    </div>
  )
}

export default VideoChat