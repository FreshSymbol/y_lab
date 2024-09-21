import React from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import './style.css';

function Basket({ basket = [], onDeleteItem = () => {}, totalPrice = () => {} }) {
  return (
    <>
      {!basket.length ? (
        <p className="Basket-isEmpty">Корзина пустая</p>
      ) : (
        <List list={basket} onAction={onDeleteItem} buttonText="Удалить" />
      )}
      <div className="Basket-total">
        <span>Итого</span>{' '}
        <span>
          {new Intl.NumberFormat().format(totalPrice())}
          {'\u00a0'}₽
        </span>
      </div>
    </>
  );
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  totalPrice: PropTypes.func,
};

export default React.memo(Basket);
