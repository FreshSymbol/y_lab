/**
 * Слияние вложенности коментариев
 * @param arr {Array}
 * @returns {Array}
 */

export default function flattenComment(arr) {
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
