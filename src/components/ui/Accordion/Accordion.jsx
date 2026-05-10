/**
 * Accordion — compound component (Accordion + AccordionItem)
 *
 * Only one item can be open at a time.  The open item ID is stored in
 * the parent <Accordion> and shared via React Context, so AccordionItem
 * children don't need to receive/pass state as props.
 *
 * Animation: CSS `grid-rows-[0fr → 1fr]` transition.  The inner div has
 * `overflow-hidden` so the content is clipped when collapsed.  This
 * achieves a smooth height animation without any JS height measurement —
 * the grid row simply transitions from 0 to its natural content height.
 *
 * Usage:
 *   <Accordion defaultOpen="first">
 *     <AccordionItem id="first" title="...">content</AccordionItem>
 *     <AccordionItem id="second" title="...">content</AccordionItem>
 *   </Accordion>
 */
import { createContext, useContext, useState } from 'react';

const AccordionCtx = createContext(null);

export function Accordion({ children, defaultOpen = null, className = '' }) {
  const [openId, setOpenId] = useState(defaultOpen);
  // Clicking an open item closes it; clicking a closed item opens it
  const toggle = id => setOpenId(prev => (prev === id ? null : id));

  return (
    <AccordionCtx.Provider value={{ openId, toggle }}>
      <div className={`flex flex-col gap-3 ${className}`}>
        {children}
      </div>
    </AccordionCtx.Provider>
  );
}

export function AccordionItem({ id, title, description, children }) {
  const { openId, toggle } = useContext(AccordionCtx);
  const isOpen = openId === id;

  return (
    <div className={`rounded-xl border bg-[var(--rc-surface)] transition-colors duration-150 ${isOpen ? 'border-purple-500/40' : 'border-[var(--rc-border)] hover:border-[var(--rc-border-hover)]'}`}>
      <button
        type="button"
        onClick={() => toggle(id)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`text-sm font-semibold transition-colors shrink-0 ${isOpen ? 'text-purple-400' : 'text-[var(--rc-text)] group-hover:text-purple-400'}`}>
            {title}
          </span>
          {description && (
            <span className="text-xs text-[var(--rc-muted)] truncate hidden sm:block">
              {description}
            </span>
          )}
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 transition-all duration-200 ${isOpen ? 'text-purple-400 rotate-180' : 'text-[var(--rc-muted)]'}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/*
        CSS grid animation trick:
        - Outer div transitions between grid-rows-[0fr] and grid-rows-[1fr]
        - Inner div has overflow-hidden to clip content while collapsing
        - No JS height measurement needed — the grid row height is auto
      */}
      <div className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-1 flex flex-col gap-4 border-t border-[var(--rc-border)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
