const container = document.querySelector('.container');

const songsContainer = container.querySelector('.songs-container');

const addButton = container.querySelector('.input__btn_action_add');

const resetButton = container.querySelector('.input__btn_action_reset');

const noSongsElement = container.querySelector('.no-songs');

// Эта функция:
// выключает у кнопки атрибут disabled (делает ее желтой и кликабльной),
// убирает у кнопки класс .input__btn_disabled,
// скрывает надпись "нет песен" добавлением класса .no-songs_hidden
function renderHasSongs() {
  
  resetButton.removeAttribute('disabled');
 
  resetButton.classList.remove('input__btn_disabled');
 
  noSongsElement.classList.add('no-songs_hidden');
}


// Эта функция  ->  :
// включает у кнопки атрибут disabled (делает ее желтой и кликабльной)
// добавляет у кнопке класс .input__btn_disabled
// показывает надпись "нет песен", удаляя класс .no-songs_hidden
function renderNoSongs() {
  
  resetButton.setAttribute('disabled', true);
  
  resetButton.classList.add('input__btn_disabled');
  
  noSongsElement.classList.remove('no-songs_hidden');
}

// Эта функция -> добавляет запись при ее вызове:
// записывает содержимое тега темплейт в переменную,
// создает элемент плейлиста и клонирует его (?) 
// наполняет элемент плейлиста содержимым, введенным в .song__artist
// наполняет элемент плейлиста содержимым, введенным в .song__title
// запускает при клике функцию, подставляющую и убирающиую класс .song__like_active в дополнение к классу .song__like
// отображает сформированный элемент плейлиста последним в блоке с классом .songs-container
function addSong(artistValue, titleValue) {
  const songTemplate = document.querySelector('#song-template').content;
  
  const songElement = songTemplate.querySelector('.song').cloneNode(true);
  
  songElement.querySelector('.song__artist').textContent = artistValue;
 
  songElement.querySelector('.song__title').textContent = titleValue;
  
  songElement.querySelector('.song__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('song__like_active'); 
  });
  
  songsContainer.append(songElement);
}

// Слушатель запускает по клику кнопки "Добавить" функцию, которая:
// записывает в переменную поле ввода .input__text_type_artist
// записывает в переменную поле ввода .input__text_type_title
// запускает функцию addSong, передав ей введенное пользователем содержимое параметров value
// запускает функцию renderHasSongs
// очищает параметр value у поля ввода .input__text_type_artist
// очищает параметр value у поля ввода .input__text_type_title
addButton.addEventListener('click', function () {
  
  const artist = document.querySelector('.input__text_type_artist');
  
  const title = document.querySelector('.input__text_type_title');
  
  addSong(artist.value, title.value);
 
  renderHasSongs();
  
  artist.value = '';
  
  title.value = '';
});

// Слушатель запускает по клику кнопки "Очистить" функцию, которая:
// выбирает все элементы с классом .song
// запускает цикл удаления элемента, который заканчивается последним элементом 
// запускает функцию renderNoSongs
resetButton.addEventListener('click', function () {
 
  const songs = document.querySelectorAll('.song')
  
  for (let i = 0; i < songs.length; i++) {
    songs[i].remove();
  }
  
  renderNoSongs();
});