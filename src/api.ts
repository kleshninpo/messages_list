import { IAuthor, IMessage } from './types';

const handleFetchErrors = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

// TODO: здесь ещё, по-хорошему, надо бы добавлять в authors нового автора с id и датой рождения
export const addMessage = (message: IMessage) => {
  return fetch('http://localhost:3001/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ ...message }),
  })
    .then(handleFetchErrors)
    .catch((e) => {
      console.error('Error adding new message:', e);
    });
};

export const getMessages = (): Promise<IMessage[]> => {
  return fetch('http://localhost:3001/messages')
    .then(handleFetchErrors)
    .catch((e) => {
      console.error('Error fetching messages:', e);
    });
};

export const getAuthor = (author: string): Promise<IAuthor[]> => {
  return fetch(`http://localhost:3001/authors?fullName=${author}`)
    .then(handleFetchErrors)
    .catch((e) => {
      console.error('Error fetching author:', e);
    });
};

export const getMessagesByAuthor = (author: string): Promise<IMessage[]> => {
  return fetch(`http://localhost:3001/messages?author=${author}`)
    .then(handleFetchErrors)
    .catch((e) => {
      console.error(`Error fetching author's messages: `, e);
    });
};
