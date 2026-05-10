/**
 * Suggestions — dropdown list for the AutoComplete module
 *
 * Highlight component:
 *   Finds the first case-insensitive match of `query` inside `text` and
 *   wraps that substring in a purple <span>.  If there's no match it just
 *   renders the text as-is.  This is a pure presentational component with
 *   no state.
 *
 * ARIA roles:
 *   `role="listbox"` on the <ul> and `role="option"` + `aria-selected` on
 *   each <li> make the dropdown readable by screen readers as a selection
 *   widget.  The active item is highlighted visually AND via `aria-selected`.
 *
 * Mouse interaction:
 *   `onMouseEnter` updates `activeIndex` so keyboard and mouse stay in sync
 *   (hovering a row highlights it the same way arrow keys do).
 */
import Spinner from '../../../components/ui/Spinner/Spinner'
import Typography from '../../../components/ui/Typography/Typography'

/** Bolds the portion of `text` that matches `query` (case-insensitive). */
function Highlight({ text, query }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (!query || idx === -1) return <span>{text}</span>
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-purple-400 font-semibold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function Suggestions({ isLoading, suggestions, query, activeIndex, onSelect, onHover }) {
  return (
    <div className="absolute top-full left-0 right-0 mt-1.5 bg-[var(--rc-surface)] border border-[var(--rc-border)] rounded-xl shadow-lg z-50 overflow-hidden">

      {isLoading ? (
        <div className="flex items-center gap-2.5 px-4 py-3">
          <Spinner size="sm" />
          <Typography variant="muted">Loading…</Typography>
        </div>
      ) : !suggestions.length ? (
        <div className="px-4 py-3">
          <Typography variant="muted">No results found for "{query}".</Typography>
        </div>
      ) : (
        <ul className="max-h-60 overflow-y-auto py-1" role="listbox">
          {suggestions.map((s, i) => (
            <li key={s} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                onClick={() => onSelect(s)}
                onMouseEnter={() => onHover(i)}
                className={`w-full flex items-center px-4 py-2.5 text-sm text-left transition-colors ${i === activeIndex
                  ? 'bg-purple-500/10 text-[var(--rc-text)]'
                  : 'text-[var(--rc-text)] hover:bg-[var(--rc-hover)]'
                  }`}
              >
                <Highlight text={s} query={query} />
              </button>
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}
