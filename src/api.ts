import { IAuthor, IMessage } from './types';

// TODO: здесь ещё, по-хорошему, надо бы добавлять в authors нового автора с id и датой рождения
export const addMessage = (message: IMessage) => {
  return fetch('http://localhost:3001/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ ...message }),
  }).catch((e) => {
    console.error('Error adding new message:', e);
  });
};

export const getMessages = (): Promise<IMessage[]> => {
  return fetch('http://localhost:3001/messages')
    .then((messages) => {
      if (messages.status === 200) return messages.json();
    })
    .catch((e) => {
      console.error('Error fetching messages:', e);
    });
};

export const getAuthor = (author: string): Promise<IAuthor[]> => {
  return fetch(`http://localhost:3001/authors?fullName=${author}`)
    .then((authorData) => {
      if (authorData.status === 200) return authorData.json();
    })
    .catch((e) => {
      console.error('Error fetching author:', e);
    });
};
