import React, { memo, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AuthorPage.css';
import { Message } from './Message';
import { IAuthor, IMessage } from '../types';
import { v4 as uuid } from 'uuid';
import { getAuthor } from '../api';

export const AuthorPage: React.FC<{ messages: IMessage[] }> = memo(
  ({ messages }) => {
    const [authorData, setAuthorData] = useState<IAuthor>({
      fullName: 'no name found',
      birthday: 0,
      id: uuid(),
    });
    const { author = '' } = useParams();

    const authorMessages = useMemo(() => {
      return messages.filter((msg) => author === msg.author);
    }, [author, messages]);

    useEffect(() => {
      getAuthor(author).then((data) => {
        setAuthorData(data[0]);
      });
    }, [author]);

    return (
      <div className="author_page">
        <div className="author_name"> name - {authorData?.fullName}</div>
        <div className="author_birthday">
          {authorData?.birthday
            ? `birthday - ${new Date(authorData.birthday).toLocaleString(
                'default',
                {
                  dateStyle: 'long',
                },
              )}`
            : 'Birthday not available'}
        </div>

        <h2>Messages by {author}:</h2>
        <div className="messages">
          {authorMessages.length
            ? authorMessages.map(({ author, text, createdAt, id }) => (
                <Message
                  author={author}
                  text={text}
                  createdAt={createdAt}
                  key={id}
                />
              ))
            : 'No messages found'}
        </div>
      </div>
    );
  },
);
