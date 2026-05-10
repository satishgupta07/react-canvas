/** Select showcase — basic, disabled, and with-error variants; live error clears on selection. */
import { useState } from 'react';
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import Select from '../../../components/ui/Select/Select';
import Typography from '../../../components/ui/Typography/Typography';
import { CodeBlock, DemoLabel } from '../helpers';

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];

export default function SelectSection() {
  const [value, setValue] = useState('');
  const [errValue, setErrValue] = useState('');

  return (
    <AccordionItem id="select" title="Select" description="native select · option array · error & helper">
      <Typography variant="muted">
        Native <Typography variant="code">&lt;select&gt;</Typography> styled to match the design system.
        Accepts an array of <Typography variant="code">{`{ value, label }`}</Typography> option objects.
      </Typography>

      <CodeBlock>{`import Select from '../../components/ui/Select/Select';`}</CodeBlock>

      <CodeBlock>{`// Props
// label       string                               — visible label above the field
// options     { value: string; label: string }[]  — option list (required)
// value       string                               — controlled value
// onChange    ChangeEventHandler
// placeholder string                               — disabled first option shown as hint
// error       string                               — red border + error message
// helperText  string                               — subtle hint below the field
// disabled    boolean
// className   string

const options = [
  { value: 'react',  label: 'React'   },
  { value: 'vue',    label: 'Vue'     },
  { value: 'svelte', label: 'Svelte'  },
];

<Select
  label="Framework"
  options={options}
  value={val}
  onChange={e => setVal(e.target.value)}
  placeholder="Choose one…"
  helperText="Pick your preferred framework"
/>`}</CodeBlock>

      <DemoLabel />
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Framework"
          options={frameworks}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Choose one…"
          helperText="Pick your preferred framework"
        />
        <Select label="Disabled" options={frameworks} value="react" disabled onChange={() => { }} />
        <Select
          label="With error"
          options={frameworks}
          value={errValue}
          placeholder="Choose one…"
          error={errValue ? '' : 'Please select an option'}
          onChange={e => setErrValue(e.target.value)}
        />
      </div>
    </AccordionItem>
  );
}
