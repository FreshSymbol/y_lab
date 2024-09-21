import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import './style.css';

function Modal({ onClose = () => {}, title = '', children }) {
  const handleClick = evt => {
    evt.stopPropagation();
    if (evt.target.className === 'Modal') onClose();
  };

  const handleKeydown = evt => {
    if (evt.key === 'Escape') onClose();
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keydown', handleKeydown);
    };
  }),
    [];

  return (
    <div className="Modal">
      <div className="Modal-content">
        <div className="Modal-head">
          <Head title={title} />
          <button className="Modal-button" onClick={() => onClose()}>
            Закрыть
          </button>
        </div>
        <div className="Modal-body">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(Modal);
