import { renderGallery } from './gallery.js';
import { debounce } from './utils.js';
const MAX_FILTER_RANDOM = 10;

const filtersElement = document.querySelector('.img-filters');
const filterForm = filtersElement.querySelector('.img-filters__form');

const filterButtons = filterForm.querySelectorAll('button');

const FiltersEnum = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
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


const repaint = (filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderGallery(filteredData);
};


const debouncedRepaint = debounce(repaint);


const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');

  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const currentActiveElement = filterForm.querySelector('.img-filters__button--active');
      currentActiveElement.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      debouncedRepaint(evt.target.id, data);
    });
  });

};


export { initFilter };


