import React from 'react';
import { createRoot } from 'react-dom/client';
import { getGenerateCode } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: getGenerateCode(), title: 'Название элемента', count: 0 },
    { code: getGenerateCode(), title: 'Некий объект', count: 0 },
    { code: getGenerateCode(), title: 'Заголовок', count: 0 },
    { code: getGenerateCode(), title: 'Очень длинное название элемента из семи слов', count: 0 },
    { code: getGenerateCode(), title: 'Запись', count: 0 },
    { code: getGenerateCode(), title: 'Шестая запись', count: 0 },
    { code: getGenerateCode(), title: 'Седьмая запись', count: 0 },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
