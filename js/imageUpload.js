'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const adForm = document.querySelector(`.ad-form`);
const avatarChooser = adForm.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
const photoChooser = adForm.querySelector(`.ad-form__upload input[type=file]`);
const photoPreview = adForm.querySelector(`.ad-form__photo`);
const defaultAvatar = avatarPreview.src;

const imageUploadHandler = (fileChooser, preview) => {
  return () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((fileType) => {
      return fileName.endsWith(fileType);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, () => {
        const imageSrc = reader.result;
        if (preview === avatarPreview) {
          avatarPreview.src = imageSrc;
        }
        if (preview === photoPreview) {
          photoPreview.insertAdjacentHTML(`afterbegin`, `<img src='${imageSrc}' width='70' height='70' alt='Фотография жилья'>`);
        }
      });

      reader.readAsDataURL(file);
    }
  };
};

const addFileUploadHandlers = () => {
  avatarChooser.addEventListener(`change`, imageUploadHandler(avatarChooser, avatarPreview));
  photoChooser.addEventListener(`change`, imageUploadHandler(photoChooser, photoPreview));
};

const removeFileUploadHandlers = () => {
  avatarChooser.removeEventListener(`change`, imageUploadHandler(avatarChooser, avatarPreview));
  photoChooser.removeEventListener(`change`, imageUploadHandler(photoChooser, photoPreview));
};

const resetUploadedImage = () => {
  avatarPreview.src = defaultAvatar;

  if (photoPreview.children.length > 0) {
    photoPreview.querySelector(`img`).remove();
  }
};

window.imageUpload = {
  addHandlers: addFileUploadHandlers,
  removeHandlers: removeFileUploadHandlers,
  reset: resetUploadedImage
};
