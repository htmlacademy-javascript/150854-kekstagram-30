import {getImages} from './data.js';
import { renderGallery } from './gallery.js';
import {initUploadPhoto} from './form.js';

const pictures = getImages();

renderGallery(pictures);
initUploadPhoto();

