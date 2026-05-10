/**
 * Settings tab — step 3 of the TabForm multi-step form
 *
 * Handles two independent preference groups:
 *
 * Theme (RadioGroup):
 *   Single-select between "light" and "dark".  Uses the RadioGroup compound
 *   component which handles exclusivity internally via its Context.
 *
 * Notifications (Checkboxes):
 *   Two independent boolean flags (email / push) stored as nested object
 *   `formData.notifications`.  `toggleNotification(key, checked)` merges
 *   the changed key back with a spread so the other flag is preserved.
 *
 * No validation is required on this step — all settings have sensible defaults.
 */
import { RadioGroup, RadioOption } from '../../../components/ui/RadioButton/RadioButton'
import Checkbox from '../../../components/ui/Checkbox/Checkbox'
import Typography from '../../../components/ui/Typography/Typography'

export default function Settings({ formData, setFormData }) {
  function toggleNotification(key, checked) {
    setFormData(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: checked },
    }))
  }

  const notifications = formData.notifications ?? { email: true, push: false }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col gap-3">
        <Typography variant="label">Preferred theme</Typography>
        <RadioGroup
          name="theme-group"
          value={formData.theme ?? 'light'}
          onChange={value => setFormData(prev => ({ ...prev, theme: value }))}
          direction="horizontal"
        >
          <RadioOption value="light" label="Light" />
          <RadioOption value="dark" label="Dark" />
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-3">
        <Typography variant="label">Notifications</Typography>
        <Checkbox
          label="Email notifications"
          checked={notifications.email}
          onChange={e => toggleNotification('email', e.target.checked)}
          helperText="Receive updates and summaries via email"
        />
        <Checkbox
          label="Push notifications"
          checked={notifications.push}
          onChange={e => toggleNotification('push', e.target.checked)}
          helperText="Get real-time alerts in your browser"
        />
      </div>

    </div>
  )
}
