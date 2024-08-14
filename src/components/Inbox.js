import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/messages/inbox');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Inbox</h2>
      <ul className="list-group">
        {messages.map((message) => (
          <li key={message._id} className="list-group-item">
            <strong>From: {message.sender.name}</strong>
            <p>{message.content}</p>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
