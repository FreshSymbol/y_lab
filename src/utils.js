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
 * Генератор масива страниц
 * @param pageCount {Number}
 * @param currentPage {Number}
 * @returns {Array}
 */
export const generatePageNumber = (pageQuantity, currentPage) => {
  const defaultPageQuantity = 5;
  const pages = [];

  if (pageQuantity <= 1) return [1];
  else if (pageQuantity <= defaultPageQuantity)
    for (let i = 1; i <= pageQuantity; i++) {
      pages.push(i);
    }
  else {
    if (currentPage < 3) pages.push(1, 2, 3, '...', pageQuantity);
    else if (currentPage === 3) pages.push(1, 2, 3, 4, '...', pageQuantity);
    else if (currentPage === pageQuantity || currentPage === pageQuantity - 1) {
      pages.push(1, '...', pageQuantity - 2, pageQuantity - 1, pageQuantity);
    } else {
      const prevPage = Math.max(currentPage - 1, 2);
      const nextPage = Math.min(currentPage + 1, pageQuantity - 1);
      pages.push(1, '...', prevPage, currentPage, nextPage, '...', pageQuantity);
    }
  }
  return pages;
};
