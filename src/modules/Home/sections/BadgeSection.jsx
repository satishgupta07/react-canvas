/** Badge showcase — all 6 variants, 3 sizes, and the dot indicator option. */
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import Badge from '../../../components/ui/Badge/Badge';
import Typography from '../../../components/ui/Typography/Typography';
import { Row, CodeBlock, DemoLabel } from '../helpers';

export default function BadgeSection() {
  return (
    <AccordionItem id="badge" title="Badge" description="6 variants · 3 sizes · dot indicator">
      <Typography variant="muted">
        Inline status indicator. Six semantic color variants, three sizes, and an optional leading dot for presence/status signals.
      </Typography>

      <CodeBlock>{`import Badge from '../../components/ui/Badge/Badge';`}</CodeBlock>

      <CodeBlock>{`// Props
// variant  'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info'  default: 'default'
// size     'sm' | 'md' | 'lg'                                                  default: 'md'
// dot      boolean  — renders a small filled circle before the label           default: false
// className string

<Badge variant="success" size="md">Published</Badge>

<Badge variant="warning" dot>Pending Review</Badge>`}</CodeBlock>

      <DemoLabel />
      <div className="flex flex-col gap-3">
        <Typography variant="caption">Variants</Typography>
        <Row>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </Row>
        <Typography variant="caption">Sizes</Typography>
        <Row>
          <Badge size="sm" variant="primary">Small</Badge>
          <Badge size="md" variant="primary">Medium</Badge>
          <Badge size="lg" variant="primary">Large</Badge>
        </Row>
        <Typography variant="caption">With dot</Typography>
        <Row>
          <Badge dot variant="success">Active</Badge>
          <Badge dot variant="warning">Pending</Badge>
          <Badge dot variant="danger">Offline</Badge>
        </Row>
      </div>
    </AccordionItem>
  );
}
