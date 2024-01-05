import React from 'react';
import { IMessage } from '../types';
import './Message.css';
import { Link } from 'react-router-dom';
export const Message: React.FC<Omit<IMessage, 'id'>> = ({
  createdAt,
  author,
  text,
}) => {
  const date = new Date(createdAt * 1000).toLocaleString('default', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
  return (
    <div className="message_block">
      <Link to={`/authors/${author}`} className="author">
        {author}
      </Link>
      <div className="text">{text}</div>
      <div className="date">{date}</div>
    </div>
  );
};
