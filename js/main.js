const textMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = ['Артём','Андрей', 'Алексей', 'Анна', 'Алина', 'Анастасия', 'Борис', 'Глеб'];
const description = ['Передо мной фотография на тему «Летний отдых»', 'На этом снимке я  вижу  детей, которые отдыхают в летнем лагере.', 'Все ребята  находятся на берегу моря.', 'Дети одеты  в лёгкую  спортивную форму.', 'Дети увлечены игрой на пляже , поэтому их лица радостные и счастливые.', 'Красивый зимний сад', 'Берег реки Вятка', 'Охота на муравьёв', 'Бесконечность', 'Свидетели Иегова'];


const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];
const generateImageId = getUniqueValueInRange(1, 25);
const generateUrlInt = getUniqueValueInRange(1, 25);
const generateLikesInt = getUniqueValueInRange(15, 200);
const generateCommentId = getUniqueValueInRange(1, 1000000);
const createComment = function () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomArrayElement(textMessages),
    name: getRandomArrayElement(names),
  };
};
const generateComments = Array.from({length: getRandomInt(0, 30)}, createComment);
const createImageDescription = function () {
  return {
    id: generateImageId(),
    url: `photos/${generateUrlInt()}.jpg`,
    description: getRandomArrayElement(description),
    likes: generateLikesInt(),
    comments: generateComments

  };
};
const generateImageDescription = Array.from({length: 25}, createImageDescription);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getUniqueValueInRange (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInt(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//console.log(generateImageDescription);
