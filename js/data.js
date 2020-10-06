'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapWidth = Math.floor(Number((getComputedStyle(map).width).slice(0, -2)));
  const mainPin = map.querySelector(`.map__pin--main`);
  const pinWidth = Number((getComputedStyle(mainPin).width).slice(0, -2));
  const pinHeight = Number((getComputedStyle(mainPin).height).slice(0, -2));

  const ADVERTISEMENTS_NUMBER = 8;

  const PriceLimits = {
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
  const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const GALLERY = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const descriptions = [`Стильно!`, `Модно!`, `Молодежно!`, `Прикольно!`];

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
          price: getRandomIntInclusive(PriceLimits.MIN, PriceLimits.MAX),
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

  window.data = {
    createData: createAdvertisements
  };
})();

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


// const advertisements = createAdvertisements(ADVERTISEMENTS_NUMBER);
// makePins(ADVERTISEMENTS_NUMBER);
// createCard(advertisements[0]);
