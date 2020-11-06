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
        func(parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
