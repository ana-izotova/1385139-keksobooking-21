'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const MainPinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    TAIL: 22
  };

  const MainPinInitialPosition = {
    X: mainPin.style.left,
    Y: mainPin.style.top
  };

  const setMainPinDefaultPosition = () => {
    mainPin.style.cssText = `left: ${MainPinInitialPosition.X}; top: ${MainPinInitialPosition.Y}`;
  };

  const setMainPinCoordinates = (active = false) => {
    const CurrentPosition = {
      X: mainPin.style.left,
      Y: mainPin.style.top
    };
    const x = Math.round(parseInt(CurrentPosition.X, 10) + MainPinSize.WIDTH / 2);
    let y = Math.round(parseInt(CurrentPosition.Y, 10) + MainPinSize.HEIGHT / 2);
    if (active) {
      y += Math.round(MainPinSize.HEIGHT / 2) + MainPinSize.TAIL;
    }
    return [x, y];
  };

  const moveMainPin = (evt) => {
    evt.preventDefault();
    let StartCoords = {
      X: evt.pageX,
      Y: evt.pageY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const MapLimits = {
        TOP: 130,
        BOTTOM: 630,
        left: -Math.round(mainPin.offsetWidth / 2),
        right: map.offsetWidth - (mainPin.offsetWidth / 2)
      };

      const Shift = {
        X: StartCoords.X - moveEvt.pageX,
        Y: StartCoords.Y - moveEvt.pageY
      };

      StartCoords.X = moveEvt.pageX;
      StartCoords.Y = moveEvt.pageY;

      let newCoordY = mainPin.offsetTop - Shift.Y;
      let newCoordX = mainPin.offsetLeft - Shift.X;

      newCoordX = newCoordX < MapLimits.left ? MapLimits.left : newCoordX;
      newCoordX = newCoordX > MapLimits.right ? MapLimits.right : newCoordX;

      newCoordY = newCoordY < MapLimits.TOP ? MapLimits.TOP : newCoordY;
      newCoordY = newCoordY > MapLimits.BOTTOM ? MapLimits.BOTTOM : newCoordY;

      mainPin.style.top = `${newCoordY}px`;
      mainPin.style.left = `${newCoordX}px`;

      window.form.setAddress(true);
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.mainPin = {
    move: moveMainPin,
    InitialPosition: MainPinInitialPosition,
    setCoordinates: setMainPinCoordinates,
    setDefaultPosition: setMainPinDefaultPosition
  };
})();
