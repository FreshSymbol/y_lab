import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import BasketTool from '../../components/basket-tool';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ItemDetails from '../../components/item-details';
import Menu from '../../components/menu';
import PageTool from '../../components/page-tool';

function Item() {
  const store = useStore();
  const { id } = useParams();

  useEffect(() => {
    store.actions.item.load(id);
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.item.item,
    madeIn: state.item.madeIn,
    category: state.item.category,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const menuList = [
    {
      text: 'Главная',
      to: '/',
    },
  ];

  return (
    <PageLayout>
      <Head title={select.item.title} />
      <PageTool>
        <Menu menuList={menuList} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </PageTool>
      <ItemDetails
        item={select.item}
        onAdd={callbacks.addToBasket}
        madeIn={select.madeIn}
        category={select.category}
      />
    </PageLayout>
  );
}

export default memo(Item);
