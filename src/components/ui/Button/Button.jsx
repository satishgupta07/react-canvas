/**
 * Button — reusable action element
 *
 * Variants:  primary | secondary | danger | success | ghost | outline
 * Sizes:     sm | md | lg
 *
 * Loading state:
 *   When `loading` is true the button is disabled and shows a Spinner.
 *   The spinner color is white for solid variants (primary/danger/success)
 *   and gray for transparent variants, for contrast.
 *
 * `forwardRef` allows parents to attach a ref to the underlying <button>
 * (useful for focus management, e.g. returning focus to a trigger after
 * a modal closes).
 *
 * `type="button"` is the default to prevent accidental form submissions
 * when a Button is rendered inside a <form>.
 */
import { forwardRef } from 'react';
import Spinner from '../Spinner/Spinner';

const variants = {
  primary: 'bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white border-transparent shadow-sm shadow-purple-900/40',
  secondary: 'bg-[var(--rc-elevated)] hover:bg-[var(--rc-hover)] active:bg-[var(--rc-surface)] text-[var(--rc-text)] border-[var(--rc-border)]',
  danger: 'bg-red-600 hover:bg-red-500 active:bg-red-700 text-white border-transparent shadow-sm shadow-red-900/40',
  success: 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white border-transparent shadow-sm shadow-emerald-900/40',
  ghost: 'bg-transparent hover:bg-[var(--rc-hover)] text-[var(--rc-muted)] hover:text-[var(--rc-text)] border-transparent',
  outline: 'bg-transparent hover:bg-purple-600/10 active:bg-purple-600/20 text-purple-400 hover:text-purple-300 border-purple-500/50 hover:border-purple-400',
};

const sizes = {
  sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
  md: 'h-9 px-4 text-sm rounded-lg gap-2',
  lg: 'h-11 px-5 text-base rounded-xl gap-2',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const solidVariants = ['primary', 'danger', 'success'];
  const spinnerColor = solidVariants.includes(variant) ? 'white' : 'gray';

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center font-medium border transition-all duration-150 cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rc-bg)]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        sizes[size] ?? sizes.md,
        variants[variant] ?? variants.primary,
        fullWidth && 'w-full',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" color={spinnerColor} />
          {children && <span>{children}</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0 leading-none">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0 leading-none">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
