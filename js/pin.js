'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const mapPins = map.querySelector(`.map__pins`);
  const pinsContainer = map.querySelector(`.map__pins`);

  const PinSize = {
    WIDTH: 50,
    HEIGHT: 70,
    NEEDLE: 16
  };

  const mainPinPosition = {
    left: 603,
    top: 408
  };

  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
  const fragment = document.createDocumentFragment();

  const makePins = (cardsData) => {
    cardsData.forEach((item) => {
      const newPin = pinTemplate.cloneNode(true);
      const pinImg = newPin.querySelector(`img`);
      newPin.style.top = `${item.location.y - PinSize.HEIGHT - PinSize.NEEDLE}px`;
      newPin.style.left = `${item.location.x - (PinSize.WIDTH / 2)}px`;
      pinImg.src = item.author.avatar;
      pinImg.alt = item.offer.title;
      newPin.hidden = true;
      fragment.appendChild(newPin);
    });

    mapPins.appendChild(fragment);
  };

  const moveMainPin = (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const MapLimits = {
        TOP: 130,
        BOTTOM: 630,
        left: -(mainPin.offsetWidth / 2),
        right: map.offsetWidth - (mainPin.offsetWidth / 2)
      };

      const shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords.x = moveEvt.pageX;
      startCoords.y = moveEvt.pageY;

      let newCoordY = mainPin.offsetTop - shift.y;
      let newCoordX = mainPin.offsetLeft - shift.x;

      newCoordX = newCoordX < MapLimits.left ? MapLimits.left : newCoordX;
      newCoordX = newCoordX > MapLimits.right ? MapLimits.right : newCoordX;

      newCoordY = newCoordY < MapLimits.TOP ? MapLimits.TOP : newCoordY;
      newCoordY = newCoordY > MapLimits.BOTTOM ? MapLimits.BOTTOM : newCoordY;

      mainPin.style.top = `${newCoordY}px`;
      mainPin.style.left = `${newCoordX}px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      window.form.setAddress(mainPin);

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  const drawPins = (data) => {
    pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`)
      .forEach((pin) => pin.remove());

    if (map.querySelector(`.map__card`)) {
      map.querySelector(`.map__card`).remove();
    }

    makePins(data);
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pins.forEach((pin, index) => {
      pin.hidden = false;
      pin.addEventListener(`click`, () => {
        window.card.openPopup(data[index], pin);
      });
    });
  };

  window.pin = {
    makePins,
    moveMainPin,
    mainPinPosition,
    drawPins
  };
})();

