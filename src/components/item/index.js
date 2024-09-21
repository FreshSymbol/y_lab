import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ onAction = () => {}, buttonText = '', item = {} }) {
  const callbacks = {
    onClick: e => {
      e.stopPropagation();
      onAction(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="ItemDetails">
        <span>
          {new Intl.NumberFormat().format(item.price)}
          {'\u00A0'}₽
        </span>
        {item.count && (
          <span>
            {item.count}
            {'\u00A0'}шт
          </span>
        )}
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onClick}>{buttonText}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func,
  buttonText: PropTypes.string,
};

export default React.memo(Item);
