'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const pinsContainer = map.querySelector(`.map__pins`);
  const mainButtonMouseEventCode = 0;
  const ADVERTISEMENTS_NUMBER = 8;

  const deactivateElements = (fields) => {
    [...fields].forEach((field) => field.setAttribute(`disabled`, true));
  };
  const activateElements = (fields) => {
    [...fields].forEach((field) => field.removeAttribute(`disabled`));
  };

  const activatePage = (data) => {
    activateElements(adFormFieldsets);
    activateElements(mapFilters.children);
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    window.form.setAddress(mainPin);
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin, index) => {
      pin.hidden = false;
      pin.addEventListener(`click`, () => {
        window.card.openPopup(data[index]);
      });
    });
  };

  const pageActivationHandlers = (data) => {
    mainPin.addEventListener(`mousedown`, ((evt) => {
      if (evt.button === mainButtonMouseEventCode) {
        activatePage(data);
        window.pin.moveMainPin(evt);
      }
    }));

    mainPin.addEventListener(`keydown`, ((evt) => {
      if (evt.key === `Enter`) {
        activatePage();
      }
    }));
  };

  const pageDeactivation = (data) => {
    window.form.setAddress(mainPin, true);
    deactivateElements(adFormFieldsets);
    deactivateElements(mapFilters.children);
    pageActivationHandlers(data);
  };

  const successHandler = (data) => {
    const advertisements = [];
    let maxNumber = data.length < ADVERTISEMENTS_NUMBER ? data.length : ADVERTISEMENTS_NUMBER;
    for (let i = 0; i < maxNumber; i += 1) {
      advertisements.push(data[i]);
    }
    window.pin.makePins(ADVERTISEMENTS_NUMBER, advertisements);
    pageDeactivation(advertisements);
  };

  const errorHandler = (errorMessage) => {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.xhr.load(successHandler, errorHandler);

  window.main = {
    pageDeactivation
  };
})();

window.main.pageDeactivation();
