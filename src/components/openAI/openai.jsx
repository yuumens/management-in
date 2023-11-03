import './openai.css'
import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbars from '../navbar/navbar';
import { openai } from '../../utils/openAIConfig';

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
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: input },
          { role: "assistant", content: "Placeholder for asisten" },
        ],
        temperature : 1,
        max_tokens : 256,
      });
      const botResponse = chatCompletion.choices[0].message.content;
      const userQuestion = input;
      setMessages([
        ...messages,
        { role: "user", text: userQuestion },
        { role: "assistant", text: botResponse },
      ]);
      setInput('');
      console.log(import.meta.env.VITE_APP_OPENAI_API_KEY);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      console.log(import.meta.env.VITE_APP_OPENAI_API_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HelmetProvider>
        <Helmet>
            <title>managementIn - ChatBot</title>
        </Helmet>
    <Navbars/>
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
      <div
        key={index}
        className={message.role === "user" ? "user-message" : "assistant-message"}
      >
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
