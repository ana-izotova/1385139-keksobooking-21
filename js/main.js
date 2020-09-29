'use strict';

const ADVERTISEMENTS_NUMBER = 8;
const APARTMENTS_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const MIN_NUMBER_OF_ROOMS = 1;
const MAX_NUMBER_OF_ROOMS = 3;
const MIN_NUMBER_OF_GUESTS = 10;
const MAX_NUMBER_OF_GUESTS = 2;
const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const GALLERY = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;

const map = document.querySelector(`.map`);
const mapWidth = Math.floor(Number((getComputedStyle(map).width).slice(0, -2)));
const mapPins = document.querySelector(`.map__pins`);
const descriptions = [`Стильно!`, `Модно!`, `Молодежно!`, `Прикольно!`];

const pinTemplate = document.querySelector(`#pin`).content;
const mapPinTemplate = pinTemplate.querySelector(`.map__pin`);

const mapPin = map.querySelector(`.map__pin`);
const mapPinWidth = Number((getComputedStyle(mapPin).width).slice(0, -2));
const mapPinHeight = Number((getComputedStyle(mapPin).height).slice(0, -2));
const fragment = document.createDocumentFragment();


const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomInt = (min, max) => {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const makeRandomLengthContent = (content) => {
  const maxLength = content.length;
  const contentLength = getRandomIntInclusive(1, maxLength);
  const randomLengthContent = [];
  for (let i = 0; i < contentLength; i += 1) {
    const randomIndex = getRandomIntInclusive(0, maxLength - 1);
    const newItem = content[randomIndex];
    if (randomLengthContent.indexOf(newItem) === -1) {
      randomLengthContent.push(newItem);
    }
  }
  return randomLengthContent;
};

const makeAdvertisements = () => {
  const advertisements = [];
  for (let i = 1; i <= ADVERTISEMENTS_NUMBER; i += 1) {
    const locationX = getRandomInt(mapPinWidth, mapWidth - mapPinWidth * 1.5);
    const locationY = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
    const advertisement = {
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: `Лучшее предложение`,
        address: `${locationX}, ${locationY}`,
        price: getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
        type: APARTMENTS_TYPES[getRandomInt(0, APARTMENTS_TYPES.length)],
        rooms: getRandomIntInclusive(MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS),
        guests: getRandomIntInclusive(MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS),
        checkin: CHECKIN_TIMES[getRandomInt(0, CHECKIN_TIMES.length)],
        checkout: CHECKOUT_TIMES[getRandomInt(0, CHECKOUT_TIMES.length)],
        features: makeRandomLengthContent(FEATURES),
        description: makeRandomLengthContent(descriptions).join(` `),
        photos: makeRandomLengthContent(GALLERY)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    advertisements.push(advertisement);
  }
  return advertisements;
};

const advertisements = makeAdvertisements();

map.classList.remove(`map--faded`);

const makePins = () => {
  for (let i = 0; i < ADVERTISEMENTS_NUMBER; i += 1) {
    const newPin = mapPinTemplate.cloneNode(true);
    const pinImg = newPin.querySelector(`img`);
    newPin.style.top = `${advertisements[i].location.y - mapPinHeight}px`;
    newPin.style.left = `${advertisements[i].location.x + (mapPinWidth / 2)}px`;
    pinImg.src = advertisements[i].author.avatar;
    pinImg.alt = advertisements[i].offer.title;
    fragment.appendChild(newPin);
  }
  mapPins.appendChild(fragment);
};

makePins();

const cardTemplate = document.querySelector(`#card`).content;
const card = cardTemplate.querySelector(`.map__card`);
const filtersContainer = map.querySelector(`.map__filters-container`);

const apartmentsTypesRu = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const makeCard = (info) => {
  const newCard = card.cloneNode(true);

  const title = newCard.querySelector(`.popup__title`);
  title.textContent = info.offer.title;
  const address = newCard.querySelector(`.popup__text--address`);
  address.textContent = info.offer.address;
  const price = newCard.querySelector(`.popup__text--price`);
  price.textContent = `${info.offer.price}₽/ночь`;
  const type = newCard.querySelector(`.popup__type`);
  type.textContent = apartmentsTypesRu[info.offer.type];
  const capacity = newCard.querySelector(`.popup__text--capacity`);
  let rooms = `комнаты`;
  let guests = `гостей`;
  if (info.offer.rooms === 1) {
    rooms = `комната`;
  }
  if (info.offer.guests === 1) {
    guests = `гостя`;
  }
  capacity.textContent = `${info.offer.rooms} ${rooms} для ${info.offer.guests} ${guests}`;

  const time = newCard.querySelector(`.popup__text--time`);
  time.textContent = `Заезд после ${info.offer.checkin}, выезд до ${info.offer.checkout}`;

  // const features = newCard.querySelector(`.popup__features`);

  const description = newCard.querySelector(`.popup__description`);
  description.textContent = info.offer.description;

  const photos = newCard.querySelector(`.popup__photos`);
  const photo = photos.querySelector(`.popup__photo`);
  photo.src = info.offer.photos[0];
  if (info.offer.photos.length > 1) {
    for (let i = 1; i < info.offer.photos.length; i += 1) {
      const newPhoto = photo.cloneNode(true);
      newPhoto.src = info.offer.photos[i];
      photos.appendChild(newPhoto);
    }
  }
  map.insertBefore(newCard, filtersContainer);
};

makeCard(advertisements[0]);
