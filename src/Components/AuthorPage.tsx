import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AuthorPage.css';
import { Message } from './Message';

export const AuthorPage: React.FC = () => {
  const [authorData, setAuthorData] = useState({ fullName: '', birthday: 0 });
  const [messages, setMessages] = useState([]);
  const { author } = useParams();

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/authors?fullName=${author}`)
        .then((data) => data.json())
        .then((data) => setAuthorData(data[0]));
      fetch(`http://localhost:3001/messages?author=${author}`)
        .then((data) => data.json())
        .then((data) => setMessages(data));
    } catch (e) {
      console.error(e);
    }
  }, [author]);

  return (
    <div className="author_page">
      <div className="author_name"> name - {authorData?.fullName}</div>
      <div className="author_birthday">{`birthday - ${new Date(
        authorData?.birthday,
      ).toLocaleString('default', {
        dateStyle: 'long',
      })}`}</div>

      <h2>Messages by {author}:</h2>
      <div className="messages">
        {messages.length
          ? messages.map(({ author, text, createdAt }) => (
              <Message author={author} text={text} createdAt={createdAt} />
            ))
          : 'No messages found'}
      </div>
    </div>
  );
};
