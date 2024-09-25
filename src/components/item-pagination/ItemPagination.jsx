import { cn as bem } from '@bem-react/classname';
import { memo } from 'react';
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

export default memo(ItemPagination);
