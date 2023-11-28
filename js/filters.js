import { renderThumbnails } from './thumbnail.js';
import { debounce } from './utils.js';

const MAX_FILTER_RANDOM = 10;

const filtersElement = document.querySelector('.img-filters');
const filterFormElement = filtersElement.querySelector('.img-filters__form');
const picturesContainerElement = document.querySelector('.pictures');
const filterButtonElements = filterFormElement.querySelectorAll('button');

const FiltersEnum = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};


const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));


const filterHandlers = {
  [FiltersEnum.DEFAULT]:  (data) => data,
  [FiltersEnum.RANDOM]:  (data) => {
    const randomItems = [];
    const max = Math.min(MAX_FILTER_RANDOM, data.length);
    while(randomItems.length < max) {
      const index = getRandomIndex(0, data.length);
      if(!randomItems.includes(index)){
        randomItems.push(index);
      }
    }
    return randomItems.map((index) => data[index]);

  },
  [FiltersEnum.DISCUSSED]:  (data) =>[...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};


const repaint = (filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderThumbnails(filteredData, picturesContainerElement);
};


const debouncedRepaint = debounce(repaint);


const initFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');

  filterButtonElements.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const currentActiveElement = filterFormElement.querySelector('.img-filters__button--active');
      currentActiveElement.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      debouncedRepaint(evt.target.id, data);
    });
  });

};


export { initFilter };


