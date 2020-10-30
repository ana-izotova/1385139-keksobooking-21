'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const pinsContainer = map.querySelector(`.map__pins`);
  const mainButtonMouseEventCode = 0;
  const ADVERTISEMENTS_AMOUNT = 5;

  const activateElements = (fields) => {
    [...fields].forEach((field) => (field.disabled = false));
  };

  const activatePage = () => {
    activateElements(adFormFieldsets);
    activateElements(mapFilters.children);
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    window.form.setAddress(mainPin);
    window.pin.makePins(ADVERTISEMENTS_AMOUNT, window.cutData);
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    const data = window.cutData;
    pins.forEach((pin, index) => {
      pin.hidden = false;
      pin.addEventListener(`click`, () => {
        window.card.openPopup(data[index]);
      });
    });
    window.form.addFormValidationHandlers();
    adForm.addEventListener(`submit`, window.form.formSubmitHandler);
    removePageActivationHandlers();
    mainPin.addEventListener(`mousedown`, window.pin.moveMainPin);
  };

  const activateOnMousedown = (evt) => {
    if (evt.button === mainButtonMouseEventCode) {
      activatePage();
    }
  };

  const activateOnKeydown = (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
    }
  };

  const addPageActivationHandlers = () => {
    mainPin.addEventListener(`mousedown`, activateOnMousedown);
    mainPin.addEventListener(`keydown`, activateOnKeydown);
  };

  const removePageActivationHandlers = () => {
    mainPin.removeEventListener(`mousedown`, activateOnMousedown);
    mainPin.removeEventListener(`keydown`, activateOnKeydown);
  };

  const deactivateElements = (fields) => {
    [...fields].forEach((field) => (field.disabled = true));
  };

  const deactivatePage = () => {
    window.form.setAddress(mainPin, true);
    deactivateElements(adFormFieldsets);
    deactivateElements(mapFilters.children);
    addPageActivationHandlers();
    window.form.removeFormValidationHandlers();
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (pins) {
      pins.forEach((pin) => pin.remove());
    }
    adForm.classList.add(`ad-form--disabled`);
    map.classList.add(`map--faded`);
    mainPin.style.cssText = `left: ${window.pin.mainPinPosition[`left`]}px; top: ${window.pin.mainPinPosition[`top`]}px`;
    mainPin.removeEventListener(`mousedown`, window.pin.moveMainPin);
  };

  deactivatePage();

  window.pageState = {
    deactivatePage
  };
})();
