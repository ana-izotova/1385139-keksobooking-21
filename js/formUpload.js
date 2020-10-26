'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const successMessageTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);

  const errorMessageTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);

  const successUploadHandler = () => {
    const newSuccessMessage = successMessageTemplate.cloneNode(true);
    document.body.insertAdjacentElement(`afterbegin`, newSuccessMessage);
    document.addEventListener(`keydown`, (evt) => {
      window.utils.onPopupEscPress(evt, `.success`);
      adForm.reset();
    });
    document.addEventListener(`click`, () => {
      window.utils.closePopup(`.success`);
      adForm.reset();
    });
  };

  const errorUploadHandler = () => {
    const newErrorMessage = errorMessageTemplate.cloneNode(true);
    const errorButton = newErrorMessage.querySelector(`.error__button`);
    document.body.insertAdjacentElement(`afterbegin`, newErrorMessage);
    errorButton.addEventListener(`click`, window.utils.closePopup(`.error`));
    document.addEventListener(`keydown`, (evt) => {
      window.utils.onPopupEscPress(evt, `.error`);
    });
    document.addEventListener(`click`, () => {
      window.utils.closePopup(`.error`);
    });
  };

  const formSubmitHandler = () => {
    const data = new FormData(adForm);
    window.server.send(data, successUploadHandler, errorUploadHandler);
  };

  window.formUpload = {
    formSubmitHandler
  };
})();

