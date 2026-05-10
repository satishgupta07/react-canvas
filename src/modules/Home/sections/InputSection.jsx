/** Input showcase — text, password, email with live error, disabled, required, textarea. */
import { useState } from 'react';
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import Input from '../../../components/ui/Input/Input';
import Typography from '../../../components/ui/Typography/Typography';
import { CodeBlock, DemoLabel, SearchIcon } from '../helpers';

export default function InputSection() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [textarea, setTextarea] = useState('');
  const [email, setEmail] = useState('invalid-email');
  const [emailTouched, setEmailTouched] = useState(false);

  const emailError = emailTouched && !email
    ? 'Email is required'
    : email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Enter a valid email address'
      : '';

  return (
    <AccordionItem id="input" title="Input" description="text · password · email · number · textarea">
      <Typography variant="muted">
        Flexible text field supporting all common HTML input types plus a multi-line textarea mode.
        Renders an accessible label, helper text, and inline error message.
      </Typography>

      <CodeBlock>{`import Input from '../../components/ui/Input/Input';`}</CodeBlock>

      <CodeBlock>{`// Props
// label       string     — visible label above the field
// type        'text' | 'password' | 'email' | 'number' | 'textarea'   default: 'text'
// placeholder string
// value       string     — controlled value
// onChange    ChangeEventHandler
// error       string     — shows red border + error message
// helperText  string     — subtle hint below the field
// leftIcon    ReactNode  — icon inside the left edge
// disabled    boolean
// required    boolean    — appends * to the label
// rows        number     — textarea row count                           default: 4
// name        string     — HTML name attribute
// className   string

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={e => setEmail(e.target.value)}
  error="Enter a valid email address"
  helperText="We will never share your email."
/>`}</CodeBlock>

      <DemoLabel />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Username"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          helperText="Must be 3–20 characters"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          label="Search"
          placeholder="Search…"
          leftIcon={<SearchIcon />}
          helperText="Type to search"
        />
        <Input
          label="Email (error)"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          error={emailError}
        />
        <Input
          label="Disabled"
          placeholder="Not editable"
          value="Read-only value"
          disabled
        />
        <Input
          label="Required"
          placeholder="This is required"
          required
        />
      </div>
      <Input
        label="Notes"
        type="textarea"
        placeholder="Write something…"
        value={textarea}
        onChange={e => setTextarea(e.target.value)}
        helperText="Supports multiline text"
        rows={3}
      />
    </AccordionItem>
  );
}
