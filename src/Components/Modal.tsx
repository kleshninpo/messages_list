import React, { useState } from 'react';
import './Modal.css';

interface IModalProps {
  cb: (data?: any) => void;
  handleClose: Function;
}

const MAX_TEXT_LENGTH = 200;

export const Modal: React.FC<IModalProps> = ({ cb, handleClose }) => {
  const [count, setCount] = useState(0);
  const [newText, setNewText] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  return (
    <div className="modal_container">
      <div className="modal">
        <h2>Adding new post</h2>

        <label htmlFor="new_post__author">Author:</label>
        <input
          id="new_post__author"
          onChange={(e) => setNewAuthor(e.target.value)}
        />

        <label htmlFor="new_post__text">
          Post text: {count} / {MAX_TEXT_LENGTH}
        </label>
        <textarea
          id="new_post__text"
          maxLength={MAX_TEXT_LENGTH}
          onChange={(e) => {
            setNewText(e.target.value);
            setCount(e.target.value.length);
          }}
        />

        <div className="close_icon" onClick={() => handleClose()}>
          X
        </div>

        <button
          onClick={() => {
            cb({
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
