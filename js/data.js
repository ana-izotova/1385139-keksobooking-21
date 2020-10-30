'use strict';

(() => {
  const ADVERTISEMENTS_AMOUNT = 5;

  const successLoadHandler = (data) => {
    window.data = data.filter((item) => item.offer);
    window.cutData = window.data.slice(0, ADVERTISEMENTS_AMOUNT);
    window.filter.addFilersHandlers();
  };

  window.server.load(successLoadHandler, window.utils.errorLoadHandler);
})();
