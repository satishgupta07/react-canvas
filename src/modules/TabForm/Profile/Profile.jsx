/**
 * Profile tab — step 1 of the TabForm multi-step form
 *
 * Validation strategy:
 * - `handleChange` calls `clearError(name)` so the error disappears as soon
 *   as the user starts correcting a field (immediate positive feedback).
 * - `handleBlur` calls `setError(name, msg)` when a required field is left
 *   empty or invalid, giving feedback when the user leaves a field blank.
 *
 * This two-function approach (`clearError` + `setError`) avoids the common
 * pitfall of either:
 *   a) showing errors too eagerly on first touch, or
 *   b) never clearing errors once they appear.
 *
 * Both functions are passed down from TabForm so that TabForm's validation
 * and the inline field validation share the same `errors` state object.
 */
import Input from '../../../components/ui/Input/Input'

export default function Profile({ formData, setFormData, errors, clearError, setError }) {
  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    clearError(name)
  }

  function handleBlur(e) {
    const { name, value } = e.target
    if (name === 'name') {
      if (!value.trim()) setError('name', 'Name is required')
      else if (value.trim().length < 3) setError('name', 'Min 3 characters')
    }
    if (name === 'age') {
      if (!value) setError('age', 'Age is required')
      else if (value < 18 || value > 100) setError('age', 'Must be 18–100')
    }
    if (name === 'email') {
      if (!value.trim()) setError('email', 'Email is required')
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) setError('email', 'Invalid email')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Name"
        name="name"
        placeholder="John Doe"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors?.name}
        required
      />
      <Input
        label="Age"
        type="number"
        name="age"
        placeholder="25"
        value={formData.age}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors?.age}
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="john@example.com"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors?.email}
        required
      />
    </div>
  )
}
