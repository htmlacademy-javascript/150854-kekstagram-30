import { renderComments, initCommentList } from './comment.js';

//
const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButtonElement = document.querySelector('.big-picture__cancel');

const hidePicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};
const onClosePictureButtonClick = () =>{
  hidePicture();
};

function onDocumentKeydown (evt){
  if(evt.key === 'Escape'){
    evt.preventDefault();
    hidePicture();
  }
}

const renderPicture = ({url,description,likes, comments}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.social__comment-shown-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__comment-total-count').textContent = comments.length;
};

const showPicture = (pictureData) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  renderComments(pictureData.comments);
  initCommentList();
  renderPicture(pictureData);
};

closePictureButtonElement.addEventListener('click', onClosePictureButtonClick);

export {showPicture};
//
