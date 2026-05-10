/**
 * RadioButton — compound component (RadioGroup + RadioOption)
 *
 * Compound component pattern via React Context:
 * - <RadioGroup> owns the `value` state and provides it via RadioContext.
 * - <RadioOption> reads from that context — it never receives value/onChange
 *   as direct props, which keeps the call site clean.
 *
 * Visual pattern (same `sr-only peer` technique as Checkbox):
 * - The native <input type="radio"> is hidden with `sr-only`.
 * - The styled circle <span> uses `peer-checked:` and `peer-focus-visible:`
 *   to respond to the hidden input's state via CSS alone.
 *
 * Isolation: each <RadioGroup> uses its own `name` prop, so multiple
 * independent radio groups on the same page don't share state — the browser's
 * built-in radio grouping by `name` attribute handles exclusivity.
 *
 * `useId` on RadioOption ensures each option's label and input share a
 * unique ID even when the same option renders multiple times on a page.
 */
import { createContext, useContext, useId } from 'react';

const RadioContext = createContext(null);

export function RadioGroup({
  name,
  value,
  onChange,
  children,
  direction = 'vertical',
  label,
  error,
  helperText,
  className = '',
}) {
  return (
    <RadioContext.Provider value={{ name, value, onChange }}>
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && <span className="text-sm font-medium text-[var(--rc-muted)]">{label}</span>}
        <div className={`flex ${direction === 'horizontal' ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2'}`}>
          {children}
        </div>
        {(error || helperText) && (
          <p className={`text-xs ${error ? 'text-red-400' : 'text-[var(--rc-muted)]'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    </RadioContext.Provider>
  );
}

export function RadioOption({ value, label, disabled = false }) {
  const ctx = useContext(RadioContext);
  const uid = useId();
  const isChecked = ctx?.value === value;

  return (
    <label
      htmlFor={uid}
      className={`inline-flex items-center gap-2.5 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <input
        id={uid}
        type="radio"
        name={ctx?.name}
        value={value}
        checked={isChecked}
        onChange={() => !disabled && ctx?.onChange(value)}
        disabled={disabled}
        className="sr-only peer"
      />

      <span className={[
        'w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-150',
        'peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-[var(--rc-bg)]',
        isChecked
          ? 'border-purple-500 bg-purple-500'
          : 'border-[var(--rc-border)] bg-transparent hover:border-purple-500',
      ].join(' ')}>
        {isChecked && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
      </span>

      {label && <span className="text-sm text-[var(--rc-text)] select-none">{label}</span>}
    </label>
  );
}
