'use strict';

(() => {
  const filters = document.querySelector(`.map__filters`);
  const housingTypeFilter = filters.querySelector(`#housing-type`);
  const housingPriceFilter = filters.querySelector(`#housing-price`);
  const roomsNumberFilter = filters.querySelector(`#housing-rooms`);
  const guestsNumberFilter = filters.querySelector(`#housing-guests`);
  const featuresFilterContainer = filters.querySelector(`#housing-features`);
  const ADVERTISEMENTS_AMOUNT = 5;
  const map = document.querySelector(`.map`);
  const pinsContainer = map.querySelector(`.map__pins`);

  const filterByHousingType = (data) => {
    const filterValue = housingTypeFilter.value;
    return filterValue === `any` ? true : data.offer.type === filterValue;
  };

  const filterByHousingPrice = (data) => {
    const filterValue = housingPriceFilter.value;

    switch (filterValue) {
      case `middle`:
        return (data.offer.price >= 10000 && data.offer.price <= 50000);
      case `low`:
        return (data.offer.price < 10000);
      case `high`:
        return (data.offer.price > 50000);
      default:
        return true;
    }
  };

  const filterByRoomsNumber = (data) => {
    const filterValue = roomsNumberFilter.value;
    return filterValue === `any` ? true : (data.offer.rooms === parseInt(filterValue, 10));
  };

  const filterByGuestsNumber = (data) => {
    const filterValue = guestsNumberFilter.value;
    return filterValue === `any` ? true : (data.offer.guests === parseInt(filterValue, 10));
  };

  const filterByFeatures = (data) => {
    const checkboxes = featuresFilterContainer.querySelectorAll(`:checked`);
    if (checkboxes.length === 0) {
      return true;
    }
    const filteredValues = Array.from(checkboxes).map((checkbox) => checkbox.value);
    const difference = filteredValues.filter((feature) => !data.offer.features.includes(feature));
    return (difference.length === 0);
  };

  const filterCollbacksArray = [filterByHousingType, filterByHousingPrice, filterByRoomsNumber, filterByGuestsNumber, filterByFeatures];

  const mainFilter = () => {
    const data = window.data;
    const filteredData = filterCollbacksArray.reduce((acc, cb) => {
      return acc.filter(cb);
    }, data);

    const slicedFilteredData = filteredData.slice(0, ADVERTISEMENTS_AMOUNT);

    pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`)
      .forEach((pin) => pin.remove());

    if (map.querySelector(`.map__card`)) {
      map.querySelector(`.map__card`).remove();
    }

    window.pin.makePins(slicedFilteredData);
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    pins.forEach((pin, index) => {
      pin.hidden = false;
      pin.addEventListener(`click`, () => {
        window.card.openPopup(slicedFilteredData[index]);
      });
    });
  };

  const debouncedFilter = window.debounce(mainFilter);

  const addFilersHandler = () => {
    filters.addEventListener(`change`, debouncedFilter);
  };

  const removeFiltersHandler = () => {
    filters.removeEventListener(`change`, debouncedFilter);
  };

  window.filter = {
    addFilersHandler,
    removeFiltersHandler
  };
})();
