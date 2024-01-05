export const FilterTypes = ['author', 'message'] as const;
export type EFilterType = (typeof FilterTypes)[number];

export interface IAuthor {
  fullName: string;
  birthday: 0;
  id: string;
}
export interface IMessage {
  author: string;
  text: string;
  createdAt: number;
  id: string;
}
