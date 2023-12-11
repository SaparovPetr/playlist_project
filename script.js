const songsContainer = document.querySelector('.songs-container');
const addButton = document.querySelector('.input__btn_action_add');
const form = document.forms.add; // добавлена форма по ее атрибуту name="add"
const artist = form.elements.artist; // добавлен элемент формы по его имени
const title = form.elements.title; // добавлен элемент формы по его имени

// функция , добавляющая песню
function addSong(artistValue, titleValue) {
  const songTemplate = document.querySelector('#song-template').content;
  const songElement = songTemplate.cloneNode(true);
  songElement.querySelector('.song__artist').textContent = artistValue;
  songElement.querySelector('.song__title').textContent = titleValue;
  songsContainer.append(songElement);
}

// функция, отключающая за активацию стилизацию кнопки Добавить
function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    addButton.removeAttribute('disabled');
    addButton.classList.remove('input__btn_disabled');
  } else {
    addButton.setAttribute('disabled', true);
    addButton.classList.add('input__btn_disabled');
  }
}

// слушатель отправки формы, который:
// - сбрасывает поведение браузера по умолчанию,
// - добавляет песню, запуская функцию addSong,
// - очищает форму,
// - поерестилизовывает кнопку отправки после события
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addSong(artist.value, title.value);
	form.reset();
  setSubmitButtonState(false);
});

// слушатель поля ввода, который:
// - прверяет наличие  в ней символов,
// - при заполнении, делает кнопку Добавить активной
form.addEventListener('input', function (evt) {
  const isValid = artist.value.length > 0 && title.value.length > 0;
  setSubmitButtonState(isValid);
});

// слушатель, делегированный родителю, переключающий лайк
songsContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('song__like')) {
    evt.target.classList.toggle('song__like_active');
  }
});