/**
 * Spinner — CSS-only animated loading indicator
 *
 * Renders a single <span> with a border + animate-spin class.
 * The trick: only the top border segment uses the full-opacity color
 * (`border-t-*`), while the other three sides use a translucent version
 * (`border-*\/20`) — this creates the "chasing" arc appearance.
 *
 * @param {boolean} hideLabel - If true (e.g., inside a Button), hides aria-label to avoid redundancy.
 */
const sizes = {
  xs: 'w-3 h-3 border',
  sm: 'w-4 h-4 border-2',
  md: 'w-5 h-5 border-2',
  lg: 'w-7 h-7 border-[3px]',
  xl: 'w-10 h-10 border-4',
};

const colors = {
  primary: 'border-purple-500/20 border-t-purple-400',
  white: 'border-white/20 border-t-white',
  gray: 'border-gray-600/50 border-t-gray-300',
};

export default function Spinner({ size = 'md', color = 'primary', className = '' }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block rounded-full animate-spin ${sizes[size] ?? sizes.md} ${colors[color] ?? colors.primary} ${className}`}
    />
  );
}
