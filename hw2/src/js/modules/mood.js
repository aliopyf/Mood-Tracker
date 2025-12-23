// Модуль добавления настроения. Обработка выбора настроения и добавления заметок

import { state, addMood } from './state.js';
import { updateHistory } from './history.js';
import { updateCalendar } from './calendar.js';
import { showToast } from './toast.js';

export function initMoodSelector() {
  const moodButtons = document.querySelectorAll('.mood-button');
  const noteSection = document.getElementById('mood-note-section');
  const noteInput = document.querySelector('.mood-note');
  const saveButton = document.getElementById('save-mood-btn');

  if (!moodButtons.length || !noteSection || !noteInput || !saveButton) {
    console.error('Не найдены элементы для выбора настроения');
    return;
  }

  let selectedMood = null;

  // Клик на смайлики для выбора настроения
  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedMood = button.dataset.mood;
      
      // Убрать выделение со всех кнопок
      moodButtons.forEach(btn => btn.classList.remove('selected'));
      
      // Выделить выбранную кнопку
      button.classList.add('selected');
      
      // Показать поле для заметки и кнопку сохранения
      noteSection.classList.remove('hidden');
      saveButton.classList.remove('hidden');
      
      console.log(`Выбрано настроение: ${selectedMood}`);
    });
  });

  // Кнопка "Сохранить настроение"
  saveButton.addEventListener('click', () => {
    if (!selectedMood) {
      alert('Выберите настроение!');
      return;
    }

    const note = noteInput.value.trim();

    // Добавить настроение
    addMood(selectedMood, note);

    // Обновить историю и календарь
    updateHistory();
    updateCalendar();

    // Очистить форму
    noteInput.value = '';
    moodButtons.forEach(btn => btn.classList.remove('selected'));
    selectedMood = null;
    
    // Скрыть поле заметки и кнопку
    noteSection.classList.add('hidden');
    saveButton.classList.add('hidden');

    // Уведомление об успехе
    showToast('Успешно!', 'Настроение сохранено');
    
    console.log('Настроение добавлено');
  });
}