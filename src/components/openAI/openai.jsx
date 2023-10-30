import axios from 'axios';
import './openai.css'
import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    setIsLoading(true);

    try {
      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: input,
        max_tokens: 250,
      }, {
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
        },
      });

      const botResponse = response.data.choices[0].text;
      setMessages([...messages, { text: input, isUser: true }, { text: botResponse, isUser: false }]);
      setInput('');
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HelmetProvider>
        <Helmet>
            <title>managementIn - ChatBot</title>
        </Helmet>
    <div className="chat-bot">
      <div className="chat-bot-container">
      <h1>ChatBot</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Write a Message..."
        />
        <button onClick={sendMessage} disabled={isLoading} style={{marginRight : '10px', borderRadius: '5px'}}>
            {isLoading ? 'Answer...' : 'Send'}
        </button>

        <button onClick={() => window.history.back()} style={{borderRadius: '5px'}}>
            Back
        </button>
      </div>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
            {message.text}
          </div>
        ))}
      </div>
      </div>
    </div>
    </HelmetProvider>
    
  );
};

export default Chatbot;
