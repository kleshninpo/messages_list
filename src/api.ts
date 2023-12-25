import { IMessage } from './types';

export const addMessage = async (message: IMessage) => {
  try {
    fetch('http://localhost:3001/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(message),
    });
  } catch (e) {
    console.error(e);
  }
};
