/**
 * Select — styled native <select> dropdown
 *
 * Uses `appearance-none` to remove the browser's default arrow, then
 * overlays a custom ChevronDown icon (pointer-events-none so it doesn't
 * intercept clicks).
 *
 * Native <select> is used intentionally over a custom listbox:
 * - Zero JS for keyboard navigation and mobile support.
 * - Works with browser autofill and built-in accessibility.
 *
 * Option background color is set inline with CSS variables because
 * <option> elements don't inherit Tailwind dark-mode utility classes.
 *
 * `forwardRef` + `useId` follow the same pattern as Input.jsx.
 */
import { forwardRef, useId } from 'react';

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const Select = forwardRef(({
  label,
  options = [],
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  helperText,
  className = '',
  ...props
}, ref) => {
  const uid = useId();

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={uid} className="text-sm font-medium text-[var(--rc-muted)] select-none">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          ref={ref}
          id={uid}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={[
            'w-full appearance-none bg-[var(--rc-input-bg)] text-[var(--rc-text)] rounded-lg border',
            'px-3 py-2 pr-9 text-sm transition-all duration-150 outline-none cursor-pointer',
            'focus:ring-2 focus:border-purple-500 focus:ring-purple-500/25',
            error
              ? 'border-red-500/70 focus:ring-red-500/25 focus:border-red-500'
              : 'border-[var(--rc-border)] hover:border-[var(--rc-border-hover)]',
            disabled && 'opacity-50 cursor-not-allowed',
          ].filter(Boolean).join(' ')}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(opt => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              style={{ backgroundColor: 'var(--rc-surface)', color: 'var(--rc-text)' }}
            >
              {opt.label}
            </option>
          ))}
        </select>

        <span className="absolute right-3 text-[var(--rc-muted)] pointer-events-none">
          <ChevronDownIcon />
        </span>
      </div>

      {(error || helperText) && (
        <p className={`text-xs ${error ? 'text-red-400' : 'text-[var(--rc-muted)]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
