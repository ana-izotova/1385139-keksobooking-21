'use strict';

(() => {
  const onPopupEscPress = (evt, selector) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup(selector);
    }
  };

  const closePopup = (selector) => {
    document.body.querySelector(selector).remove();
    document.removeEventListener(`keydown`, onPopupEscPress);
    document.removeEventListener(`click`, closePopup);
  };

  window.utils = {
    closePopup,
    onPopupEscPress
  };
})();
