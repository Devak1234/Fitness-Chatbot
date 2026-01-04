import React from 'react';

export default function ThemeToggle() {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme;
    document.documentElement.dataset.theme = currentTheme === 'dark' ? '' : 'dark';
  };

  return (
    <button onClick={toggleTheme} style={{ position: 'fixed', top: 10, right: 10 }}>
      Toggle Theme
    </button>
  );
}