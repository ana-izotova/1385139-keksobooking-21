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
  const advertisements = window.data.createData(ADVERTISEMENTS_NUMBER);
  window.pin.makePins(ADVERTISEMENTS_NUMBER, advertisements);

  const deactivateElements = (fields) => {
    [...fields].forEach((field) => field.setAttribute(`disabled`, true));
  };
  const activateElements = (fields) => {
    [...fields].forEach((field) => field.removeAttribute(`disabled`));
  };

  const activatePage = () => {
    activateElements(adFormFieldsets);
    activateElements(mapFilters.children);
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    window.form.setAddress(mainPin);
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin, index) => {
      pin.hidden = false;
      pin.addEventListener(`click`, () => {
        window.card.openPopup(advertisements[index]);
      });
    });
  };

  const pageActivationHandlers = () => {
    mainPin.addEventListener(`mousedown`, ((evt) => {
      if (evt.button === mainButtonMouseEventCode) {
        activatePage();
      }
    }));

    mainPin.addEventListener(`keydown`, ((evt) => {
      if (evt.key === `Enter`) {
        activatePage();
      }
    }));
  };

  const pageDeactivation = () => {
    window.form.setAddress(mainPin, true);
    deactivateElements(adFormFieldsets);
    deactivateElements(mapFilters.children);
    pageActivationHandlers();
  };

  window.main = {
    pageDeactivation
  };
})();

window.main.pageDeactivation();
// 5-1 задание выполнено
