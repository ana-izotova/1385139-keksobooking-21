'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const PinSize = {
    WIDTH: 50,
    HEIGHT: 70
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

  window.pin = {
    makePins
  };
})();
