// Модуль управления состоянием приложения. Хранит все данные в памяти

export const state = {
  moods: [],
  notes: [],
  currentMood: null,
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  activeTab: 'diary'
};

export const moodTypes = {
  excellent: { emoji: '😄', label: 'Отлично', color: '#10b981' },
  good: { emoji: '🙂', label: 'Хорошо', color: '#34d399' },
  neutral: { emoji: '😐', label: 'Нормально', color: '#fbbf24' },
  bad: { emoji: '😞', label: 'Плохо', color: '#fb923c' },
  terrible: { emoji: '😡', label: 'Ужасно', color: '#ef4444' }
};

// Добавить настроение
export function addMood(type, note = '') {
  const mood = {
    id: Date.now(),
    type,
    note,
    date: new Date(),
    timestamp: Date.now()
  };
  
  state.moods.unshift(mood);
  return mood;
}

// Добавить заметку
export function addNote(title, content, moodType) {
  const note = {
    id: Date.now(),
    title: title || 'Без заголовка',
    content,
    moodType,
    date: new Date(),
    timestamp: Date.now()
  };
  
  state.notes.unshift(note);
  return note;
}

// Получить настроения за определенную дату
export function getMoodsByDate(date) {
  return state.moods.filter(mood => {
    const moodDate = new Date(mood.date);
    return moodDate.toDateString() === date.toDateString();
  });
}

// Получить настроение на определенный день
export function getMoodForDay(year, month, day) {
  return state.moods.find(mood => {
    const moodDate = new Date(mood.date);
    return moodDate.getFullYear() === year &&
           moodDate.getMonth() === month &&
           moodDate.getDate() === day;
  });
}

// Удалить настроение
export function deleteMood(id) {
  const index = state.moods.findIndex(mood => mood.id === id);
  if (index !== -1) {
    state.moods.splice(index, 1);
    return true;
  }
  return false;
}

// Удалить заметку
export function deleteNote(id) {
  const index = state.notes.findIndex(note => note.id === id);
  if (index !== -1) {
    state.notes.splice(index, 1);
    return true;
  }
  return false;
}

// Сменить месяц в календаре
export function changeMonth(direction) {
  if (direction === 'next') {
    state.currentMonth++;
    if (state.currentMonth > 11) {
      state.currentMonth = 0;
      state.currentYear++;
    }
  } else {
    state.currentMonth--;
    if (state.currentMonth < 0) {
      state.currentMonth = 11;
      state.currentYear--;
    }
  }
}
