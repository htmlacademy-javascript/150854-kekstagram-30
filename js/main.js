import { renderGallery } from './gallery.js';
import {initUploadPhoto} from './form.js';
import {loadPictures} from './api.js';
import { showMessageError } from './utils.js';
import { initFilter } from './filters.js';

const bootstrap = async () => {
  try{
    const pictures = await loadPictures();

    renderGallery(pictures);
    initUploadPhoto();
    initFilter(pictures);
  } catch(error) {
    showMessageError();
  }
};


bootstrap();
