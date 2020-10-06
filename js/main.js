'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFilters = map.querySelectorAll(`.map__filter`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const mainButtonMouseEventCode = 0;
  const ADVERTISEMENTS_NUMBER = 8;
  const advertisements = window.data.createData(ADVERTISEMENTS_NUMBER);
  console.log(advertisements);

  const deactivateElements = (fields) => fields.forEach((field) => field.setAttribute(`disabled`, true));
  const activateElements = (fields) => fields.forEach((field) => field.removeAttribute(`disabled`));

  const activatePage = () => {
    activateElements(adFormFieldsets);
    activateElements(mapFilters);
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
  };

  const pageActivationHandlers = () => {
    mainPin.addEventListener(`mousedown`, ((evt) => {
      if (evt.button === mainButtonMouseEventCode) {
        activatePage();
        window.form.setAddress(mainPin);
        window.pin.makePins(ADVERTISEMENTS_NUMBER, advertisements);
      }
    }));

    mainPin.addEventListener(`keydown`, ((evt) => {
      if (evt.key === `Enter`) {
        activatePage();
        // setAddress(mainPin);
      }
    }));
  };

  const pageDeactivation = () => {
    deactivateElements(adFormFieldsets);
    deactivateElements(mapFilters);
    pageActivationHandlers();
  };

  window.main = {
    pageDeactivation
  };
})();

window.main.pageDeactivation();
