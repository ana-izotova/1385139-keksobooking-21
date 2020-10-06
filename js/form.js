'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
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

  const PriceLimits = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
    MAX_PRICE: 1000000
  };

  const addressField = document.querySelector(`#address`);

  const setAddress = (pin) => {
    const coordinates = window.map.findPinCoordinates(pin);
    addressField.value = coordinates;
  };

  titleInput.addEventListener(`invalid`, () => {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity(`Минимальная длина заголовка - 30 символов`);
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity(`Максимальная длина заголовка - 100 символов`);
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity(`Обязательное поле`);
    } else {
      titleInput.setCustomValidity(``);
    }
  });

  titleInput.addEventListener(`input`, () => {
    const valueLength = titleInput.value.length;
    if (valueLength < TitleLength.MIN) {
      titleInput.setCustomValidity((`Ещё ` + (TitleLength.MIN - valueLength) + ` символов`));
    } else if (valueLength > TitleLength.MAX) {
      titleInput.setCustomValidity(`Удалите лишние ` + (valueLength - TitleLength.MAX) + ` символов`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  });

  // box-shadow: 0 0 2px 2px #ff6547;

  const setMinimumPrice = () => {
    const minPrice = PriceLimits[typeInput.value];
    priceInput.setAttribute(`min`, minPrice);
    priceInput.placeholder = minPrice;
  };

  typeInput.onchange = () => {
    setMinimumPrice();
  };

  priceInput.addEventListener(`invalid`, () => {
    const minPrice = priceInput.getAttribute(`min`);
    if (priceInput.value < minPrice) {
      priceInput.setCustomValidity((`Минимальная стоимость - ${minPrice}`));
    } else if (priceInput.value > PriceLimits.MAX_PRICE) {
      titleInput.setCustomValidity(`Стоимость не может быть выше ${PriceLimits.MAX_PRICE}`);
    } else {
      titleInput.setCustomValidity(``);
    }
    titleInput.reportValidity();
  });

  timein.onchange = () => {
    timeout.value = timein.value;
  };

  timeout.onchange = () => {
    timein.value = timeout.value;
  };

  window.form = {
    setAddress
  };
})();
