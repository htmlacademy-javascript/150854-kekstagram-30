const REMOVE_MESSAGE_TIMEOUT = 5000;
const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');


const showMessageError = () => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};


export {showMessageError};

