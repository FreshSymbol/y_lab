import { memo, useCallback, useEffect, useMemo } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination/';
import Menu from '../../components/menu/';
import { generatePageNumber } from '../../utils';
import PageTool from '../../components/page-tool';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    allItemQuantity: state.catalog.allItemQuantity,
    currentPage: state.catalog.currentPage,
  }));

  const limit = 10;
  const skip = select.currentPage === 1 ? 0 : (select.currentPage - 1) * limit - 1;
  const pageCount = Math.ceil(select.allItemQuantity / limit);
  const pages = useMemo(() => {
    return generatePageNumber(pageCount, select.currentPage);
  }, [select.currentPage, pageCount]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    setCurrentPage: useCallback(
      number => {
        store.actions.catalog.setCurrentPage(number);
      },
      [select.currentPage],
    ),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  const menuList = [
    {
      text: 'Главная',
      to: '/',
    },
  ];

  useEffect(() => {
    store.actions.catalog.load(limit, skip);
    store.actions.catalog.getAllItemQuantity();
  }, [select.currentPage]);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <PageTool>
        <Menu menuList={menuList} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </PageTool>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        pages={pages}
        currentPage={select.currentPage}
        setCurrentPage={callbacks.setCurrentPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
