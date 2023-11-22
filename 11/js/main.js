//import {getImages} from './data.js';
import { renderGallery } from './gallery.js';
import {initUploadPhoto} from './form.js';
import {loadPictures} from './api.js';
import { showMessageError } from './utils.js';

const bootstrap = async () => {
  try{
    const pictures = await loadPictures();

    renderGallery(pictures);
    initUploadPhoto();
  } catch(error) {
    showMessageError();
  }
};


bootstrap();
