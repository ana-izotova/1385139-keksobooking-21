'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const filtersContainer = map.querySelector(`.map__filters-container`);
  const setActiveModificator = window.pins.setActiveModificator;
  const removeActiveModificator = window.pins.removeActiveModificator;

  const cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);

  const apartmentsTypeMap = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  const removePopup = () => {
    const cardPopup = map.querySelector(`.map__card`);
    if (cardPopup) {
      map.removeChild(cardPopup);
    }
  };

  const createPhotosList = (card, photosArray) => {
    const photosContainer = card.querySelector(`.popup__photos`);
    if (photosArray.length > 0) {
      const photo = photosContainer.querySelector(`.popup__photo`);
      const fragment = document.createDocumentFragment();
      photosArray.forEach((item) => {
        const newPhoto = photo.cloneNode(true);
        newPhoto.src = item;
        fragment.appendChild(newPhoto);
      });
      photo.replaceWith(fragment);
    } else {
      photosContainer.remove();
    }
  };

  const createFeaturesList = (card, features) => {
    const featuresContainer = card.querySelector(`.popup__features`);
    if (features.length > 0) {
      const featuresElements = featuresContainer.querySelectorAll(`.popup__feature`);
      const unavailableFeatures = [...featuresElements].filter((item) => !features.some((str) => item.className.includes(`--${str}`)));
      unavailableFeatures.forEach((feature) => featuresContainer.removeChild(feature));
    } else {
      featuresContainer.remove();
    }
  };

  const create = (data) => {
    const {author: {avatar},
      offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos},
    } = data;
    removePopup();
    const newCard = cardTemplate.cloneNode(true);

    const avatarElement = newCard.querySelector(`.popup__avatar`);
    avatarElement.src = avatar ? avatar : avatarElement.remove();

    const titleElement = newCard.querySelector(`.popup__title`);
    titleElement.textContent = title ? title : titleElement.remove();

    const addressElement = newCard.querySelector(`.popup__text--address`);
    addressElement.textContent = address ? address : addressElement.remove();

    const priceElement = newCard.querySelector(`.popup__text--price`);
    priceElement.textContent = price ? `${price}₽/ночь` : priceElement.remove();

    const typeElement = newCard.querySelector(`.popup__type`);
    typeElement.textContent = type ? apartmentsTypeMap[type] : typeElement.remove();

    let roomsQuantity = (rooms === 1) ? `комната` : `комнаты`;
    let guestsQuantity = (guests === 1) ? `гостя` : `гостей`;

    const capacityElement = newCard.querySelector(`.popup__text--capacity`);
    capacityElement.textContent = rooms ?
      `${rooms} ${roomsQuantity} для ${guests} ${guestsQuantity}` :
      capacityElement.remove();

    const timeElement = newCard.querySelector(`.popup__text--time`);
    timeElement.textContent = checkin ? `Заезд после ${checkin}, выезд до ${checkout}` : timeElement.remove();

    const descriptionElement = newCard.querySelector(`.popup__description`);
    descriptionElement.textContent = description ? description : descriptionElement.remove();

    createFeaturesList(newCard, features);
    createPhotosList(newCard, photos);

    map.insertBefore(newCard, filtersContainer);
  };

  const escPressHandler = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopupHandler();
    }
  };

  const closePopupHandler = () => {
    removeActiveModificator();
    removePopup();
    document.removeEventListener(`keydown`, escPressHandler);
    document.removeEventListener(`click`, closePopupHandler);
  };

  const openPopup = (data, pin) => {
    removePopup();
    removeActiveModificator();
    create(data);
    setActiveModificator(pin);
    const cardPopup = map.querySelector(`.map__card`);
    const closePopupButton = cardPopup.querySelector(`.popup__close`);
    document.addEventListener(`keydown`, escPressHandler);
    closePopupButton.addEventListener(`click`, closePopupHandler);
  };

  window.cards = {
    create,
    openPopup,
    removePopup
  };
})();
