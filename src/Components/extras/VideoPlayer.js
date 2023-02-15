import React, { useState,useEffect } from 'react';
import ReactPlayer from 'react-player';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import './VideoPlayer.css'

const VideoPlayer = ({link,socket}) => {
  const driveUrl ='https://drive.google.com/uc?export=view&id=1X-rhDXcdaVqBGm6tHnD-6eiCHM4NlUB2/'
  const [url, setUrl] = useState('https://drive.google.com/uc?export=view&id=1X-rhDXcdaVqBGm6tHnD-6eiCHM4NlUB2/');
  
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const handle = useFullScreenHandle();
  const [file, setFile] = useState(null);

  const onPlay = () => {
    setPlaying(true);
  }

  const onPause = () => {
    setPlaying(false);
  }

  const onSeekMouseDown = e => {
    setSeeking(true);
  }

  const onSeekChange = e => {
    setPlayed(parseFloat(e.target.value));
  }

  const onSeekMouseUp = e => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  }

  const onProgress = state => {
    if (!seeking) {
      setPlayed(state.played);
      setLoaded(state.loaded);
    }
  }

  const onEnded = () => {
    setPlaying(false);
  }

  const onDuration = (duration) => {
    setDuration(duration);
  }

  const playerRef = React.useRef(null);

  useEffect(() => {
    socket.emit('play/pause', {
      command:playing
    })
  }, [playing])
  
  useEffect(() => {
    socket.on('command', (data) => setPlaying(data.command));
  }, [socket]);

  return (
    <div>
      
      
      <FullScreen className='full' handle={handle}>
      
       <ReactPlayer  
       ref={playerRef}
       url={link}
       playing={playing}
       volume={volume}
       onPlay={onPlay}
       onPause={onPause}
       onSeek={setPlayed}
       onProgress={onProgress}
       onEnded={onEnded}
       onDuration={onDuration}
       controls
     />
      
    
      </FullScreen>
      
      {/*<div>
        <button onClick={onPlay}>Play</button>
        <button onClick={onPause}>Pause</button>
        <input
          type='range' min={0} max={1} step='any'
          value={played}
          onMouseDown={onSeekMouseDown}
          onChange={onSeekChange}
          onMouseUp={onSeekMouseUp}
        />
        <button onClick={handle.enter}>
        Enter fullscreen
      </button>
  </div>*/}
    </div>
  )
}

export default VideoPlayer;
