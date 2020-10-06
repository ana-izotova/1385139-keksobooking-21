'use strict';

const addressField = document.querySelector(`#address`);

const MainPinSize = {
  WIDTH: 62,
  HEIGHT: 84
};

const findCoordinates = (pin) => {
  const coordinates = pin.getBoundingClientRect();
  const coordX = Math.round(coordinates.left + MainPinSize.WIDTH / 2);
  const coordY = Math.round(coordinates.top + MainPinSize.HEIGHT);
  return [coordX, coordY].join(`, `);
};

const setAddress = (pin) => {
  const coordinates = findCoordinates(pin);
  addressField.value = coordinates;
};

setAddress(mainPin);
