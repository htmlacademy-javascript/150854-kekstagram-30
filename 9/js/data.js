import {getRandomInt, getRandomArrayElement, createIdGenerator} from './utils.js';


const IMAGES_LIMIT = 25;
const AVATAR_LIMIT = 6;
const LIKES = {min: 15, max: 200};
const COMMENT_LIMIT = 20;
const COMMENT_TEXTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DISCRIPTIONS_IMAGE = ['Передо мной фотография на тему «Летний отдых»', 'На этом снимке я  вижу  детей, которые отдыхают в летнем лагере.', 'Все ребята  находятся на берегу моря.', 'Дети одеты  в лёгкую  спортивную форму.', 'Дети увлечены игрой на пляже , поэтому их лица радостные и счастливые.', 'Красивый зимний сад', 'Берег реки Вятка', 'Охота на муравьёв', 'Бесконечность', 'Свидетели Иегова'];
const NAMES = ['Артём','Андрей', 'Алексей', 'Анна', 'Алина', 'Анастасия', 'Борис', 'Глеб'];


const generateCommentId = createIdGenerator();


const createMessage = () => Array.from(
  {length: getRandomInt(1, 2)},
  () => getRandomArrayElement(COMMENT_TEXTS),
).join(' ');


const createComment = function () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInt(1, AVATAR_LIMIT)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  };
};


const generateImageId = createIdGenerator();


const createImage = (index) => ({
  id: generateImageId(),
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DISCRIPTIONS_IMAGE),
  likes: getRandomInt(LIKES.min, LIKES.max),
  comments: Array.from({length: getRandomInt(0, COMMENT_LIMIT)}, createComment,
  ),
});


const getImages = () => Array.from(
  {length: IMAGES_LIMIT},
  (_, imageIndex) => createImage(imageIndex + 1)
);


export {getImages};
