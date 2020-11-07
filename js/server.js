'use strict';

const Url = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  SEND: `https://21.javascript.pages.academy/keksobooking`
};
const StatusCode = {
  OK: 200
};

const HttpRequestMethod = {
  LOAD: `GET`,
  SEND: `POST`
};

const TIMEOUT_IN_MS = 10000;

const server = (xhr, onSuccess, onError) => {
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
};

const load = (onSuccess, onError) => {
  const xhrLoad = new XMLHttpRequest();

  xhrLoad.open(HttpRequestMethod.LOAD, Url.LOAD);
  server(xhrLoad, onSuccess, onError);
  xhrLoad.send();
};

const send = (data, onSuccess, onError) => {
  const xhrSend = new XMLHttpRequest();

  xhrSend.open(HttpRequestMethod.SEND, Url.SEND);
  server(xhrSend, onSuccess, onError);
  xhrSend.send(data);
};

window.server = {
  load,
  send
};
