import { renderGallery } from './gallery.js';
import { debounce } from './utils.js';
const MAX_FILTER_RANDOM = 10;

const filtersElement = document.querySelector('.img-filters');
const filterForm = filtersElement.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');


const FiltersEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};


const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));


const filterHandlers = {
  [FiltersEnum.DEFAULT]:  (data) => data,
  [FiltersEnum.RANDOM]:  (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_FILTER_RANDOM, data.length);
    while(randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if(!randomIndexList.includes(index)){
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);

  },
  [FiltersEnum.DISCUSSED]:  (data) =>[...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};


const repaint = (evt, filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderGallery(filteredData);
  const currentActiveElement = filterForm.querySelector('.img-filters__button--active');
  currentActiveElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};


const debouncedRepaint = debounce(repaint);


const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (evt) => debouncedRepaint(evt, FiltersEnum.DEFAULT, data));
  randomButton.addEventListener('click', (evt) => debouncedRepaint(evt, FiltersEnum.RANDOM, data));
  discussedButton.addEventListener('click', (evt) => debouncedRepaint(evt, FiltersEnum.DISCUSSED, data));
};


export { initFilter };


