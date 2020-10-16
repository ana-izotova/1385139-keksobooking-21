'use strict';

(() => {
  const MainPinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    TAIL: 22
  };

  const findPinCenterCoordinates = (pin) => {
    const x = Math.round(parseInt(pin.style.left, 10) + pin.offsetWidth / 2);
    const y = Math.round(parseInt(pin.style.top, 10) + pin.offsetHeight / 2);
    return [x, y].join(`, `);
  };

  const findPinCoordinates = (pin) => {
    const x = Math.round(parseInt(pin.style.left, 10) + pin.offsetWidth);
    const y = Math.round(parseInt(pin.style.top, 10) + pin.offsetHeight + MainPinSize.TAIL);
    return [x, y].join(`, `);
  };

  window.map = {
    findPinCenterCoordinates,
    findPinCoordinates
  };
})();
