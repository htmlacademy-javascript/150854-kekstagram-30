import {getImages} from './data.js';
import {renderThumbnails} from './thumbnail.js';

const pictures = getImages();

renderThumbnails(pictures);
