/**
 * Sidebar
 *
 * Fixed-width navigation panel that scrolls independently when nav items
 * overflow the viewport height.
 *
 * Theme switcher: two buttons (Light / Dark) that call setTheme() from
 * ThemeContext.  The active option gets a purple highlight; the inactive
 * one has a hover state.  Tailwind's `dark:` utilities read the `dark`
 * class on <html>, which ThemeContext keeps in sync.
 *
 * Navigation: React Router <NavLink> gives each link an `isActive` flag
 * so the active route gets a purple left-border accent style.
 * `end` on the root path prevents "/" from matching every route.
 */
import { NavLink } from 'react-router-dom';
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

const Sidebar = ({ routes }) => {
  const { theme, setTheme } = useTheme();

  return (
    <aside className="w-60 h-full flex flex-col shrink-0 overflow-y-auto bg-[var(--rc-surface)] border-r border-[var(--rc-border)] shadow-xl">

      {/* Logo */}
      <div className="px-5 py-6 text-sm font-bold text-purple-400 tracking-wider uppercase border-b border-[var(--rc-border)]">
        React Canvas
      </div>

      {/* Theme switcher */}
      <div className="px-4 py-3 border-b border-[var(--rc-border)]">
        <div className="flex rounded-lg overflow-hidden border border-[var(--rc-border)] text-xs font-medium">

          <button
            onClick={() => setTheme('light')}
            className={[
              'flex flex-1 items-center justify-center gap-1.5 py-2 transition-all duration-150',
              theme === 'light'
                ? 'bg-purple-500/20 text-purple-400'
                : 'text-[var(--rc-muted)] hover:bg-[var(--rc-hover)] hover:text-[var(--rc-text)]',
            ].join(' ')}
          >
            <SunIcon /> Light
          </button>

          <div className="w-px bg-[var(--rc-border)]" />

          <button
            onClick={() => setTheme('dark')}
            className={[
              'flex flex-1 items-center justify-center gap-1.5 py-2 transition-all duration-150',
              theme === 'dark'
                ? 'bg-purple-500/20 text-purple-400'
                : 'text-[var(--rc-muted)] hover:bg-[var(--rc-hover)] hover:text-[var(--rc-text)]',
            ].join(' ')}
          >
            <MoonIcon /> Dark
          </button>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col py-4 gap-1">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            end={route.path === '/'}
            className={({ isActive }) => [
              'flex items-center px-5 py-3 text-[15px] transition-all duration-200 border-l-4',
              isActive
                ? 'bg-purple-500/10 text-purple-400 border-purple-500 font-medium'
                : 'text-[var(--rc-muted)] hover:bg-[var(--rc-hover)] hover:text-[var(--rc-text)] border-transparent',
            ].join(' ')}
          >
            {route.label}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;
