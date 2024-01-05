import React from 'react';

interface IUseClassProps {
  className: string;
  ref: React.RefObject<HTMLElement>;
}

export const useClass = ({ className, ref }: IUseClassProps) => {
  const addClass = () => ref.current?.classList.add(className);
  const removeClass = () => ref.current?.classList.remove(className);
  return { addClass, removeClass };
};
