/**
 * Modal — accessible dialog rendered via React Portal
 *
 * Portal: `createPortal(..., document.body)` mounts the overlay outside the
 * normal React tree so stacking contexts inside the app don't clip the overlay.
 *
 * Accessibility:
 * - Escape key closes the modal (registered on `document` while open).
 * - `document.body.style.overflow = 'hidden'` prevents background scrolling
 *   while the modal is open; the effect cleanup restores it on unmount/close.
 * - Clicking the backdrop calls `onClose` (when `closeOnBackdrop` is true);
 *   `e.stopPropagation()` on the panel prevents that click from bubbling up.
 *
 * `useCallback` on `handleEscape` keeps the reference stable so the
 * useEffect dependency array doesn't trigger unnecessary re-registrations.
 */
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full mx-4',
};

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  className = '',
}) {
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={`ui-modal-panel relative w-full ${sizes[size] ?? sizes.md} bg-[var(--rc-surface)] border border-[var(--rc-border)] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] ${className}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--rc-border)] shrink-0">
            {title && <h2 className="text-base font-semibold text-[var(--rc-text)]">{title}</h2>}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="ml-auto flex items-center justify-center w-8 h-8 rounded-lg text-[var(--rc-muted)] hover:text-[var(--rc-text)] hover:bg-[var(--rc-hover)] transition-all"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="ui-modal-body flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--rc-border)] shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
