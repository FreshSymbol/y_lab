export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comment/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Товар загружен успешно
        dispatch({
          type: 'comment/load-success',
          payload: { comments: res.data.result.items, count: res.data.result.count },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comment/load-error' });
      }
    };
  },

  add: data => {
    const token = localStorage.getItem('token');
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comment/load-start' });

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          headers: { 'X-Token': token },
          body: JSON.stringify(data),
        });
        // Товар загружен успешно
        dispatch({
          type: 'comment/load-success',
          payload: { comments: res.data.result.items, count: res.data.result.count },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comment/load-error' });
      }
    };
  },
};
