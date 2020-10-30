'use strict';

(() => {
  const errorMessageTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = newErrorMessage.querySelector(`.error__button`);

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const closePopup = () => {
    document.body.querySelector(`.error`).remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
    document.removeEventListener(`click`, closePopup);
    errorButton.removeEventListener(`click`, closePopup);
  };

  const errorSubmitHandler = () => {
    document.body.insertAdjacentElement(`afterbegin`, newErrorMessage);
    errorButton.addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, onPopupEscPress);
    document.addEventListener(`click`, closePopup);
  };

  window.formUploadError = {
    errorSubmitHandler
  };
})();

