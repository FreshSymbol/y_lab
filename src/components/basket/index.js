import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import Head from '../head';
import './style.css';

function Basket({ basket = [], onDeleteItem = () => {}, onClose = () => {}, totalPrice = 0 }) {
  const handleClick = evt => {
    evt.stopPropagation();
    if (evt.target.className === 'Basket') onClose();
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
    <div className="Basket">
      <div className="Basket-content">
        <div className="Basket-head">
          <Head title="Корзина" />
          <button className="Basket-button" onClick={() => onClose()}>
            Закрыть
          </button>
        </div>
        <div className="Basket-body">
          {!basket.length ? (
            <p className="Basket-isEmpty">Корзина пустая</p>
          ) : (
            <div>
              {basket.map(item => (
                <div className="Basket-item" key={item.code}>
                  <Item item={item} onAction={onDeleteItem} buttonText="Удалить" />
                </div>
              ))}
            </div>
          )}
          <div className="Basket-total">
            <span>Итого</span>{' '}
            <span>
              {totalPrice}
              {'\u00a0'}₽
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onClose: PropTypes.func,
  onDeleteItem: PropTypes.func,
  totalPrice: PropTypes.number,
};

export default React.memo(Basket);
