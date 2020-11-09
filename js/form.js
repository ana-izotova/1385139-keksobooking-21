'use strict';

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
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
  MAX_PRICE: 1000000
};

const RoomForGuestsMap = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const addressField = document.querySelector(`#address`);

const setAddress = (active) => {
  const value = window.mainPin.setCoordinates(active);
  addressField.value = value.join(`, `);
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
  const minPrice = PriceLimit[(typeInput.value).toUpperCase()];
  priceInput.setAttribute(`min`, minPrice);
  priceInput.placeholder = minPrice;
};

setMinimumPrice();

const validatePrice = () => {
  setMinimumPrice();
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
    option.disabled = !RoomForGuestsMap[value].includes(option.value);
  });
  capacity.value = value > 3 ? 0 : value;
};

const setRoomCapacityByRoomNumber = () => setRoomCapasity(roomNumber.value);
setRoomCapacityByRoomNumber();

const timeinHandler = () => {
  timeout.value = timein.value;
};
const timeoutHandler = () => {
  timein.value = timeout.value;
};

const addValidationHandlers = () => {
  titleInput.addEventListener(`input`, validateTitle);
  typeInput.addEventListener(`change`, validatePrice);
  priceInput.addEventListener(`input`, validatePrice);

  timein.addEventListener(`change`, timeinHandler);
  timeout.addEventListener(`change`, timeoutHandler);

  roomNumber.addEventListener(`change`, setRoomCapacityByRoomNumber);
};

const removeValidationHandlers = () => {
  titleInput.removeEventListener(`input`, validateTitle);
  typeInput.removeEventListener(`change`, validatePrice);
  priceInput.removeEventListener(`input`, validatePrice);

  timein.removeEventListener(`change`, timeinHandler);
  timeout.removeEventListener(`change`, timeoutHandler);

  roomNumber.removeEventListener(`change`, setRoomCapacityByRoomNumber);
};

const submitHandler = (evt) => {
  evt.preventDefault();
  const data = new FormData(adForm);
  window.server.configure(window.formUploadSuccess.submitHandler,
      window.formUploadError.submitHandler,
      window.server.HttpRequestMethod.POST,
      data);
  adForm.removeEventListener(`submit`, window.form.submitHandler);
};

const resetForm = () => {
  adForm.reset();
  setAddress();
  setMinimumPrice();
  setRoomCapacityByRoomNumber();
  window.imageUpload.reset();
  adForm.removeEventListener(`submit`, window.form.submitHandler);
};

window.form = {
  setAddress,
  submitHandler,
  addValidationHandlers,
  removeValidationHandlers,
  reset: resetForm
};
