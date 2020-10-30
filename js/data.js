'use strict';

(() => {
  const ADVERTISEMENTS_AMOUNT = 5;

  const successLoadHandler = (data) => {
    window.data = data.filter((item) => item.offer).slice(0, ADVERTISEMENTS_AMOUNT);
  };

  window.server.load(successLoadHandler, window.utils.errorLoadHandler);
})();
