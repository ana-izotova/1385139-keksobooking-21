'use strict';

(() => {
  const filters = document.querySelector(`.map__filters`);
  const housingTypeFilter = filters.querySelector(`#housing-type`);
  // const housingPriceFilter = filters.querySelector(`#housing-price`);
  // const roomsNumberFilter = filters.querySelector(`#housing-rooms`);
  // const guestsNumberFilter = filters.querySelector(`#housing-guests`);
  // const featuresFilter = filters.querySelector(`#housing-features`);
  const ADVERTISEMENTS_AMOUNT = 5;
  const map = document.querySelector(`.map`);
  const pinsContainer = map.querySelector(`.map__pins`);

  const filterByHousingType = () => {
    const filterValue = housingTypeFilter.value;
    const data = window.data;
    let filteredData;
    if (filterValue === `any`) {
      filteredData = data;
    } else {
      filteredData = data.filter((item) => item.offer.type === filterValue);
    }

    const filteredDataLength = filteredData.length;

    filteredData = filteredDataLength > ADVERTISEMENTS_AMOUNT
      ? filteredData.slice(0, ADVERTISEMENTS_AMOUNT)
      : filteredData;
    const pinsAmount = filteredDataLength > ADVERTISEMENTS_AMOUNT
      ? ADVERTISEMENTS_AMOUNT
      : filteredDataLength;

    pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`)
      .forEach((pin) => pin.remove());

    if (map.querySelector(`.map__card`)) {
      map.querySelector(`.map__card`).remove();
    }

    window.pin.makePins(pinsAmount, filteredData);
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pins.forEach((pin, index) => {
      pin.hidden = false;
      pin.addEventListener(`click`, () => {
        window.card.openPopup(filteredData[index]);
      });
    });
  };

  // const filterByHousingPrice = () => {
  //
  // };
  //
  // const filterByRoomsNumber = () => {
  //
  // };
  //
  // const filterByGuestsNumber = () => {
  //
  // };
  //
  // const filterByFeatures = () => {
  //
  // };

  const addFilersHandlers = () => {
    housingTypeFilter.addEventListener(`change`, filterByHousingType);
  };

  window.filter = {
    addFilersHandlers
  };
})();
