/**
 * Interest tab — step 2 of the TabForm multi-step form
 *
 * Manages a multi-select list of interests stored as a string array in
 * `formData.interests`.  Checking a box appends the value; unchecking
 * removes it via `.filter()`.
 *
 * Error handling: the "select at least one" error (set by TabForm's
 * `validate()`) is cleared as soon as the user checks any option.
 */
import Checkbox from '../../../components/ui/Checkbox/Checkbox'
import Typography from '../../../components/ui/Typography/Typography'

const options = [
  { value: 'coding', label: 'Coding' },
  { value: 'design', label: 'Design' },
  { value: 'music', label: 'Music' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'movies', label: 'Movies' },
  { value: 'reading', label: 'Reading' },
  { value: 'travel', label: 'Travel' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'photography', label: 'Photography' },
]

export default function Interest({ formData, setFormData, errors, clearError }) {
  const { interests = [] } = formData

  function handleChange(value, checked) {
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(i => i !== value),
    }))
    if (checked) clearError('interests')
  }

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="muted">Select all that apply.</Typography>
      <div className="grid grid-cols-2 gap-2">
        {options.map(opt => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            checked={interests.includes(opt.value)}
            onChange={e => handleChange(opt.value, e.target.checked)}
          />
        ))}
      </div>
      {errors?.interests && (
        <Typography variant="caption" className="text-red-400">{errors.interests}</Typography>
      )}
    </div>
  )
}
