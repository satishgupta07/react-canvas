/** Button showcase — variant grid, size grid, icon slots, loading state demo. */
import { useState } from 'react';
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import Button from '../../../components/ui/Button/Button';
import Typography from '../../../components/ui/Typography/Typography';
import { Row, CodeBlock, DemoLabel, SearchIcon, PlusIcon } from '../helpers';

export default function ButtonSection() {
  const [loading, setLoading] = useState(false);

  const simulateLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <AccordionItem id="button" title="Button" description="6 variants · 3 sizes · icons · loading state">
      <Typography variant="muted">
        General-purpose button with six semantic variants, three sizes, icon slots, a loading state, and a full-width mode.
      </Typography>

      <CodeBlock>{`import Button from '../../components/ui/Button/Button';`}</CodeBlock>

      <CodeBlock>{`// Props
// variant   'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost'  default: 'primary'
// size      'sm' | 'md' | 'lg'                                                     default: 'md'
// leftIcon  ReactNode  — icon rendered before the label
// rightIcon ReactNode  — icon rendered after the label
// loading   boolean    — shows a spinner and disables the button                   default: false
// disabled  boolean                                                                default: false
// fullWidth boolean    — stretches button to 100% width                            default: false
// onClick   () => void
// className string

<Button variant="primary" size="md" onClick={handleClick}>
  Save Changes
</Button>

<Button variant="outline" leftIcon={<SearchIcon />} loading={isLoading}>
  Search
</Button>`}</CodeBlock>

      <DemoLabel />
      <div className="flex flex-col gap-3">
        <Typography variant="caption">Variants</Typography>
        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </Row>

        <Typography variant="caption" className="mt-1">Sizes</Typography>
        <Row>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>

        <Typography variant="caption" className="mt-1">States &amp; icons</Typography>
        <Row>
          <Button leftIcon={<PlusIcon />}>With Icon</Button>
          <Button rightIcon={<SearchIcon />} variant="outline">Search</Button>
          <Button loading={loading} onClick={simulateLoad}>
            {loading ? 'Saving…' : 'Click to Load'}
          </Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" fullWidth className="max-w-xs">Full Width</Button>
        </Row>
      </div>
    </AccordionItem>
  );
}
