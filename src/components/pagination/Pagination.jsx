import { memo } from 'react';
import ItemPagination from '../item-pagination/ItemPagination';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ pages = [], currentPage = 0, setCurrentPage = () => {} }) {
  const cn = bem('Pagination');

  return (
    <div className={cn()}>
      {pages.map((number, index) => (
        <ItemPagination
          key={index}
          number={number}
          currentPage={currentPage}
          onClick={setCurrentPage}
        />
      ))}
    </div>
  );
}

export default memo(Pagination);
