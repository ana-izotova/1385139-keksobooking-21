'use strict';

const successMessageTemplate = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

const newSuccessMessage = successMessageTemplate.cloneNode(true);

const popupEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopupHandler();
  }
};

const closePopupHandler = () => {
  document.body.querySelector(`.success`).remove();
  document.removeEventListener(`keydown`, popupEscPressHandler);
  document.removeEventListener(`click`, closePopupHandler);
};

const submitHandler = () => {
  document.body.insertAdjacentElement(`afterbegin`, newSuccessMessage);
  document.addEventListener(`keydown`, popupEscPressHandler);
  document.addEventListener(`click`, closePopupHandler);
  window.pageState.deactivate();
};

window.formUploadSuccess = {
  submitHandler
};
