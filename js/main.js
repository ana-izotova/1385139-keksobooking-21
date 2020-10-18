'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const pinsContainer = map.querySelector(`.map__pins`);
  const mainButtonMouseEventCode = 0;

  const successHandler = (data) => {
    window.data.serverData = data.filter((item) => item.offer);
    window.data.amount = data.length;
    window.pin.makePins(window.data.amount, data);
    pageDeactivation();
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `
    z-index: 100;
    width: 300px;
    margin: 0 auto;
    padding: 25px;
    text-align: center;
    background-color: #f0f0ea;
    border: #ff5635 2px solid;
    border-radius: 25px;
    box-shadow: 0 0 40px #ff5635;
    color: #ff5635;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    `;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.server.load(successHandler, errorHandler);

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
    const data = window.data.serverData;
    pins.forEach((pin, index) => {
      pin.hidden = false;
      pin.addEventListener(`click`, () => {
        window.card.openPopup(data[index]);
      });
    });
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

  const pageDeactivation = () => {
    window.form.setAddress(mainPin, true);
    deactivateElements(adFormFieldsets);
    deactivateElements(mapFilters.children);
    pageActivationHandlers();
  };
})();
