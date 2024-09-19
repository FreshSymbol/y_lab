import React, { useCallback, useState, useMemo } from 'react';
import List from './components/list';
import Basket from './components/basket';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import './style.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;
  const [isOpen, setIsOpen] = useState(false);

  const totalPrice = useMemo(
    () =>
      basket.reduce((acc, item) => {
        return acc + item.price * item.count;
      }, 0),
    [basket],
  );

  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(
      code => {
        store.addItem(code);
      },
      [store],
    ),

    onOpen: useCallback(() => {
      setIsOpen(true);
    }, [isOpen]),

    onClose: useCallback(() => {
      setIsOpen(false);
    }, [isOpen]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onOpen={callbacks.onOpen} basket={basket} totalPrice={totalPrice} />
      <List list={list} onAddItem={callbacks.onAddItem} />
      {isOpen && (
        <Basket
          basket={basket}
          onClose={callbacks.onClose}
          onDeleteItem={callbacks.onDeleteItem}
          totalPrice={totalPrice}
        />
      )}
    </PageLayout>
  );
}

export default App;
