import { FormEvent, useState, KeyboardEvent, useEffect } from 'react';
import { socket } from './socket';

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit(e as FormEvent);
  };

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const sendMessage = (msg: string) => {
      setMessages((prevState) => [...prevState, msg]);
    };
    socket.on('message', sendMessage);
    return () => {
      socket.off('message', sendMessage);
    };
  }, [messages]);

  return (
    <div>
      <ul>
        {messages.map((msg, idx) => {
          return <li key={idx}>{msg}</li>;
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
