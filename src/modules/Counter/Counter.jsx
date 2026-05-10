/**
 * Counter module
 *
 * Demonstrates controlled state with boundary guards and a configurable step.
 *
 * - MIN / MAX constants define the allowed range (0–999).
 * - The − button is disabled at MIN; the + button is disabled at MAX.
 *   `Math.max` / `Math.min` guard inside the onClick handlers provide a
 *   second layer of safety in case the disabled state is bypassed.
 * - `step` is driven by the Select dropdown (options: 1, 5, 10).
 * - `badgeVariant` and `statusText` are derived values — they are computed
 *   on every render from `count` rather than stored in separate state,
 *   keeping the state minimal.
 */
import { useState } from 'react'
import Button from '../../components/ui/Button/Button'
import Badge from '../../components/ui/Badge/Badge'
import Select from '../../components/ui/Select/Select'
import Typography from '../../components/ui/Typography/Typography'

const MIN = 0
const MAX = 999

const stepOptions = [
  { value: '1', label: 'Step: 1' },
  { value: '5', label: 'Step: 5' },
  { value: '10', label: 'Step: 10' },
]

export default function Counter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  const atMin = count <= MIN
  const atMax = count >= MAX

  const badgeVariant = count === 0 ? 'default' : atMax ? 'warning' : 'success'
  const badgeLabel = count === 0 ? 'Zero' : atMax ? 'Max reached' : 'Counting'
  const statusText = atMin ? 'Minimum value reached — cannot go below 0'
    : atMax ? `Maximum value reached — cannot go above ${MAX}`
      : 'State updated in real-time'

  return (
    <div className="flex-1 min-h-screen bg-[var(--rc-bg)] p-8 flex items-center justify-center">
      <div className="w-full max-w-sm p-8 rounded-3xl bg-[var(--rc-surface)] border border-[var(--rc-border)] shadow-2xl text-center transition-all hover:border-purple-500/30">

        {/* Header */}
        <Typography variant="caption" className="uppercase tracking-[0.2em] font-bold block mb-2">
          Interactive Module
        </Typography>
        <Typography variant="h3" className="mb-4">Simple Counter</Typography>
        <Badge variant={badgeVariant} dot>{badgeLabel}</Badge>

        {/* Display */}
        <div className="relative my-10">
          <div className="text-7xl font-mono font-bold text-[var(--rc-text)] tabular-nums">
            {count}
          </div>
          <div className="absolute inset-0 bg-purple-500/10 blur-3xl -z-10 rounded-full" />
        </div>

        {/* Step selector */}
        <div className="mb-6 max-w-[140px] mx-auto">
          <Select
            options={stepOptions}
            value={String(step)}
            onChange={e => setStep(Number(e.target.value))}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="danger"
            size="lg"
            disabled={atMin}
            onClick={() => setCount(c => Math.max(MIN, c - step))}
          >
            −
          </Button>
          <Button
            variant="secondary"
            onClick={() => setCount(0)}
          >
            Reset
          </Button>
          <Button
            variant="success"
            size="lg"
            disabled={atMax}
            onClick={() => setCount(c => Math.min(MAX, c + step))}
          >
            +
          </Button>
        </div>

        {/* Status */}
        <Typography variant="caption" className="mt-6 italic block">
          {statusText}
        </Typography>

      </div>
    </div>
  )
}
