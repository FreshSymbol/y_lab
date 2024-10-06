import StoreModule from '../module';

class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  //Получение списка категорий
  async fetchCategories() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'Установлены состояние категории',
    );

    try {
      const res = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await res.json();
      this.setState(
        {
          ...this.getState(),
          categories: json.result.items,
          waiting: false,
        },
        'Загружены категории из АПИ',
      );
    } catch (error) {
      console.log(error);
    }
  }
}
export default CategoriesState;
