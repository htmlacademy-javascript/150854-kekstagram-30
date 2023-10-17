// Функция проверки длины строки
function checkStringLenght(string, length){
  return string.length <= length;
}


// функция является ли строка палиндромом
function checkStringPalindrome(string){
  const newString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for(let i = newString.length - 1; i >= 0; i--){
    reverseString += newString[i];
  }
  return newString === reverseString;
}
