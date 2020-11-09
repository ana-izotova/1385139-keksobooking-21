'use strict';

const ADVERTISEMENTS_AMOUNT = 5;
const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const resetFormButton = adForm.querySelector(`.ad-form__reset`);
const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
const mapFilters = map.querySelector(`.map__filters`);
const mainPin = map.querySelector(`.map__pin--main`);
const mainButtonMouseEventCode = 0;

const activatePageOnMousedownHandler = (evt) => {
  if (evt.button === mainButtonMouseEventCode) {
    activatePage();
  }
};

const activatePageOnKeydownHandler = (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
};

const addPageActivationHandlers = () => {
  mainPin.addEventListener(`mousedown`, activatePageOnMousedownHandler);
  mainPin.addEventListener(`keydown`, activatePageOnKeydownHandler);
};

const removePageActivationHandlers = () => {
  mainPin.removeEventListener(`mousedown`, activatePageOnMousedownHandler);
  mainPin.removeEventListener(`keydown`, activatePageOnKeydownHandler);
};

const activateElements = (fields) => {
  [...fields].forEach((field) => (field.disabled = false));
};

const deactivateElements = (fields) => {
  [...fields].forEach((field) => (field.disabled = true));
};

const activatePage = () => {
  activateElements(adFormFieldsets);
  activateElements(mapFilters.children);
  adForm.classList.remove(`ad-form--disabled`);
  map.classList.remove(`map--faded`);
  const data = window.data.slice(0, ADVERTISEMENTS_AMOUNT);
  window.form.setAddress(true);
  window.pins.render(data);
  if (data) {
    window.filters.addChangeHandler();
  }
  window.form.addValidationHandlers();
  adForm.addEventListener(`submit`, window.form.submitHandler);
  removePageActivationHandlers();
  mainPin.addEventListener(`mousedown`, window.mainPin.move);
  resetFormButton.addEventListener(`click`, deactivatePage);
  window.imageUpload.addHandlers();
};


const deactivatePage = () => {
  deactivateElements(adFormFieldsets);
  deactivateElements(mapFilters.children);
  addPageActivationHandlers();
  window.form.removeValidationHandlers();
  window.pins.remove();
  window.cards.removePopup();
  adForm.classList.add(`ad-form--disabled`);
  map.classList.add(`map--faded`);
  window.mainPin.setDefaultPosition();
  mainPin.removeEventListener(`mousedown`, window.mainPin.move);
  window.filters.removeChangeHandler();
  window.form.reset();
  window.filters.reset();
  resetFormButton.removeEventListener(`click`, deactivatePage);
  window.imageUpload.removeHandlers();
};

deactivatePage();

window.pageState = {
  deactivate: deactivatePage
};
