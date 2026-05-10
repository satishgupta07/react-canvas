/**
 * Checkbox — accessible custom-styled checkbox with optional indeterminate state
 *
 * Visual pattern (`sr-only peer`):
 * - The native <input type="checkbox"> is hidden with `sr-only` so it stays
 *   in the DOM for keyboard/screen-reader access but is invisible.
 * - A sibling <span> renders the visible box.  Tailwind's `peer-checked:` and
 *   `peer-focus-visible:` utilities let the span react to the hidden input's
 *   state purely via CSS — no JS event wiring needed.
 *
 * Indeterminate state:
 * - Shown when `indeterminate={true}`, regardless of the `checked` value.
 * - Renders a minus (−) icon instead of a checkmark.
 * - The native `indeterminate` property is NOT set on the DOM input here;
 *   it's purely visual (the parent controls the real checked/indeterminate logic).
 *
 * `forwardRef` + `useId` follow the same pattern as Input.jsx.
 */
import { forwardRef, useId } from 'react';

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

const Checkbox = forwardRef(({
  label,
  checked = false,
  onChange,
  disabled = false,
  indeterminate = false,
  helperText,
  error,
  className = '',
  ...props
}, ref) => {
  const uid = useId();
  const isOn = indeterminate || checked;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={uid}
        className={`inline-flex items-center gap-2.5 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <input
          ref={ref}
          id={uid}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />

        <span className={[
          'w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-all duration-150',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-[var(--rc-bg)]',
          isOn
            ? 'bg-purple-500 border-purple-500'
            : 'bg-transparent border-[var(--rc-border)] hover:border-purple-500',
        ].join(' ')}>
          {checked && !indeterminate && <CheckIcon />}
          {indeterminate && <MinusIcon />}
        </span>

        {label && <span className="text-sm text-[var(--rc-text)] select-none">{label}</span>}
      </label>

      {(error || helperText) && (
        <p className={`text-xs ml-6 ${error ? 'text-red-400' : 'text-[var(--rc-muted)]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
