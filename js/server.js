'use strict';

const Url = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  SEND: `https://21.javascript.pages.academy/keksobooking`
};
const StatusCode = {
  OK: 200
};

const HttpRequestMethod = {
  GET: `GET`,
  POST: `POST`
};

const TIMEOUT_IN_MS = 10000;

const configureServer = (onSuccess, onError, method = HttpRequestMethod.GET, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  if (method === HttpRequestMethod.POST) {
    xhr.open(HttpRequestMethod.POST, Url.SEND);
    xhr.send(data);
  } else {
    xhr.open(HttpRequestMethod.GET, Url.LOAD);
    xhr.send();
  }

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
};

window.server = {
  HttpRequestMethod,
  configure: configureServer
};
