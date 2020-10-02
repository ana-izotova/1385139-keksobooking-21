'use strict';

const ADVERTISEMENTS_NUMBER = 8;

const Price = {
  MIN: 1000,
  MAX: 1000000
};

const NumberOfRooms = {
  MIN: 1,
  MAX: 3
};

const NumberOfGuests = {
  MIN: 1,
  MAX: 10
};

const LocationY = {
  MIN: 130,
  MAX: 630
};

const APARTMENTS_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const apartmentsTypesDictionary = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const GALLERY = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const descriptions = [`Стильно!`, `Модно!`, `Молодежно!`, `Прикольно!`];

const map = document.querySelector(`.map`);
const mapWidth = Math.floor(Number((getComputedStyle(map).width).slice(0, -2)));
const mapPins = map.querySelector(`.map__pins`);

const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const mainPin = map.querySelector(`.map__pin--main`);
const pinWidth = Number((getComputedStyle(mainPin).width).slice(0, -2));
const pinHeight = Number((getComputedStyle(mainPin).height).slice(0, -2));
const fragment = document.createDocumentFragment();

const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

const filtersContainer = map.querySelector(`.map__filters-container`);

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const makeRandomLengthContent = (content) => {
  const contentCopy = [...content];
  const shuffledContent = shuffle(contentCopy);
  const randomContentLength = getRandomIntInclusive(1, shuffledContent.length);
  return shuffledContent.slice(0, randomContentLength);
};

// const makeRandomLengthContent = (content) => {
//   const maxLength = content.length;
//   const contentLength = getRandomIntInclusive(1, maxLength);
//   const randomLengthContent = [];
//   for (let i = 0; i < contentLength; i += 1) {
//     const randomIndex = getRandomIntInclusive(0, maxLength - 1);
//     const newItem = content[randomIndex];
//     if (randomLengthContent.indexOf(newItem) === -1) {
//       randomLengthContent.push(newItem);
//     }
//   }
//   return randomLengthContent;
// };

const createAdvertisements = (amount) => {
  const advertisements = [];
  for (let i = 1; i <= amount; i += 1) {
    const locationX = getRandomIntInclusive(pinWidth, mapWidth - pinWidth * 1.5);
    const locationY = getRandomIntInclusive(LocationY.MIN, LocationY.MAX);
    advertisements.push({
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: `Лучшее предложение`,
        address: `${locationX}, ${locationY}`,
        price: getRandomIntInclusive(Price.MIN, Price.MAX),
        type: APARTMENTS_TYPES[getRandomIntInclusive(0, APARTMENTS_TYPES.length - 1)],
        rooms: getRandomIntInclusive(NumberOfRooms.MIN, NumberOfRooms.MAX),
        guests: getRandomIntInclusive(NumberOfGuests.MIN, NumberOfGuests.MAX),
        checkin: CHECKIN_TIMES[getRandomIntInclusive(0, CHECKIN_TIMES.length - 1)],
        checkout: CHECKOUT_TIMES[getRandomIntInclusive(0, CHECKOUT_TIMES.length - 1)],
        features: makeRandomLengthContent(FEATURES),
        description: makeRandomLengthContent(descriptions).join(` `),
        photos: makeRandomLengthContent(GALLERY)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return advertisements;
};

const makePins = (amount) => {
  for (let i = 0; i < amount; i += 1) {
    const newPin = pinTemplate.cloneNode(true);
    const pinImg = newPin.querySelector(`img`);
    newPin.style.top = `${advertisements[i].location.y - pinHeight}px`;
    newPin.style.left = `${advertisements[i].location.x + (pinWidth / 2)}px`;
    pinImg.src = advertisements[i].author.avatar;
    pinImg.alt = advertisements[i].offer.title;
    fragment.appendChild(newPin);
  }
  mapPins.appendChild(fragment);
};

const createCard = (info) => {
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

const advertisements = createAdvertisements(ADVERTISEMENTS_NUMBER);
map.classList.remove(`map--faded`);
makePins(ADVERTISEMENTS_NUMBER);
createCard(advertisements[0]);
