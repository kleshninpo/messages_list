import React from 'react';
import { MessagesList } from './Components/MessagesList';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthorPage } from './Components/AuthorPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/messages" />} />
        <Route path="/messages" element={<MessagesList />} />
        <Route path="/authors/:author" element={<AuthorPage />} />
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
