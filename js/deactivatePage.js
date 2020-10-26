'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const deactivateElements = (fields) => {
    [...fields].forEach((field) => field.setAttribute(`disabled`, true));
  };

  window.deactivatePage = () => {
    window.form.setAddress(mainPin, true);
    deactivateElements(adFormFieldsets);
    deactivateElements(mapFilters.children);
    window.activatePage.pageActivationHandlers();
  };

})();

