const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

const getIds = (items) => items.map(({ id }) => id);

describe('filterByCategory', () => {
  describe('все категории', () => {
    test("'all' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
      expect(getIds(filterByCategory(products, 'all'))).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('undefined возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
      expect(getIds(filterByCategory(products, undefined))).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
      expect(getIds(filterByCategory(products, ''))).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('существующая категория', () => {
    test("'electronics' возвращает товары с ID [1, 2]", () => {
      expect(getIds(filterByCategory(products, 'electronics'))).toEqual([1, 2]);
    });

    test("'books' возвращает товары с ID [3, 6]", () => {
      expect(getIds(filterByCategory(products, 'books'))).toEqual([3, 6]);
    });

    test("'home' возвращает товары с ID [4, 5]", () => {
      expect(getIds(filterByCategory(products, 'home'))).toEqual([4, 5]);
    });
  });

  describe('несуществующая категория', () => {
    test("'clothes' возвращает пустой массив", () => {
      expect(filterByCategory(products, 'clothes')).toEqual([]);
    });

    test("'toys' возвращает пустой массив", () => {
      expect(filterByCategory(products, 'toys')).toEqual([]);
    });

    test("'sports' возвращает пустой массив", () => {
      expect(filterByCategory(products, 'sports')).toEqual([]);
    });
  });
});
