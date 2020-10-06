'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const mapPins = map.querySelector(`.map__pins`);
  const pinWidth = Number((getComputedStyle(mainPin).width).slice(0, -2));
  const pinHeight = Number((getComputedStyle(mainPin).height).slice(0, -2));
  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
  const fragment = document.createDocumentFragment();

  const makePins = (amount, cardsData) => {
    for (let i = 0; i < amount; i += 1) {
      const newPin = pinTemplate.cloneNode(true);
      const pinImg = newPin.querySelector(`img`);
      newPin.style.top = `${cardsData[i].location.y - pinHeight}px`;
      newPin.style.left = `${cardsData[i].location.x + (pinWidth / 2)}px`;
      pinImg.src = cardsData[i].author.avatar;
      pinImg.alt = cardsData[i].offer.title;
      fragment.appendChild(newPin);
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    makePins
  };
})();
