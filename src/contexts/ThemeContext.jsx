import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

/**
 * Wraps the app and manages the light/dark theme state.
 *
 * The state initializer runs synchronously before the first paint:
 * it reads localStorage and applies the `dark` class on <html> immediately,
 * preventing any flash-of-wrong-theme on page load.
 *
 * After every theme change the useEffect keeps the class and localStorage
 * in sync.  Tailwind's `dark:` utilities read the `dark` class on <html>.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('rc-theme') ?? 'dark';
    // Apply class synchronously so there is no flash before the first render
    document.documentElement.classList.toggle('dark', saved === 'dark');
    return saved;
  });

  // Keep <html class="dark"> and localStorage in sync whenever theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('rc-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Convenience hook — throws if used outside <ThemeProvider>. */
export function useTheme() {
  return useContext(ThemeContext);
}
