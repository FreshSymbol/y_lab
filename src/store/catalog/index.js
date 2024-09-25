import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      allItemQuantity: 0,
      currentPage: 1,
    };
  }

  async load(limit = 10, skip = 0) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }

  async getAllItemQuantity() {
    const response = await fetch(
      '/api/v1/articles?limit=10&skip=10&fields=items(_id,title,price),count',
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        allItemQuantity: json.result.count,
      },
      'Загружено количесво товаров из АПИ',
    );
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page,
    });
  }
}

export default Catalog;
