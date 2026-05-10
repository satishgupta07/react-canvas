import { Route, Routes } from 'react-router-dom'
import Home from './modules/Home'
import Counter from './modules/Counter'
import AutoComplete from './modules/AutoComplete'
import TabList from './modules/TabList'
import TabForm from './modules/TabForm'
import Sidebar from './components/Sidebar'

/**
 * Central route registry — each entry drives both the sidebar nav link
 * and the React Router <Route>.  Adding a new module only requires a
 * single entry here; the sidebar and routing update automatically.
 */
const routes = [
  { path: '/', label: 'Home', element: <Home /> },
  { path: '/counter', label: 'Counter', element: <Counter /> },
  { path: '/autocomplete', label: 'AutoComplete', element: <AutoComplete /> },
  { path: '/tablist', label: 'TabList', element: <TabList /> },
  { path: '/tabform', label: 'TabForm', element: <TabForm /> },
]

/**
 * Root layout.
 *
 * `h-full` fills the viewport height established by `html, body, #root`
 * in index.css (all set to `height: 100%; overflow: hidden`).  This
 * ensures the sidebar and the main content area each manage their own
 * independent scroll — the parent never gets a scrollbar.
 */
export default function App() {
  return (
    <div className="flex h-full bg-[var(--rc-bg)]">
      {/* Fixed-width sidebar with its own independent scroll */}
      <Sidebar routes={routes} />

      {/* Main content — grows to fill remaining width, scrolls independently */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          {routes.map(r => <Route key={r.path} path={r.path} element={r.element} />)}
        </Routes>
      </main>
    </div>
  )
}
