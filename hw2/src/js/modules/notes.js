// Модуль заметок (дневник). Создание и управление записями

import { state, moodTypes, addNote, deleteNote } from './state.js';
import { formatDate, formatTime, createEmptyState } from './dom.js';

export function updateNotes() {
  const container = document.getElementById('notes-list');

  if (!container) {
    console.error('Контейнер заметок не найден');
    return;
  }

  if (state.notes.length === 0) {
    container.innerHTML = createEmptyState(
      'Ваш дневник пока пуст. Начните записывать свои мысли уже сейчас!',
      '📖'
    );
    return;
  }

  container.innerHTML = state.notes.map(note => {
    const moodInfo = moodTypes[note.moodType];
    return `
      <div class="mood-entry">
        <span class="mood-entry__emoji">${moodInfo.emoji}</span>
        <div class="mood-entry__content">
          <div class="mood-entry__header">
            <strong class="mood-entry__title">${note.title || moodInfo.label}</strong>
            <time class="mood-entry__date" datetime="${note.date}">${formatDate(note.date)}</time>
          </div>
          <p class="mood-entry__note">${note.content}</p>
        </div>
        <button class="mood-entry__delete delete-btn" data-id="${note.id}" aria-label="Удалить">&times;</button>
      </div>
    `;
  }).join('');

  // Обработчики удаления
  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      if (confirm('Удалить заметку?')) {
        deleteNote(id);
        updateNotes();
      }
    });
  });
}

export function initNotes() {
  const form = document.getElementById('note-form');
  const titleInput = document.getElementById('note-title');
  const contentInput = document.getElementById('note-content');
  const moodInput = document.getElementById('note-mood'); // hidden input
  const moodButtons = document.querySelectorAll('.diary-mood-btn');

  if (!form || !titleInput || !contentInput || !moodInput || !moodButtons.length) {
    console.error('Не найдены элементы формы заметок');
    return;
  }

  // Обработка кликов на смайлики
  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      const mood = button.dataset.mood;
      
      // Убрать выделение со всех кнопок
      moodButtons.forEach(btn => btn.classList.remove('selected'));
      
      // Выделить выбранную кнопку
      button.classList.add('selected');
      
      // Сохранить значение в hidden input
      moodInput.value = mood;
      
      console.log(`Выбрано настроение для заметки: ${mood}`);
    });
  });

  // Обработка отправки формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const moodType = moodInput.value;

    if (!content) {
      alert('Введите текст заметки!');
      return;
    }

    addNote(title, content, moodType);
    updateNotes();

    // Очистить форму
    titleInput.value = '';
    contentInput.value = '';
    moodInput.value = 'excellent';
    
    // Сбросить выделение смайликов
    moodButtons.forEach(btn => btn.classList.remove('selected'));
    moodButtons[0].classList.add('selected');

    console.log('Заметка добавлена');
  });

  updateNotes();
}
