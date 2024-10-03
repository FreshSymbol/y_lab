/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Слияние вложености
 * @param arr {Array}
 * @returns {Array}
 */
function flattenArr(arr) {
  const result = [];

  function flatten(item) {
    result.push(item);

    if (item.children) {
      item.children.forEach(child => {
        flatten(child);
      });
    }
  }
  arr.forEach(item => {
    flatten(item);
  });

  return result;
}

/**
 * Сортировка категорий по иерархии
 * @param arr {Array}
 * @returns {Array}
 */
export function sortCategory(arr) {
  const result = [];
  const map = arr.map(element => {
    return { ...element, children: [] };
  });

  map.forEach(element => {
    if (element.parent) {
      const parent = map.find(item => item._id === element.parent._id);
      parent.children.push({
        ...element,
        title: parent.parent ? `- - ${element.title}` : `- ${element.title}`,
      });
    } else {
      result.push(element);
    }
  });

  return flattenArr(result);
}
