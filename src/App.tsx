import React, { useEffect, useState } from 'react';
import { MessagesList } from './Components/MessagesList';
import { Route, Routes } from 'react-router-dom';
import { AuthorPage } from './Components/AuthorPage';
import { IMessage } from './types';
import { getMessages } from './api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getMessages()
      .then((msgs) => {
        if (msgs) setMessages(msgs);
      })
      .catch((e) => console.error(e.message));
    setIsLoading(false);
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
        <Route
          path="/authors/:author"
          element={<AuthorPage messages={messages} />}
        />
      </Routes>
    </div>
  );
}

export default App;
