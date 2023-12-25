import { useMemo, useState } from 'react';
import { EFilterType, IMessage } from '../types';

export const useSearch = (messages: IMessage[]) => {
  const [input, setInput] = useState('');
  const [filterType, setFilterType] = useState<EFilterType>(EFilterType.author);
  const filteredMessagesList = useMemo(() => {
    return messages
      .filter(({ text, author }) => {
        return filterType === EFilterType.author
          ? author.toLowerCase().includes(input.toLowerCase())
          : text.toLowerCase().includes(input.toLowerCase());
      })
      .sort((a, b) => a.createdAt - b.createdAt);
  }, [input, filterType, messages]);

  return {
    filteredMessagesList,
    setFilterType,
    input,
    setInput,
  };
};
