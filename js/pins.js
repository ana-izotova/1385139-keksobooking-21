'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const pinsContainer = map.querySelector(`.map__pins`);

  const PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const removePins = () => {
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    if (pins) {
      pins.forEach((pin) => pin.remove());
    }
  };

  const createPinElement = (pinObject) => {
    const {author: {avatar}, offer: {title}, location: {x, y}} = pinObject;
    const newPin = pinTemplate.cloneNode(true);
    const pinImg = newPin.querySelector(`img`);
    newPin.style.left = `${x - (PinSize.WIDTH / 2)}px`;
    newPin.style.top = `${y - PinSize.HEIGHT}px`;
    pinImg.src = avatar;
    pinImg.alt = title;

    return newPin;
  };

  const createPinsArrayFragment = (cardsArray) => {
    const fragment = document.createDocumentFragment();
    cardsArray.forEach((item) => {
      const pin = createPinElement(item);
      fragment.appendChild(pin);
    });
    return fragment;
  };

  const renderPins = (data) => {
    const pinsFragment = createPinsArrayFragment(data);
    removePins();
    window.cards.removePopup();
    mapPins.appendChild(pinsFragment);
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin, index) => {
      pin.addEventListener(`click`, pinClickHandler(pin, index, data));
    });
  };

  const pinClickHandler = (pin, index, data) => {
    return () => {
      window.cards.openPopup(data[index], pin);
    };
  };

  const setActiveModificator = (pin) => {
    pin.classList.add(`map__pin--active`);
  };

  const removeActiveModificator = () => {
    const activePin = map.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  window.pins = {
    render: renderPins,
    remove: removePins,
    setActiveModificator,
    removeActiveModificator
  };
})();

