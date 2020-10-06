'use strict';

(() => {
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

  window.map = {
    findPinCoordinates: findCoordinates
  };
})();
