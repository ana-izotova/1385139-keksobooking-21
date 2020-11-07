'use strict';

const filters = document.querySelector(`.map__filters`);
const housingTypeFilter = filters.querySelector(`#housing-type`);
const housingPriceFilter = filters.querySelector(`#housing-price`);
const roomsNumberFilter = filters.querySelector(`#housing-rooms`);
const guestsNumberFilter = filters.querySelector(`#housing-guests`);
const featuresFilterContainer = filters.querySelector(`#housing-features`);
const selectFiltersArray = [housingTypeFilter, housingPriceFilter, roomsNumberFilter, guestsNumberFilter];
const ADVERTISEMENTS_AMOUNT = 5;

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
  return filterValue === `any` ? true : (data.offer.rooms === Number(filterValue));
};

const filterByGuestsNumber = (data) => {
  const filterValue = guestsNumberFilter.value;
  return filterValue === `any` ? true : (data.offer.guests === Number(filterValue));
};

const filterByFeatures = (data) => {
  const checkboxes = featuresFilterContainer.querySelectorAll(`:checked`);
  if (checkboxes.length === 0) {
    return true;
  }
  const filteredValues = [...checkboxes].map((checkbox) => checkbox.value);
  const difference = filteredValues.filter((feature) => !data.offer.features.includes(feature));
  return (difference.length === 0);
};

const filterCollbacksArray = [filterByHousingType, filterByHousingPrice, filterByRoomsNumber, filterByGuestsNumber, filterByFeatures];

const getFilteredData = () => {
  const data = window.data;
  const filteredData = filterCollbacksArray.reduce((acc, cb) => {
    return acc.filter(cb);
  }, data);

  const filteredDataSliced = filteredData.slice(0, ADVERTISEMENTS_AMOUNT);

  window.pins.render(filteredDataSliced);
};

const debouncedFilter = window.debounce(getFilteredData);

const addChangeHandler = () => {
  filters.addEventListener(`change`, debouncedFilter);
};

const removeChangeHandler = () => {
  filters.removeEventListener(`change`, debouncedFilter);
};

const reset = () => {
  selectFiltersArray.forEach((filter) => {
    filter.value = `any`;
  });
  const checkboxes = featuresFilterContainer.querySelectorAll(`[type=checkbox]`);
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

window.filters = {
  addChangeHandler,
  removeChangeHandler,
  reset
};
