/**
 * helpers.jsx — shared presentational primitives for Home section files
 *
 * SearchIcon / PlusIcon  — inline SVG icons used in component demos
 * Row                    — flex row with wrapping, used to display variant grids
 * CodeBlock              — scrollable pre/code block for import paths and prop tables
 * DemoLabel              — "Live demo" divider that separates docs from the demo
 *
 * None of these have business logic — they only handle visual structure
 * so each section file stays focused on its component demo.
 */
import Typography from '../../components/ui/Typography/Typography';

export function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function Row({ children, wrap = true }) {
  return (
    <div className={`flex items-center gap-3 ${wrap ? 'flex-wrap' : ''}`}>
      {children}
    </div>
  );
}

export function CodeBlock({ children }) {
  return (
    <pre className="text-xs bg-[var(--rc-surface)] border border-[var(--rc-border)] rounded-lg px-4 py-3 overflow-x-auto leading-relaxed text-[var(--rc-muted)] whitespace-pre">
      <code>{children}</code>
    </pre>
  );
}

export function DemoLabel() {
  return (
    <Typography variant="caption" as="p" className="font-medium border-t border-dashed border-[var(--rc-border)] pt-3 mt-1">
      Live demo
    </Typography>
  );
}
