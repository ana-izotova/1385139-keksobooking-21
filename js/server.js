'use strict';

(() => {
  const Url = {
    LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
    UPLOAD: `https://21.javascript.pages.academy/keksobooking`
  };
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, Url.LOAD);
    xhr.send();
  };

  const upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open(`POST`, Url.UPLOAD);
    xhr.send(data);
  };

  window.server = {
    load,
    upload
  };
})();
