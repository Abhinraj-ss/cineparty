import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import ChatPage from './Components/ChatPage';
import {io} from 'socket.io-client';

const socket = io('https://cineparty.onrender.com/');
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
