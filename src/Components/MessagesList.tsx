import React from 'react';
import { IMessage } from '../types';
import { Message } from './Message';
import './MessagesList.css';
import { SearchPanel } from './SearchPanel';
import { useSearch } from '../hooks/useSearch';
import { useModal } from '../hooks/useModal';
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

  const { isVisible, show, hide } = useModal();
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
            addMessage(message).then(() => setMessages([...messages, message]));
          }}
          handleClose={hide}
        />
      )}
      <button onClick={show}>Add new message</button>
      {filteredMessagesList.map(({ author, createdAt, text }, i) => {
        return (
          <Message key={i} author={author} createdAt={createdAt} text={text} />
        );
      })}
    </div>
  );
};
