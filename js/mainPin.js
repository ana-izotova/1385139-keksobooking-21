'use strict';

const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);

const MainPinSize = {
  WIDTH: 65,
  HEIGHT: 65,
  TAIL: 22
};

const MapLimits = {
  TOP: 130,
  BOTTOM: 630,
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

  const {TOP, BOTTOM} = MapLimits;
  const leftLimit = -Math.round(mainPin.offsetWidth / 2);
  const rightLimit = map.offsetWidth - (mainPin.offsetWidth / 2);

  let StartCoords = {
    X: evt.pageX,
    Y: evt.pageY
  };

  const mouseMoveHandler = (moveEvt) => {
    moveEvt.preventDefault();

    const Shift = {
      X: StartCoords.X - moveEvt.pageX,
      Y: StartCoords.Y - moveEvt.pageY
    };

    StartCoords.X = moveEvt.pageX;
    StartCoords.Y = moveEvt.pageY;

    let newCoordY = mainPin.offsetTop - Shift.Y;
    let newCoordX = mainPin.offsetLeft - Shift.X;

    newCoordX = newCoordX < leftLimit ? leftLimit : newCoordX;
    newCoordX = newCoordX > rightLimit ? rightLimit : newCoordX;

    newCoordY = newCoordY < TOP ? TOP : newCoordY;
    newCoordY = newCoordY > BOTTOM ? BOTTOM : newCoordY;

    mainPin.style.top = `${newCoordY}px`;
    mainPin.style.left = `${newCoordX}px`;

    window.form.setAddress(true);
  };

  const mouseUpHandler = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, mouseMoveHandler);
    document.removeEventListener(`mouseup`, mouseUpHandler);
  };

  document.addEventListener(`mousemove`, mouseMoveHandler);
  document.addEventListener(`mouseup`, mouseUpHandler);
};

window.mainPin = {
  move: moveMainPin,
  InitialPosition: MainPinInitialPosition,
  setCoordinates: setMainPinCoordinates,
  setDefaultPosition: setMainPinDefaultPosition
};
