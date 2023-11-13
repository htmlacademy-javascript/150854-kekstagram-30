import {getImages} from './data.js';
import { renderGallery } from './gallery.js';


const pictures = getImages();

renderGallery(pictures);
