let switchMode = document.getElementById('switchMode');

switchMode.onclick = function () {
  let theme = document.getElementById('theme');

  if (theme.getAttribute('href') == 'light-mode.css') {
    theme.href = 'dark-mode.css';
    document.body.classList.add('dark-theme'); // Добавляем класс для темной темы
  } else {
    theme.href = 'light-mode.css';
    document.body.classList.remove('dark-theme'); // Удаляем класс для темной темы
  }
};
