/**
 * TabButton — step indicator tab for the TabForm multi-step form
 *
 * Visual states:
 * - Active (current step):    purple text + bottom border, step number in purple circle
 * - Completed (past step):    emerald text, checkmark icon in emerald circle
 * - Upcoming (future step):   muted text, step number in neutral circle
 *
 * The step number / checkmark circle provides at-a-glance progress feedback
 * without needing a separate progress bar component.
 */
function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function TabButton({ label, step, isActive, isCompleted, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={[
        'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
        isActive
          ? 'text-purple-400 border-purple-500'
          : isCompleted
            ? 'text-emerald-500 border-transparent hover:border-emerald-500/40'
            : 'text-[var(--rc-muted)] border-transparent hover:text-[var(--rc-text)]',
      ].join(' ')}
    >
      <span className={[
        'w-5 h-5 flex items-center justify-center rounded-full text-[11px] font-bold shrink-0 transition-colors',
        isActive    ? 'bg-purple-500/20 text-purple-400'  :
        isCompleted ? 'bg-emerald-500/20 text-emerald-500' :
                      'bg-[var(--rc-elevated)] text-[var(--rc-muted)]',
      ].join(' ')}>
        {isCompleted ? <CheckIcon /> : step}
      </span>
      {label}
    </button>
  )
}
