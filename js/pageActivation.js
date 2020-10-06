'use strict';

const mainButtonMouseEventCode = 0;

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
      setAddress(mainPin);
    }
  }));

  mainPin.addEventListener(`keydown`, ((evt) => {
    if (evt.key === `Enter`) {
      activatePage();
      setAddress(mainPin);
    }
  }));
};

