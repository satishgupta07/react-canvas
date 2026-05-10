/** Card showcase — basic, with header actions, hoverable, and footer-slot variants. */
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import Button from '../../../components/ui/Button/Button';
import Card from '../../../components/ui/Card/Card';
import Typography from '../../../components/ui/Typography/Typography';
import { CodeBlock, DemoLabel, PlusIcon } from '../helpers';

export default function CardSection() {
  return (
    <AccordionItem id="card" title="Card" description="title · subtitle · actions · footer · hoverable">
      <Typography variant="muted">
        Surface container with an optional header (title + subtitle + action slot) and footer.
        Enable <Typography variant="code">hoverable</Typography> for interactive card styles.
      </Typography>

      <CodeBlock>{`import Card from '../../components/ui/Card/Card';`}</CodeBlock>

      <CodeBlock>{`// Props
// title     string     — heading in the card header
// subtitle  string     — secondary text below the title
// actions   ReactNode  — rendered in the top-right of the header (buttons, menus…)
// footer    ReactNode  — content rendered below the body with a divider
// hoverable boolean    — adds hover border/shadow effect                default: false
// className string
// children  ReactNode  — card body

<Card
  title="Recent Activity"
  subtitle="Last 7 days"
  actions={<Button size="sm" variant="outline">View all</Button>}
  hoverable
>
  <p className="text-sm">Card body content goes here.</p>
</Card>`}</CodeBlock>

      <DemoLabel />
      <div className="grid grid-cols-2 gap-4">
        <Card title="Basic card" subtitle="Simple content container">
          <Typography variant="muted">Cards can hold any content. Use them to group related information.</Typography>
        </Card>
        <Card
          title="With actions"
          subtitle="Header supports action slots"
          actions={<Button size="sm" variant="outline" leftIcon={<PlusIcon />}>Add</Button>}
        >
          <Typography variant="muted">Action buttons appear in the card header area.</Typography>
        </Card>
        <Card title="Hoverable" subtitle="Hover to see the effect" hoverable>
          <Typography variant="muted">Useful for clickable list items or dashboards.</Typography>
        </Card>
        <Card
          title="With footer"
          footer={
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost">Cancel</Button>
              <Button size="sm">Confirm</Button>
            </div>
          }
        >
          <Typography variant="muted">Footer is great for card-level actions.</Typography>
        </Card>
      </div>
    </AccordionItem>
  );
}
