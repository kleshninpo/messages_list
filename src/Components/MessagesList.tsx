import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './MessagesList.css';
import { IMessage } from '../types';
import { Message } from './Message';
import { SearchPanel } from './SearchPanel';
import { useSearch } from '../hooks/useSearch';
import { useFlag } from '../hooks/useFlag';
import { Modal } from './Modal';
import { addMessage, getMessages } from '../api';

export const MessagesList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { filteredMessagesList, setInput, input, setFilterType } =
    useSearch(messages);

  const { setTrue: show, setFalse: hide, isTrue: isVisible } = useFlag();

  useEffect(() => {
    setIsLoading(true);
    getMessages()
      .then((msgs) => {
        if (msgs) setMessages(msgs);
      })
      .catch((e) => console.error(e.message));
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div style={{ fontSize: '55px' }}>LOADING...</div>
  ) : (
    <div className="messages_list">
      <SearchPanel
        setInput={setInput}
        input={input}
        setFilterType={setFilterType}
      />
      {isVisible && (
        <Modal
          cb={(message: IMessage) => {
            addMessage({ ...message, id: uuid() }).then(() =>
              setMessages([...messages, message]),
            );
          }}
          handleClose={hide}
        />
      )}
      <button onClick={show}>Add new message</button>
      {filteredMessagesList.map(({ author, createdAt, text, id }) => {
        return (
          <Message key={id} author={author} createdAt={createdAt} text={text} />
        );
      })}
    </div>
  );
};
