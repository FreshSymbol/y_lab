import { cn as bem } from '@bem-react/classname';
import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemPagination({ number = 0, currentPage = 1, onClick = () => {} }) {
  const cn = bem('ItemPagination');

  return (
    <button
      onClick={() => onClick(number)}
      className={cn({ active: number === currentPage })}
      disabled={number === '...'}
    >
      {number}
    </button>
  );
}

ItemPagination.propTypes = {
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  currentPage: PropTypes.number,
  onClick: PropTypes.func,
};
export default memo(ItemPagination);
