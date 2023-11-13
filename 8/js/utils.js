// получаем случайное число в диапазоне
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Получение случайного элемента массива
const getRandomArrayElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

// Генервтор уникальных значений
const createIdGenerator = () =>{
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export {getRandomInt, getRandomArrayElement, createIdGenerator};
