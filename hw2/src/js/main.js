/**
 * Главный файл приложения
 * Инициализирует все модули
 */

import { initTabs } from './modules/tabs.js';
import { initMoodSelector } from './modules/mood.js';
import { initHistory } from './modules/history.js';
import { initNotes } from './modules/notes.js';
import { initCalendar } from './modules/calendar.js';

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('Трекер настроения запущен!');
  
  // Инициализируем все модули
  initTabs();
  initMoodSelector();
  initHistory();
  initNotes();
  initCalendar();
  
  console.log('Все модули инициализированы');
});

// Обработка ошибок
window.addEventListener('error', (event) => {
  console.error('Ошибка приложения:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Необработанное событие:', event.reason);
});
