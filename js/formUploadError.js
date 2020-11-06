'use strict';

(() => {
  const errorMessageTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = newErrorMessage.querySelector(`.error__button`);

  const popupEscPressHandler = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopupHandler();
    }
  };

  const closePopupHandler = () => {
    document.body.querySelector(`.error`).remove();
    document.removeEventListener(`keydown`, popupEscPressHandler);
    document.removeEventListener(`click`, closePopupHandler);
    errorButton.removeEventListener(`click`, closePopupHandler);
  };

  const submitHandler = () => {
    document.body.insertAdjacentElement(`afterbegin`, newErrorMessage);
    errorButton.addEventListener(`click`, closePopupHandler);
    document.addEventListener(`keydown`, popupEscPressHandler);
    document.addEventListener(`click`, closePopupHandler);
  };

  window.formUploadError = {
    submitHandler
  };
})();

