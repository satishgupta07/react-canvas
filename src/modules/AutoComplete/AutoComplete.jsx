/**
 * AutoComplete
 *
 * A search input that filters a local fruit list and shows a dropdown
 * of suggestions.  Selecting a result clears the input and shows a
 * self-dismissing alert.
 *
 * Key implementation details:
 *
 * Debounce via useRef:
 *   When `debounceInput` is true, `notify()` stores the timeout ID in
 *   `debounceRef` and clears it on every keystroke.  Using a ref (not
 *   useCallback + closure) avoids creating a new debounced function on
 *   every render and keeps the timer ID stable across renders.
 *
 * Click-outside detection:
 *   A `mousedown` listener on `document` checks whether the click target
 *   is inside `containerRef`.  `mousedown` fires before `blur`, so the
 *   dropdown can close cleanly without race conditions.
 *
 * Keyboard navigation:
 *   ↑ / ↓ move `activeIndex`; Enter selects the highlighted item;
 *   Escape closes the dropdown.  All arrow keys call `e.preventDefault()`
 *   to stop the cursor from moving in the input.
 *
 * Auto-dismissing alert:
 *   After a selection `alertTimerRef` holds a 3-second timeout that
 *   clears `selected`.  The effect cleanup cancels the timer if the
 *   user selects again before it fires.
 */
import { useEffect, useRef, useState } from 'react'
import Input from '../../components/ui/Input/Input'
import Alert from '../../components/ui/Alert/Alert'
import Typography from '../../components/ui/Typography/Typography'
import Suggestions from './Suggestions'
import fruitData from './data.json'

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function AutoComplete({ debounceInput = false, isLoading, onChange = () => { } }) {
  const [query, setQuery] = useState('')
  const [showList, setShowList] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [selected, setSelected] = useState(null)
  const debounceRef = useRef(null)
  const containerRef = useRef(null)
  const alertTimerRef = useRef(null)

  // Auto-dismiss the alert after 3 s
  useEffect(() => {
    if (!selected) return
    clearTimeout(alertTimerRef.current)
    alertTimerRef.current = setTimeout(() => setSelected(null), 3000)
    return () => clearTimeout(alertTimerRef.current)
  }, [selected])

  const filtered = fruitData.filter(s => s.toLowerCase().includes(query.toLowerCase()))
  const showSuggestions = showList && (isLoading || !!query)

  // Close on outside click
  useEffect(() => {
    function onMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowList(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  function notify(value) {
    if (debounceInput) {
      clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => onChange(value), 200)
    } else {
      onChange(value)
    }
  }

  function handleChange(e) {
    const value = e.target.value
    setQuery(value)
    setShowList(true)
    setActiveIndex(-1)
    notify(value)
  }

  function handleClear() {
    setQuery('')
    setShowList(false)
    setActiveIndex(-1)
    onChange('')
  }

  function handleSelect(value) {
    setQuery('')
    setShowList(false)
    setActiveIndex(-1)
    setSelected(value)
    notify(value)
  }

  function handleKeyDown(e) {
    if (!showSuggestions || isLoading) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      handleSelect(filtered[activeIndex])
    } else if (e.key === 'Escape') {
      setShowList(false)
    }
  }

  const clearButton = query ? (
    <button
      type="button"
      onClick={handleClear}
      className="flex items-center text-[var(--rc-muted)] hover:text-[var(--rc-text)] transition-colors"
      aria-label="Clear"
    >
      <ClearIcon />
    </button>
  ) : null

  return (
    <div className="min-h-screen bg-[var(--rc-bg)] flex items-start justify-center p-8">
      <div className="w-full max-w-md">
        <Typography variant="h3" className="mb-1">AutoComplete</Typography>
        <Typography variant="muted" className="mb-6">
          Search from {fruitData.length} fruits. Use ↑ ↓ to navigate, Enter to select, Esc to close.
        </Typography>

        {selected && (
          <Alert
            variant="success"
            title="Selection confirmed"
            dismissible
            onDismiss={() => setSelected(null)}
            className="mb-4"
          >
            <strong>{selected}</strong> was selected.
          </Alert>
        )}

        <div ref={containerRef} className="relative">
          <Input
            placeholder="Search fruits…"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setShowList(true)}
            leftIcon={<SearchIcon />}
            rightIcon={clearButton}
          />

          {showSuggestions && (
            <Suggestions
              isLoading={isLoading}
              suggestions={filtered}
              query={query}
              activeIndex={activeIndex}
              onSelect={handleSelect}
              onHover={setActiveIndex}
            />
          )}
        </div>
      </div>
    </div>
  )
}
