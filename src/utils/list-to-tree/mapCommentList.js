import flattenComment from '../flattenComment';
/**
 * Сортировка комментариев по иерархии
 * @param arr {Array}
 * @returns {Array}
 */
export default function mapCommentList(arr) {
  const result = [];
  const map = arr.map(element => {
    return { ...element, children: [] };
  });

  map.forEach(element => {
    if (element.parent) {
      const parent = map.find(item => item._id === element.parent._id);
      parent.children.push({
        ...element,
        isChildren: parent.parent ? true : false,
      });
    } else {
      result.push(element);
    }
  });

  return flattenComment(result);
}
