/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem(code) {
    const isContains = this.state.basket.some(item => item.code === code);
    const containsItem = this.state.basket.find(item => item.code === code);
    const newItem = { ...this.state.list.find(item => item.code === code), count: 1 };

    if (isContains) {
      containsItem.count += 1;
      this.setState({
        ...this.state,
        basket: [...this.state.basket],
      });
    } else
      this.setState({
        ...this.state,
        basket: [...this.state.basket, newItem],
      });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      basket: this.state.basket.filter(item => item.code !== code),
    });
  }
}

export default Store;
