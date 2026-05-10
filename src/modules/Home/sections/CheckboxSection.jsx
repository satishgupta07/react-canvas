/** Checkbox showcase — basic, indeterminate cycle, helper text, error state. */
import { useState } from 'react';
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import Checkbox from '../../../components/ui/Checkbox/Checkbox';
import Typography from '../../../components/ui/Typography/Typography';
import { Row, CodeBlock, DemoLabel } from '../helpers';

export default function CheckboxSection() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [checked, setChecked] = useState(true);
  const [withHelper, setWithHelper] = useState(false);
  const [withError, setWithError] = useState(false);
  const [triState, setTriState] = useState('indeterminate');

  const cycleTriState = () =>
    setTriState(s => s === 'indeterminate' ? 'checked' : s === 'checked' ? 'unchecked' : 'indeterminate');

  return (
    <AccordionItem id="checkbox" title="Checkbox" description="indeterminate state · helper text · error">
      <Typography variant="muted">
        Accessible checkbox built on a hidden native input with a custom visual indicator.
        Supports indeterminate state, helper text, and inline error.
      </Typography>

      <CodeBlock>{`import Checkbox from '../../components/ui/Checkbox/Checkbox';`}</CodeBlock>

      <CodeBlock>{`// Props
// label         string     — text displayed next to the checkbox
// checked       boolean    — controlled checked state
// onChange      ChangeEventHandler
// indeterminate boolean    — renders the dash (−) indeterminate state    default: false
// disabled      boolean
// helperText    string     — subtle hint below the label
// error         string     — red error message below the label
// className     string

<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onChange={e => setAccepted(e.target.checked)}
  helperText="Required to create an account"
/>`}</CodeBlock>

      <DemoLabel />
      <Row>
        <Checkbox label="Accept terms" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} />
        <Checkbox label="Checked" checked={checked} onChange={e => setChecked(e.target.checked)} />
        <Checkbox
          label="Indeterminate"
          indeterminate={triState === 'indeterminate'}
          checked={triState === 'checked'}
          onChange={cycleTriState}
        />
        <Checkbox label="Disabled" disabled onChange={() => { }} />
      </Row>
      <Checkbox
        label="With helper text"
        checked={withHelper}
        onChange={e => setWithHelper(e.target.checked)}
        helperText="We will never share your data."
      />
      <Checkbox
        label="With error"
        checked={withError}
        onChange={e => setWithError(e.target.checked)}
        error={withError ? '' : 'You must accept the terms to continue.'}
      />
    </AccordionItem>
  );
}
