'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = (func) => {
    let lastTimeout = null;
    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        // eslint-disable-next-line prefer-spread
        func.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
