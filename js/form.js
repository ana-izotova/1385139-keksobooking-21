'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const titleInput = adForm.querySelector(`#title`);
  const priceInput = adForm.querySelector(`#price`);
  const typeInput = adForm.querySelector(`#type`);
  const timein = adForm.querySelector(`#timein`);
  const timeout = adForm.querySelector(`#timeout`);
  const roomNumber = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const capacityOptions = capacity.querySelectorAll(`option`);

  const TitleLength = {
    MIN: 30,
    MAX: 100
  };

  const PriceLimit = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
    MAX_PRICE: 1000000
  };

  const roomForGuestsMap = {
    1: [`1`],
    2: [`1`, `2`],
    3: [`1`, `2`, `3`],
    100: [`0`]
  };

  const addressField = document.querySelector(`#address`);

  const setAddress = (pin, center = false) => {
    addressField.value = window.map.findPinCoordinates(pin);
    if (center) {
      addressField.value = window.map.findPinCenterCoordinates(pin);
    }
  };

  addressField.setAttribute(`readonly`, true);

  const validateTitle = () => {
    const valueLength = titleInput.value.length;
    if (valueLength < TitleLength.MIN) {
      titleInput.setCustomValidity((`Ещё ` + (TitleLength.MIN - valueLength) + ` символов`));
    } else if (valueLength > TitleLength.MAX) {
      titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - TitleLength.MAX) + ` символов`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  };

  const setMinimumPrice = () => {
    const minPrice = PriceLimit[typeInput.value];
    priceInput.setAttribute(`min`, minPrice);
    priceInput.placeholder = minPrice;
  };

  setMinimumPrice();

  const validatePrice = () => {
    const minPrice = Number(priceInput.getAttribute(`min`));
    const value = Number(priceInput.value);

    if (value < minPrice) {
      priceInput.setCustomValidity((`Минимальная стоимость - ${minPrice}`));
    } else if (value > PriceLimit.MAX_PRICE) {
      priceInput.setCustomValidity(`Стоимость не может быть выше ${PriceLimit.MAX_PRICE}`);
    } else {
      priceInput.setCustomValidity(``);
    }
    priceInput.reportValidity();
  };

  const setRoomCapasity = (value) => {
    capacityOptions.forEach((option) => {
      option.disabled = !roomForGuestsMap[value].includes(option.value);
    });
    capacity.value = value > 3 ? 0 : value;
  };

  setRoomCapasity(roomNumber.value);

  titleInput.addEventListener(`input`, () => {
    validateTitle();
  });

  typeInput.addEventListener(`change`, () => {
    setMinimumPrice();
    validatePrice();
  });

  priceInput.addEventListener(`input`, () => {
    validatePrice();
  });

  timein.addEventListener(`change`, () => {
    timeout.value = timein.value;
  });

  timeout.addEventListener(`change`, () => {
    timein.value = timeout.value;
  });

  roomNumber.addEventListener(`change`, () => {
    setRoomCapasity(roomNumber.value);
  });

  window.form = {
    setAddress
  };
})();
