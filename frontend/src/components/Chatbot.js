import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');

    let response = { text: 'Sorry, I didn’t understand that.', sender: 'bot' };

    try {
      if (input.toLowerCase().includes('top 5 most sold products')) {
        const res = await axios.get('http://localhost:5000/api/top-products');
        const products = res.data.map(p => `${p.product.name}: ${p.quantity} sold`).join('\n');
        response = { text: `Top 5 most sold products:\n${products}`, sender: 'bot' };
      } else if (input.toLowerCase().includes('status of order')) {
        const orderId = input.match(/\d+/);
        if (orderId) {
          const res = await axios.get(`http://localhost:5000/api/order/${orderId[0]}`);
          response = { text: `Order ${orderId[0]}: ${res.data.status}`, sender: 'bot' };
        }
      } else if (input.toLowerCase().includes('classic t-shirt') && input.toLowerCase().includes('stock')) {
        const res = await axios.get('http://localhost:5000/api/stock/Classic T-Shirt');
        response = { text: `Classic T-Shirt stock: ${res.data.stock}`, sender: 'bot' };
      }
    } catch (err) {
      response = { text: 'Error fetching data. Please try again.', sender: 'bot' };
    }

    setMessages([...messages, userMessage, response]);
  };

  return (
    <div>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;