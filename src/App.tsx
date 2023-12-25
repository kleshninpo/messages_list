import React, { useEffect, useState } from 'react';
import { MessagesList } from './Components/MessagesList';
import { Route, Routes } from 'react-router-dom';
import { AuthorPage } from './Components/AuthorPage';
import { IMessage } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        fetch('http://localhost:3001/messages')
          .then((messages) => messages.json())
          .then((messages) => {
            setMessages(messages);
          });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MessagesList
              messages={messages}
              setMessages={setMessages}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/authors/:author" element={<AuthorPage />} />
      </Routes>
    </div>
  );
}

export default App;
