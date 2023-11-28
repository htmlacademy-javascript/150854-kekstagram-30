import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effect.js';
import { sendPicture } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';


const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег'
};
const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};
const FILE_TYPES = ['png', 'jpeg', 'jpg'];

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const fileFieldElement = formElement.querySelector('.img-upload__input');
const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const commentFieldElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const photoPreviewElement = formElement.querySelector('.img-upload__preview img');
const effectsPreviewElements = formElement.querySelectorAll('.effects__preview');


const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? SubmitButtonCaption.SUBMITTING : SubmitButtonCaption.IDLE;
};


const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',

});


const showModal = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};


const hideModal = () => {
  formElement.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};


const isTextFieldFocused = () => document.activeElement === hashtagFieldElement || document.activeElement === commentFieldElement;


const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};


const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));


const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));


const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;


const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};


const isErrorMessageExists = () => Boolean(document.querySelector('.error'));


function onDocumentKeydown (evt) {
  if(evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageExists()){
    evt.preventDefault();
    hideModal();
  }
}


const onCancelButtonClick = () => {
  hideModal();
};


const onFileInputChange = () =>{
  const file = fileFieldElement.files[0];
  if(file && isValidType(file)){
    photoPreviewElement.src = URL.createObjectURL(file);
    effectsPreviewElements.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreviewElement.src}')`;
    });
  }
  showModal();
};


const sendForm = async(formEl) =>{
  if(!pristine.validate()){
    return;
  }
  try{
    toggleSubmitButton(true);
    await sendPicture(new FormData(formEl));
    toggleSubmitButton(false);
    hideModal();
    showSuccessMessage();

  } catch{
    showErrorMessage();
    toggleSubmitButton(false);
  }
};


const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};


pristine.addValidator(
  hashtagFieldElement,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashtagFieldElement,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);


const initUploadPhoto = () => {
  fileFieldElement.addEventListener('change', onFileInputChange);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormSubmit);
  initEffect();
};


export {initUploadPhoto};

