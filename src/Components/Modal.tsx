import React, { useCallback, useRef, useState } from 'react';
import './Modal.css';
import { useClass } from '../hooks/useClass';

interface IModalProps {
  cb: (data?: any) => void;
  handleClose: Function;
}

const MAX_TEXT_LENGTH = 200;

export const Modal: React.FC<IModalProps> = ({ cb, handleClose }) => {
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const warning = useRef<HTMLDivElement>(null);
  const memoizedCb = useCallback(cb, [cb]);

  const { addClass: addShakingClass, removeClass: removeShakingClass } =
    useClass({ className: 'shaking', ref: warning });

  return (
    <div className="modal_container">
      <div className="modal">
        <h2>Adding new post</h2>

        <label htmlFor="new_post__author">Author:</label>
        <input
          id="new_post__author"
          onChange={(e) => setNewAuthor(e.target.value)}
        />

        <div className="text_length_counter__row">
          <label htmlFor="new_post__text">
            Post text:{' '}
            <span
              className={newText.length >= MAX_TEXT_LENGTH ? 'overflowed' : ''}>
              {newText.length}
            </span>
            /{MAX_TEXT_LENGTH}
          </label>
          {newText.length >= MAX_TEXT_LENGTH && (
            <div
              className="warning"
              onAnimationEnd={removeShakingClass}
              ref={warning}>
              Please, shrink your message under 200 symbols
            </div>
          )}
        </div>
        <textarea
          id="new_post__text"
          onChange={(e) => {
            setNewText(e.target.value);
          }}
        />

        <div className="close_icon" onClick={() => handleClose()}>
          X
        </div>

        <button
          onClick={() => {
            if (newText.length >= MAX_TEXT_LENGTH) {
              addShakingClass();
              return;
            }

            memoizedCb({
              text: newText,
              author: newAuthor,
              createdAt: Date.now() / 1000,
            });
            handleClose();
          }}>
          Add message
        </button>
      </div>
    </div>
  );
};
