import { cn as bem } from '@bem-react/classname';
import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemDetails({ item = {}, onAdd = () => {}, madeIn = {}, category = {} }) {
  const cn = bem('ItemDetails');

  return (
    <div className={cn()}>
      <p>{item.description}</p>
      <p>
        Страна производитель:
        <span className={cn('accent')}>{` ${madeIn.title}`}</span>
      </p>
      <p>
        Категория:
        <span className={cn('accent')}> {category.title}</span>
      </p>
      <p>
        Год выпуска:
        <span className={cn('accent')}> {item.edition}</span>
      </p>
      <p className={cn('price')}>{`Цена: ${item.price} ₽`}</p>
      <button
        onClick={() => {
          onAdd(item._id, item);
        }}
        className={cn('button')}
      >
        Добавить
      </button>
    </div>
  );
}

ItemDetails.propTypes = {
  item: PropTypes.object,
  madeIn: PropTypes.object,
  category: PropTypes.object,
  onAdd: PropTypes.func,
};

export default memo(ItemDetails);
