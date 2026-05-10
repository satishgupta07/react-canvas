/**
 * Typography — single component for all text elements
 *
 * The `variant` prop selects a preset (h1–h4, label, body, muted, caption,
 * code) which defines both the default HTML tag and the Tailwind classes.
 *
 * The `as` prop overrides the HTML tag while keeping the variant's styles —
 * useful when semantic HTML differs from visual style (e.g. a visually h3
 * heading that should render as a <p> for outline/SEO reasons).
 *
 * `className` merges additional Tailwind classes on top of the preset styles.
 * Pass overrides like `className="mt-4 text-red-400"` to customise inline.
 *
 * All extra props (id, aria-*, onClick, …) pass through via `...props`.
 */
const variants = {
  h1: { as: 'h1', cls: 'text-3xl font-extrabold tracking-tight text-[var(--rc-text)]' },
  h2: { as: 'h2', cls: 'text-2xl font-bold tracking-tight text-[var(--rc-text)]' },
  h3: { as: 'h3', cls: 'text-xl font-semibold text-[var(--rc-text)]' },
  h4: { as: 'h4', cls: 'text-base font-semibold text-[var(--rc-text)]' },
  label: { as: 'label', cls: 'text-sm font-medium text-[var(--rc-muted)] select-none' },
  body: { as: 'p', cls: 'text-sm leading-relaxed text-[var(--rc-text)]' },
  muted: { as: 'p', cls: 'text-sm leading-relaxed text-[var(--rc-muted)]' },
  caption: { as: 'span', cls: 'text-xs text-[var(--rc-muted)]' },
  code: { as: 'code', cls: 'text-xs font-mono text-purple-400' },
};

export default function Typography({ variant = 'body', as, className = '', children, ...props }) {
  const config = variants[variant] ?? variants.body;
  const Tag = as ?? config.as;

  return (
    <Tag className={`${config.cls} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
