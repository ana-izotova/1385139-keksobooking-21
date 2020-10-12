'use strict';

(() => {
  const cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);

  const apartmentsTypesDictionary = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };
  const map = document.querySelector(`.map`);
  const filtersContainer = map.querySelector(`.map__filters-container`);

  const createCard = (info) => {
    if (map.querySelector(`.map__card`)) {
      map.removeChild(map.querySelector(`.map__card`));
    }
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector(`.popup__title`).textContent = info.offer.title;
    newCard.querySelector(`.popup__text--address`).textContent = info.offer.address;
    newCard.querySelector(`.popup__text--price`).textContent = `${info.offer.price}₽/ночь`;
    newCard.querySelector(`.popup__type`).textContent = apartmentsTypesDictionary[info.offer.type];

    let rooms = (info.offer.rooms === 1) ? `комната` : `комнаты`;
    let guests = (info.offer.guests === 1) ? `гостя` : `гостей`;
    newCard.querySelector(`.popup__text--capacity`).textContent = `${info.offer.rooms} ${rooms} для ${info.offer.guests} ${guests}`;
    newCard.querySelector(`.popup__text--time`)
      .textContent = `Заезд после ${info.offer.checkin}, выезд до ${info.offer.checkout}`;
    newCard.querySelector(`.popup__description`).textContent = info.offer.description;

    const features = Array.from(newCard.querySelectorAll(`.popup__feature`));
    const featuresContainer = newCard.querySelector(`.popup__features`);
    const unavailableFeatures = features.filter((item) => !info.offer.features.some((str) => item.className.includes(`--${str}`)));
    unavailableFeatures.forEach((feature) => featuresContainer.removeChild(feature));

    const photosContainer = newCard.querySelector(`.popup__photos`);
    const photo = photosContainer.querySelector(`.popup__photo`);
    photosContainer.innerHTML = ``;
    for (let i = 0; i < info.offer.photos.length; i += 1) {
      const newPhoto = photo.cloneNode(true);
      newPhoto.src = info.offer.photos[i];
      photosContainer.appendChild(newPhoto);
    }
    map.insertBefore(newCard, filtersContainer);
  };

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const closePopup = () => {
    const cardPopup = map.querySelector(`.map__card`);
    cardPopup.remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const openPopup = (data) => {
    if (map.querySelector(`.map__card`)) {
      map.querySelector(`.map__card`).remove();
    }
    createCard(data);
    const cardPopup = map.querySelector(`.map__card`);
    const closePopupButton = cardPopup.querySelector(`.popup__close`);
    document.addEventListener(`keydown`, onPopupEscPress);
    closePopupButton.addEventListener(`click`, closePopup);
  };

  window.card = {
    createCard,
    openPopup
  };
})();


