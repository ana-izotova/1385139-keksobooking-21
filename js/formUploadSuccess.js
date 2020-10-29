'use strict';

(() => {
  const successMessageTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);

  const newSuccessMessage = successMessageTemplate.cloneNode(true);

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const closePopup = () => {
    document.body.querySelector(`.success`).remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
    document.removeEventListener(`click`, closePopup);
  };

  const successUploadHandler = () => {
    document.body.insertAdjacentElement(`afterbegin`, newSuccessMessage);
    document.addEventListener(`keydown`, onPopupEscPress);
    document.addEventListener(`click`, closePopup);
    window.pageState.deactivatePage();
    window.form.formReset();
  };

  window.formUploadSuccess = {
    successUploadHandler
  };
})();

