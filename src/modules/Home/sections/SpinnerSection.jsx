/** Spinner showcase — all 5 sizes and all 3 color variants including white-on-dark. */
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Typography from '../../../components/ui/Typography/Typography';
import { Row, CodeBlock, DemoLabel } from '../helpers';

export default function SpinnerSection() {
  return (
    <AccordionItem id="spinner" title="Spinner" description="5 sizes · 3 colors">
      <Typography variant="muted">
        Animated loading indicator. Use inside buttons, overlay loading states, or inline next to text.
      </Typography>

      <CodeBlock>{`import Spinner from '../../components/ui/Spinner/Spinner';`}</CodeBlock>

      <CodeBlock>{`// Props
// size     'xs' | 'sm' | 'md' | 'lg' | 'xl'         default: 'md'
// color    'primary' | 'gray' | 'white'              default: 'primary'
// className string

// Inline loading state
<Spinner size="sm" color="primary" />

// Inside a dark background (use white)
<div className="bg-purple-600 p-2 rounded">
  <Spinner size="md" color="white" />
</div>`}</CodeBlock>

      <DemoLabel />
      <div className="flex flex-col gap-3">
        <Typography variant="caption">Sizes</Typography>
        <Row>
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </Row>
        <Typography variant="caption">Colors</Typography>
        <Row>
          <Spinner color="primary" />
          <Spinner color="gray" />
          <div className="bg-purple-600 rounded p-2"><Spinner color="white" /></div>
        </Row>
      </div>
    </AccordionItem>
  );
}
