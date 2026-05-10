/** RadioButton showcase — two independent RadioGroups (vertical and horizontal layout). */
import { useState } from 'react';
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import { RadioGroup, RadioOption } from '../../../components/ui/RadioButton/RadioButton';
import Typography from '../../../components/ui/Typography/Typography';
import { CodeBlock, DemoLabel } from '../helpers';

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];

export default function RadioSection() {
  const [vertical, setVertical] = useState('react');
  const [horizontal, setHorizontal] = useState('react');

  return (
    <AccordionItem id="radio" title="Radio Button" description="RadioGroup + RadioOption · vertical & horizontal">
      <Typography variant="muted">
        Compound component: wrap <Typography variant="code">RadioOption</Typography>s inside a{' '}
        <Typography variant="code">RadioGroup</Typography> to get a labelled, accessible radio set.
        Supports vertical (default) and horizontal layouts.
      </Typography>

      <CodeBlock>{`import { RadioGroup, RadioOption } from '../../components/ui/RadioButton/RadioButton';`}</CodeBlock>

      <CodeBlock>{`// RadioGroup props
// name       string     — shared HTML name for the radio inputs (required)
// value      string     — controlled selected value
// onChange   (value: string) => void
// label      string     — group legend shown above the options
// direction  'vertical' | 'horizontal'                                  default: 'vertical'

// RadioOption props
// value      string     — option value (required)
// label      string     — visible label
// disabled   boolean

<RadioGroup name="theme" value={theme} onChange={setTheme} label="Preferred theme">
  <RadioOption value="light" label="Light" />
  <RadioOption value="dark"  label="Dark"  />
  <RadioOption value="system" label="System" disabled />
</RadioGroup>`}</CodeBlock>

      <DemoLabel />
      <div className="grid grid-cols-2 gap-6">
        <RadioGroup name="framework" value={vertical} onChange={setVertical} label="Favourite framework">
          {frameworks.map(f => <RadioOption key={f.value} value={f.value} label={f.label} />)}
        </RadioGroup>
        <RadioGroup name="direction" value={horizontal} onChange={setHorizontal} label="Horizontal layout" direction="horizontal">
          {frameworks.slice(0, 3).map(f => <RadioOption key={f.value} value={f.value} label={f.label} />)}
        </RadioGroup>
      </div>
      <Typography variant="caption">
        Selected: <span className="text-purple-400">{vertical}</span>
      </Typography>
    </AccordionItem>
  );
}
