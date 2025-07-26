const handleSubmit = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  setMessages([...messages, { sender: 'user', text: input }]);

  try {
    if (input.toLowerCase().includes('top 5')) {
      const res = await axios.get('http://localhost:5000/api/top-products');
      const response = res.data.map(p => p.name).join(', ');
      setMessages([...messages, { sender: 'bot', text: `Top 5 products: ${response}` }]);
    } else if (input.toLowerCase().includes('order status') && input.match(/\d+/)) {
      const orderId = input.match(/\d+/)[0];
      const res = await axios.get(`http://localhost:5000/api/order/${orderId}`);
      setMessages([...messages, { sender: 'bot', text: `Order ${orderId} status: ${res.data.status}` }]);
    } else {
      setMessages([...messages, { sender: 'bot', text: 'Sorry, I didn’t understand that.' }]);
    }
  } catch (error) {
    console.error('API error:', error);
    setMessages([...messages, { sender: 'bot', text: 'Sorry, there was an error processing your request.' }]);
  }

  setInput('');
};