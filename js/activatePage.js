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
    [...fields].forEach((field) => field.removeAttribute(`disabled`));
  };

  window.isActive = false;
  const activatePage = () => {
    activateElements(adFormFieldsets);
    activateElements(mapFilters.children);
    adForm.classList.remove(`ad-form--disabled`);
    map.classList.remove(`map--faded`);
    window.form.setAddress(mainPin);
    window.pin.makePins(ADVERTISEMENTS_AMOUNT, window.data);
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    const data = window.data;
    pins.forEach((pin, index) => {
      pin.hidden = false;
      pin.addEventListener(`click`, () => {
        window.card.openPopup(data[index]);
      });
    });
    // adForm.addEventListener(`submit`, (evt) => {
    //   evt.preventDefault();
    //   window.formUpload.formSubmitHandler();
    // });
    window.isActive = true;
    console.log(window.isActive)
  };

  const pageActivationHandlers = () => {
    mainPin.addEventListener(`mousedown`, ((evt) => {
      if (evt.button === mainButtonMouseEventCode) {
        activatePage();
        window.pin.moveMainPin(evt);
      }
    }));

    mainPin.addEventListener(`keydown`, ((evt) => {
      if (evt.key === `Enter`) {
        activatePage();
      }
    }));
  };

  window.activatePage = {
    pageActivationHandlers
  };
})();
