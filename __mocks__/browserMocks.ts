/**
 * mock file for handling browser API calls during tests
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
const localStorageMock = (function localStorageMock() {
  /** mock local storage object */
  let store: any = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: any) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      store[key] = null;
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
