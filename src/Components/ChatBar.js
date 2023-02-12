import React, { useState, useEffect }  from 'react';

const ChatBar = ({socket}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      setUsers(data)
      data.forEach(user => {
        if (user.userName !== localStorage.getItem('userName')){
          localStorage.setItem("friendID",user.userName)
        }
      });
    }
    );
    
    
  }, [socket, users]);
  return (
    <div className="chat__sidebar">
      <h1>CineParty</h1>
      <hr/>
      <div>
        <h5 className="chat__header">ACTIVE USERS</h5>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;