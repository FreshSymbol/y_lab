import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function Controls({ onOpen = () => {}, totalPrice = 0, basket = [] }) {
  return (
    <div className="Controls">
      <p className="Controls-text">
        В корзине:{' '}
        <span className="Controls-text_accent">
          {!basket.length
            ? 'пусто'
            : `${basket.length} ${plural(basket.length, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${totalPrice} ₽`}
        </span>
      </p>
      <button className="Controls-button" onClick={() => onOpen()}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onOpen: PropTypes.func,
  totalPrice: PropTypes.number,
};

export default React.memo(Controls);
