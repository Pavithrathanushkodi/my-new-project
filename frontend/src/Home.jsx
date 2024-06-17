import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
  const [messages, setMessages] = useState([
    { text: 'Hello, how are you?', sender: 'other' },
    { text: 'I am fine, thank you!', sender: 'me' },
    { text: 'What about you?', sender: 'other' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    companyName: '',
    projectName: '',
    email: '',
  });

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      fetchUserDetails(userEmail);
    }
  }, []);

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.post('http://localhost:3001/home', { email });
      const { name, companyName, projectName } = response.data;
      setUserInfo({ name, companyName, projectName, email });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      // Add message to local state immediately for responsiveness
      const updatedMessages = [...messages, { text: newMessage, sender: 'me' }];
      setMessages(updatedMessages);
      setNewMessage('');

      // Send the message to the server
      try {
        const response = await axios.post('http://localhost:3001/sendMessage', {
          message: newMessage,
          userEmail: userInfo.email,
        });
        // Assuming the server returns the updated messages array
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className='home-container d-flex vh-100'>
      <div className='user-info bg-secondary p-3 text-white'>
        <h2>{userInfo.name}</h2>
        <p>Company: {userInfo.companyName}</p>
        <p>Project: {userInfo.projectName}</p>
        <p>Email: {userInfo.email}</p>
      </div>
      <div className='chat-container bg-light flex-grow-1 d-flex flex-column'>
        <div className='messages flex-grow-1 p-3'>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className='message-input d-flex p-3'>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className='form-control rounded-0'
            placeholder='Type a message'
          />
          <button className='btn btn-primary rounded-0' onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
