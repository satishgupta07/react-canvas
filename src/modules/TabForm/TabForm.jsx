/**
 * TabForm module — multi-step form with per-step validation
 *
 * Step flow:  Profile (0) → Interest (1) → Settings (2) → Submitted
 *
 * Validation:
 * - `validate(index)` checks the fields for the given step and returns
 *   an error object.  It also calls `setErrors` so the UI updates.
 * - Moving forward (Next / clicking a later tab) runs validation first;
 *   moving backward always succeeds without validation.
 * - On form submission, the last step is validated before setting `submitted`.
 *
 * Per-field error UX:
 * - `clearError(field)` is passed to each tab component and called on every
 *   `onChange` so errors disappear as the user types.
 * - `setError(field, msg)` is called on `onBlur` when a field is left empty,
 *   giving immediate feedback when the user leaves a required field blank.
 *
 * Submission:
 * - Instead of alert(), a `submitted` state flag renders a Card summary so
 *   the user can review everything they entered.
 * - `handleReset` returns all state to its initial values.
 *
 * Tab step indicators (TabButton):
 * - `isCompleted={i < activeTab}` shows a checkmark for already-passed steps.
 * - `isActive={activeTab === i}` highlights the current step in purple.
 */
import { useState } from 'react'
import Profile from './Profile'
import Interest from './Interest'
import Settings from './Settings'
import TabButton from './TabButton'
import Button from '../../components/ui/Button/Button'
import Alert from '../../components/ui/Alert/Alert'
import Card from '../../components/ui/Card/Card'
import Badge from '../../components/ui/Badge/Badge'
import Typography from '../../components/ui/Typography/Typography'

const tabs = [
  { id: 'profile', label: 'Profile', component: Profile },
  { id: 'interest', label: 'Interest', component: Interest },
  { id: 'settings', label: 'Settings', component: Settings },
]

const initialData = {
  name: '', age: '', email: '',
  interests: [],
  theme: 'light',
  notifications: { email: true, push: false },
}

export default function TabForm() {
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const ActiveComponent = tabs[activeTab].component

  function validate(index = activeTab) {
    const err = {}
    if (index === 0) {
      if (!formData.name.trim()) err.name = 'Name is required'
      else if (formData.name.trim().length < 3) err.name = 'Min 3 characters'
      if (!formData.age) err.age = 'Age is required'
      else if (formData.age < 18 || formData.age > 100) err.age = 'Must be 18–100'
      if (!formData.email.trim()) err.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) err.email = 'Invalid email'
    }
    if (index === 1 && formData.interests.length === 0)
      err.interests = 'Select at least one interest'
    setErrors(err)
    return err
  }

  function goTo(index) {
    if (index < activeTab) { setActiveTab(index); setErrors({}) }
    else if (Object.keys(validate()).length === 0) setActiveTab(index)
  }

  function handleNext() {
    if (Object.keys(validate()).length === 0) setActiveTab(t => t + 1)
  }

  function clearError(field) {
    setErrors(prev => { const next = { ...prev }; delete next[field]; return next })
  }

  function setError(field, message) {
    setErrors(prev => ({ ...prev, [field]: message }))
  }

  function handlePrev() { setActiveTab(t => t - 1); setErrors({}) }

  function handleSubmit() {
    if (Object.keys(validate()).length === 0) setSubmitted(true)
  }

  function handleReset() {
    setFormData(initialData)
    setActiveTab(0)
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--rc-bg)] p-8">
        <Typography variant="h3" className="mb-6">Tab Form</Typography>
        <div className="max-w-sm flex flex-col gap-4">
          <Alert variant="success" title="Submitted successfully!">
            Your profile has been saved. Here's a summary of what you entered.
          </Alert>
          <Card title="Submission summary">
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <Typography variant="muted">Name</Typography>
                <Typography variant="body" className="font-medium">{formData.name}</Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="muted">Age</Typography>
                <Typography variant="body" className="font-medium">{formData.age}</Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="muted">Email</Typography>
                <Typography variant="body" className="font-medium">{formData.email}</Typography>
              </div>
              <div className="flex flex-col gap-1.5">
                <Typography variant="muted">Interests</Typography>
                <div className="flex flex-wrap gap-1.5">
                  {formData.interests.map(i => (
                    <Badge key={i} variant="primary" size="sm">{i}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <Typography variant="muted">Theme</Typography>
                <Badge variant="default" size="sm">{formData.theme}</Badge>
              </div>
              <div className="flex justify-between">
                <Typography variant="muted">Email notifications</Typography>
                <Badge variant={formData.notifications.email ? 'success' : 'default'} size="sm">
                  {formData.notifications.email ? 'On' : 'Off'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <Typography variant="muted">Push notifications</Typography>
                <Badge variant={formData.notifications.push ? 'success' : 'default'} size="sm">
                  {formData.notifications.push ? 'On' : 'Off'}
                </Badge>
              </div>
            </div>
          </Card>
          <Button variant="secondary" onClick={handleReset}>Start over</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--rc-bg)] p-8">
      <Typography variant="h3" className="mb-6">Tab Form</Typography>

      <div role="tablist" className="flex border-b border-[var(--rc-border)] mb-6">
        {tabs.map((tab, i) => (
          <TabButton
            key={tab.id}
            step={i + 1}
            label={tab.label}
            isActive={activeTab === i}
            isCompleted={i < activeTab}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className="max-w-sm">
        <ActiveComponent formData={formData} setFormData={setFormData} errors={errors} clearError={clearError} setError={setError} />
      </div>

      <div className="flex gap-3 mt-8">
        {activeTab > 0 && (
          <Button variant="secondary" onClick={handlePrev}>Previous</Button>
        )}
        {activeTab < tabs.length - 1 && (
          <Button onClick={handleNext}>Next</Button>
        )}
        {activeTab === tabs.length - 1 && (
          <Button variant="success" onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  )
}
