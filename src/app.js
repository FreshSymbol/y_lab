import React, { useCallback, useState, useMemo, useEffect } from 'react';
import List from './components/list';
import Basket from './components/basket';
import Controls from './components/controls';
import Head from './components/head';
import Modal from './components/modal';
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

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isOpen]);

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

    getTotalPrice: useCallback(() => {
      return store.getTotalPrice();
    }, [store]),

    onOpen: useCallback(() => {
      setIsOpen(true);
    }, [isOpen]),

    onClose: useCallback(() => {
      setIsOpen(false);
    }, [isOpen]),
  };

  return (
    <PageLayout isOpen={isOpen}>
      <Head title="Магазин" />
      <Controls onOpen={callbacks.onOpen} basket={basket} totalPrice={callbacks.getTotalPrice} />
      <List list={list} onAction={callbacks.onAddItem} buttonText="Добавить" />
      {isOpen && (
        <Modal onClose={callbacks.onClose} title="Корзина">
          <Basket
            basket={basket}
            onDeleteItem={callbacks.onDeleteItem}
            totalPrice={callbacks.getTotalPrice}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
