/**
 * Input — general-purpose form field component
 *
 * Supports: text, email, number, password (with show/hide toggle), textarea,
 * left/right icon slots, error messages, and helper text.
 *
 * Key patterns:
 * - `forwardRef`: lets parent components attach a ref directly to the
 *   underlying <input> or <textarea> element (e.g. for focus management).
 * - `useId`: generates a stable, unique ID per component instance so the
 *   <label htmlFor> and input `id` always match, even with multiple inputs.
 * - `sr-only` on nothing here — the label is visible; `sr-only` is used
 *   in Checkbox/RadioButton where the native input must be hidden.
 * - `rightIcon` accepts any ReactNode.  The wrapper has no pointer-events
 *   restriction so interactive elements (like a clear button) work inside it.
 * - Password toggle button uses `tabIndex={-1}` so it doesn't interrupt
 *   the normal Tab flow through the form.
 */
import { forwardRef, useState, useId } from 'react';

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const baseCls = [
  'ui-input-no-spin w-full bg-[var(--rc-input-bg)] text-[var(--rc-text)] placeholder-[var(--rc-muted)] rounded-lg border',
  'px-3 py-2 text-sm transition-all duration-150 outline-none',
  'focus:ring-2 focus:border-purple-500 focus:ring-purple-500/25',
].join(' ');

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  leftIcon,
  rightIcon,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const uid = useId();
  const isPassword = type === 'password';
  const isTextarea = type === 'textarea';
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const hasRightSlot = isPassword || rightIcon;

  const fieldCls = [
    baseCls,
    error
      ? 'border-red-500/70 focus:ring-red-500/25 focus:border-red-500'
      : 'border-[var(--rc-border)] hover:border-[var(--rc-border-hover)]',
    disabled && 'opacity-50 cursor-not-allowed',
    leftIcon && 'pl-9',
    hasRightSlot && 'pr-9',
  ].filter(Boolean).join(' ');

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={uid} className="text-sm font-medium text-[var(--rc-muted)] select-none">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-[var(--rc-muted)] pointer-events-none flex items-center">
            {leftIcon}
          </span>
        )}

        {isTextarea ? (
          <textarea
            ref={ref}
            id={uid}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            rows={rows}
            className={`${fieldCls} resize-y leading-relaxed`}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            id={uid}
            type={resolvedType}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className={fieldCls}
            {...props}
          />
        )}

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 flex items-center text-[var(--rc-muted)] hover:text-[var(--rc-text)] transition-colors"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
        {!isPassword && rightIcon && (
          <span className="absolute right-3 text-[var(--rc-muted)] flex items-center">
            {rightIcon}
          </span>
        )}
      </div>

      {(error || helperText) && (
        <p className={`text-xs ${error ? 'text-red-400' : 'text-[var(--rc-muted)]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
