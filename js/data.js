'use strict';

const successLoadHandler = (data) => {
  window.data = data.filter((item) => item.offer);
};

window.server.configure(successLoadHandler, window.utils.errorLoadHandler, window.server.HttpRequestMethod.GET);
