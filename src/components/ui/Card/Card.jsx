/**
 * Card — surface container with optional header, body, and footer sections
 *
 * Slots:
 *   title / subtitle  — renders a header row (skipped if both are absent)
 *   actions           — right-aligned content in the header row (e.g. buttons)
 *   children          — main body content
 *   footer            — bottom section separated by a border
 *
 * `hoverable` adds a hover border + shadow transition, useful for clickable cards.
 * `padding` controls the spacing inside each section (none | sm | md | lg).
 */
const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export default function Card({
  title,
  subtitle,
  children,
  footer,
  actions,
  hoverable = false,
  padding = 'md',
  className = '',
}) {
  const pad = paddings[padding] ?? paddings.md;

  return (
    <div className={[
      'bg-[var(--rc-surface)] border border-[var(--rc-border)] rounded-xl',
      hoverable && 'transition-all duration-200 hover:border-[var(--rc-border-hover)] hover:shadow-lg hover:shadow-black/20 cursor-pointer',
      className,
    ].filter(Boolean).join(' ')}>

      {/* Header */}
      {(title || actions) && (
        <div className={`flex items-start justify-between gap-4 ${pad} ${children ? 'pb-3' : ''}`}>
          <div>
            {title && <h3 className="text-sm font-semibold text-[var(--rc-text)]">{title}</h3>}
            {subtitle && <p className="text-xs text-[var(--rc-muted)] mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="shrink-0 flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Body */}
      {children && <div className={pad}>{children}</div>}

      {/* Footer */}
      {footer && (
        <div className={`border-t border-[var(--rc-border)] ${pad}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
