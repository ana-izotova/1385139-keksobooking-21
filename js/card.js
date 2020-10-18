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

    const avatar = newCard.querySelector(`.popup__avatar`);
    avatar.src = info.author.avatar ? info.author.avatar : avatar.remove();

    const title = newCard.querySelector(`.popup__title`);
    title.textContent = info.offer.title ? info.offer.title : title.remove();

    const address = newCard.querySelector(`.popup__text--address`);
    address.textContent = info.offer.address ? info.offer.address : address.remove();

    const price = newCard.querySelector(`.popup__text--price`);
    price.textContent = info.offer.price ? `${info.offer.price}₽/ночь` : price.remove();

    const type = newCard.querySelector(`.popup__type`);
    type.textContent = info.offer.type ? apartmentsTypesDictionary[info.offer.type] : type.remove();

    let rooms = (info.offer.rooms === 1) ? `комната` : `комнаты`;
    let guests = (info.offer.guests === 1) ? `гостя` : `гостей`;

    const capacity = newCard.querySelector(`.popup__text--capacity`);
    capacity.textContent = info.offer.rooms ? `${info.offer.rooms} ${rooms} для ${info.offer.guests} ${guests}` : capacity.remove();

    const time = newCard.querySelector(`.popup__text--time`);
    time.textContent = info.offer.checkin ? `Заезд после ${info.offer.checkin}, выезд до ${info.offer.checkout}` : time.remove();

    const description = newCard.querySelector(`.popup__description`);
    description.textContent = info.offer.description ? info.offer.description : description.remove();

    const featuresContainer = newCard.querySelector(`.popup__features`);
    if (info.offer.features.length > 0) {
      const features = Array.from(newCard.querySelectorAll(`.popup__feature`));
      const unavailableFeatures = features.filter((item) => !info.offer.features.some((str) => item.className.includes(`--${str}`)));
      unavailableFeatures.forEach((feature) => featuresContainer.removeChild(feature));
    } else {
      featuresContainer.remove();
    }

    const photosContainer = newCard.querySelector(`.popup__photos`);
    if (info.offer.photos.length > 0) {
      const photo = photosContainer.querySelector(`.popup__photo`);
      photosContainer.innerHTML = ``;
      info.offer.photos.forEach((item) => {
        const newPhoto = photo.cloneNode(true);
        newPhoto.src = item;
        photosContainer.appendChild(newPhoto);
      });
    } else {
      photosContainer.remove();
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
