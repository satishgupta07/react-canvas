/**
 * TabList module
 *
 * A fully accessible tab interface following the WAI-ARIA Tabs pattern.
 *
 * State:
 * - `activeId` (string) identifies the selected tab by ID rather than index,
 *   which is more robust when tabs are added/removed.
 * - `tabRefs` (object keyed by tab ID) holds refs to each tab button so we
 *   can programmatically call `.focus()` during keyboard navigation.
 *
 * Keyboard navigation (roving tabindex):
 * - Only the active tab has `tabIndex={0}`; all others have `tabIndex={-1}`.
 *   This makes the entire tab row a single Tab stop.
 * - ArrowRight / ArrowLeft cycle through tabs and move focus.
 * - Home / End jump to the first / last tab.
 * - All navigation wraps around (mod arithmetic).
 *
 * ARIA wiring:
 * - `role="tablist"` on the container, `role="tab"` on each button.
 * - `aria-controls="panel-{id}"` links each tab to its panel.
 * - `aria-labelledby="tab-{id}"` links each panel back to its tab.
 * - `aria-selected` reflects the active state.
 *
 * Panel content is rendered by switching between panel components stored
 * in the `panels` map — avoids a long if/else chain.
 */
import { useRef, useState } from 'react'
import Typography from '../../components/ui/Typography/Typography'
import Badge from '../../components/ui/Badge/Badge'
import Alert from '../../components/ui/Alert/Alert'
import Card from '../../components/ui/Card/Card'
import Button from '../../components/ui/Button/Button'

const tabs = [
  { id: 'overview', label: 'Overview', badge: null },
  { id: 'activity', label: 'Activity', badge: { label: '4', variant: 'primary' } },
  { id: 'notifications', label: 'Notifications', badge: { label: '2', variant: 'danger' } },
  { id: 'settings', label: 'Settings', badge: null },
]

function OverviewPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="muted">
        Welcome to the overview. Here you can see a summary of your account status and recent highlights.
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Items', value: '1,284', variant: 'success' },
          { label: 'In Progress', value: '42', variant: 'warning' },
          { label: 'Completed', value: '938', variant: 'primary' },
        ].map(stat => (
          <Card key={stat.label}>
            <Typography variant="caption" className="uppercase tracking-widest">{stat.label}</Typography>
            <div className="flex items-center justify-between mt-1">
              <Typography variant="h3">{stat.value}</Typography>
              <Badge variant={stat.variant}>{stat.variant}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ActivityPanel() {
  const items = [
    { user: 'Alice', action: 'pushed a commit to', target: 'main', time: '2m ago', variant: 'primary' },
    { user: 'Bob', action: 'opened a PR on', target: 'feat/login', time: '18m ago', variant: 'info' },
    { user: 'Carol', action: 'closed issue #42 on', target: 'ReactCanvas', time: '1h ago', variant: 'success' },
    { user: 'David', action: 'commented on', target: 'PR #17', time: '3h ago', variant: 'default' },
  ]
  return (
    <div className="flex flex-col gap-0">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--rc-border)] last:border-0">
          <div className="flex items-center gap-3">
            <Badge variant={item.variant}>{item.user}</Badge>
            <Typography variant="muted">
              {item.action} <span className="text-[var(--rc-text)] font-medium">{item.target}</span>
            </Typography>
          </div>
          <Typography variant="caption">{item.time}</Typography>
        </div>
      ))}
    </div>
  )
}

function NotificationsPanel() {
  return (
    <div className="flex flex-col gap-3">
      <Alert variant="error" title="Build failed" dismissible>
        The production build on <strong>main</strong> failed at step "Run tests". Check the logs.
      </Alert>
      <Alert variant="warning" title="Approaching limit">
        Your storage is at 87% capacity. Consider archiving old data.
      </Alert>
    </div>
  )
}

function SettingsPanel() {
  return (
    <Card title="Danger zone" subtitle="Irreversible actions — proceed with caution">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="body">Delete account</Typography>
          <Typography variant="muted">Permanently removes all your data.</Typography>
        </div>
        <Button variant="danger" size="sm">Delete</Button>
      </div>
    </Card>
  )
}

const panels = {
  overview: OverviewPanel,
  activity: ActivityPanel,
  notifications: NotificationsPanel,
  settings: SettingsPanel,
}

export default function TabList() {
  const [activeId, setActiveId] = useState('overview')
  const tabRefs = useRef({})
  const ActivePanel = panels[activeId]

  function handleKeyDown(e) {
    const ids = tabs.map(t => t.id)
    const idx = ids.indexOf(activeId)
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const next = e.key === 'ArrowRight'
        ? ids[(idx + 1) % ids.length]
        : ids[(idx - 1 + ids.length) % ids.length]
      setActiveId(next)
      tabRefs.current[next]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActiveId(ids[0])
      tabRefs.current[ids[0]]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      setActiveId(ids.at(-1))
      tabRefs.current[ids.at(-1)]?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-[var(--rc-bg)] p-4 sm:p-8">
      <Typography variant="h3" className="mb-6">Tab List</Typography>

      <div
        role="tablist"
        aria-label="Main navigation"
        className="flex border-b border-[var(--rc-border)] overflow-x-auto"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            ref={el => tabRefs.current[tab.id] = el}
            role="tab"
            aria-selected={activeId === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeId === tab.id ? 0 : -1}
            onClick={() => setActiveId(tab.id)}
            onKeyDown={handleKeyDown}
            className={[
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors shrink-0 whitespace-nowrap',
              activeId === tab.id
                ? 'text-purple-400 border-purple-500'
                : 'text-[var(--rc-muted)] border-transparent hover:text-[var(--rc-text)]',
            ].join(' ')}
          >
            {tab.label}
            {tab.badge && <Badge size="sm" variant={tab.badge.variant}>{tab.badge.label}</Badge>}
          </button>
        ))}
      </div>

      <div
        id={`panel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeId}`}
        className="pt-6"
      >
        <ActivePanel />
      </div>
    </div>
  )
}
