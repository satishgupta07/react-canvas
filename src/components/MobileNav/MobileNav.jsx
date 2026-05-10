/**
 * MobileNav
 *
 * Compact top bar shown only on screens below the `md` breakpoint.
 * Contains the React Canvas logo, a theme switcher, and a "Modules"
 * dropdown that lists every route. Selecting a route navigates and
 * closes the menu.
 *
 * The dropdown uses a click-outside listener (mousedown) to close when
 * the user taps elsewhere.
 */
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const MobileNav = ({ routes }) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const activeRoute =
    routes.find(r => (r.path === '/' ? location.pathname === '/' : location.pathname.startsWith(r.path))) ?? routes[0];

  useEffect(() => {
    function onMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  function handleSelect(path) {
    navigate(path);
    setOpen(false);
  }

  return (
    <header className="md:hidden shrink-0 bg-[var(--rc-surface)] border-b border-[var(--rc-border)] shadow">
      <div className="flex items-center justify-between px-4 py-3 gap-3">

        {/* Logo */}
        <div className="text-xs font-bold text-purple-400 tracking-wider uppercase">
          React Canvas
        </div>

        {/* Theme switcher */}
        <div className="flex rounded-lg overflow-hidden border border-[var(--rc-border)] text-xs font-medium shrink-0">
          <button
            onClick={() => setTheme('light')}
            aria-label="Light theme"
            className={[
              'flex items-center justify-center gap-1 px-2.5 py-1.5 transition-all duration-150',
              theme === 'light'
                ? 'bg-purple-500/20 text-purple-400'
                : 'text-[var(--rc-muted)] hover:bg-[var(--rc-hover)] hover:text-[var(--rc-text)]',
            ].join(' ')}
          >
            <SunIcon />
          </button>
          <div className="w-px bg-[var(--rc-border)]" />
          <button
            onClick={() => setTheme('dark')}
            aria-label="Dark theme"
            className={[
              'flex items-center justify-center gap-1 px-2.5 py-1.5 transition-all duration-150',
              theme === 'dark'
                ? 'bg-purple-500/20 text-purple-400'
                : 'text-[var(--rc-muted)] hover:bg-[var(--rc-hover)] hover:text-[var(--rc-text)]',
            ].join(' ')}
          >
            <MoonIcon />
          </button>
        </div>
      </div>

      {/* Modules dropdown */}
      <div ref={containerRef} className="relative px-4 pb-3">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-[var(--rc-border)] bg-[var(--rc-input-bg)] text-[var(--rc-text)] text-sm font-medium hover:border-purple-500/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="text-[var(--rc-muted)] text-xs uppercase tracking-wider">Module</span>
            <span className="text-purple-400">{activeRoute.label}</span>
          </span>
          <ChevronIcon open={open} />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute left-4 right-4 mt-2 z-50 rounded-lg border border-[var(--rc-border)] bg-[var(--rc-surface)] shadow-xl overflow-hidden"
          >
            {routes.map(route => {
              const isActive = route.path === activeRoute.path;
              return (
                <li key={route.path} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => handleSelect(route.path)}
                    className={[
                      'w-full text-left px-4 py-3 text-sm transition-colors border-l-4',
                      isActive
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500 font-medium'
                        : 'text-[var(--rc-muted)] hover:bg-[var(--rc-hover)] hover:text-[var(--rc-text)] border-transparent',
                    ].join(' ')}
                  >
                    {route.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </header>
  );
};

export default MobileNav;
