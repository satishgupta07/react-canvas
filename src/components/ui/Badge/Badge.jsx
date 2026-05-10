/**
 * Badge — inline status / label pill
 *
 * Variants: default | primary | success | danger | warning | info
 * Sizes:    sm | md | lg
 *
 * `dot` prop renders a small filled circle before the label — useful for
 * status indicators (e.g. "● Active", "● Counting").
 *
 * Light/dark styles are both defined per variant so the badge looks correct
 * in both themes without relying on CSS custom properties (the colors are
 * too specific for generic tokens).
 */
const variants = {
  default: 'bg-gray-100 text-gray-600 border border-gray-200 dark:bg-[#2e2e42] dark:text-gray-300 dark:border-[#3e3e58]',
  primary: 'bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30',
  success: 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
  danger: 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-500/15 dark:text-red-300 dark:border-red-500/30',
  warning: 'bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
  info: 'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30',
};

const sizes = {
  sm: 'text-[10px] px-1.5 py-0.5 rounded',
  md: 'text-xs px-2 py-0.5 rounded-md',
  lg: 'text-sm px-2.5 py-1 rounded-md',
};

export default function Badge({ children, variant = 'default', size = 'md', dot = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-medium ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.default} ${className}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
