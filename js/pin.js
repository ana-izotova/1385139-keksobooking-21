'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const mapPins = map.querySelector(`.map__pins`);
  const PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const MapLimits = {
    TOP: 130,
    BOTTOM: 630,
    left: map.offsetLeft - (mainPin.offsetWidth / 2),
    right: map.offsetWidth - (mainPin.offsetWidth / 2)
  };

  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
  const fragment = document.createDocumentFragment();

  const makePins = (amount, cardsData) => {
    for (let i = 0; i < amount; i += 1) {
      const newPin = pinTemplate.cloneNode(true);
      const pinImg = newPin.querySelector(`img`);
      newPin.style.top = `${cardsData[i].location.y - PinSize.HEIGHT}px`;
      newPin.style.left = `${cardsData[i].location.x - (PinSize.WIDTH / 2)}px`;
      pinImg.src = cardsData[i].author.avatar;
      pinImg.alt = cardsData[i].offer.title;
      newPin.hidden = true;
      fragment.appendChild(newPin);
    }

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

      // const newLocation = {
      //   x: MapLimits.left,
      //   y: MapLimits.right
      // };
      //
      // if (moveEvt.pageX > MapLimits.right) {
      //   newLocation.x = MapLimits.right;
      // } else if (moveEvt.pageX > MapLimits.left) {
      //   newLocation.x = moveEvt.pageX;
      // }
      //
      // if (moveEvt.pageY > MapLimits.BOTTOM) {
      //   newLocation.y = MapLimits.BOTTOM;
      // } else if (moveEvt.pageY > MapLimits.TOP) {
      //   newLocation.y = moveEvt.pageY;
      // }
      //
      // mainPin.style.top = `${newLocation.y}px`;
      // mainPin.style.left = `${newLocation.x}px`;

      // function move(e) {
      //   var newLocation = {
      //     x: limits.left,
      //     y: limits.top
      //   };
      //   if (e.pageX > limits.right) {
      //     newLocation.x = limits.right;
      //   } else if (e.pageX > limits.left) {
      //     newLocation.x = e.pageX;
      //   }
      //   if (e.pageY > limits.bottom) {
      //     newLocation.y = limits.bottom;
      //   } else if (e.pageY > limits.top) {
      //     newLocation.y = e.pageY;
      //   }
      //   relocate(newLocation);
      // }

      const shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

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

  window.pin = {
    makePins,
    moveMainPin
  };
})();
