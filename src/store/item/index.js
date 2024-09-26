import StoreModule from '../module';

class ItemDetails extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item: {},
      category: {},
      madeIn: {},
    };
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        item: json.result,
        category: json.result.category,
        madeIn: json.result.madeIn,
      },
      'Загружены детали товара из АПИ',
    );
  }
}

export default ItemDetails;
