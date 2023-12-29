import React from 'react';
import { v4 as uuid } from 'uuid';
import { IMessage } from '../types';
import { Message } from './Message';
import './MessagesList.css';
import { SearchPanel } from './SearchPanel';
import { useSearch } from '../hooks/useSearch';
import { useFlag } from '../hooks/useFlag';
import { Modal } from './Modal';
import { addMessage } from '../api';

interface IMessagesListProps {
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  isLoading: boolean;
}

export const MessagesList: React.FC<IMessagesListProps> = ({
  messages,
  setMessages,
  isLoading,
}) => {
  const { filteredMessagesList, setInput, input, setFilterType } =
    useSearch(messages);

  const { setTrue: show, setFalse: hide, isTrue: isVisible } = useFlag();
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
