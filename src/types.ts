export enum EFilterType {
  author = 'author',
  message = 'message',
}

export interface IMessage {
  author: string;
  text: string;
  createdAt: number;
}
