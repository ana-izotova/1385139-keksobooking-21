'use strict';

(() => {
  const successLoadHandler = (data) => {
    window.data = data.filter((item) => item.offer);
  };

  window.server.load(successLoadHandler, window.utils.errorLoadHandler);
})();
