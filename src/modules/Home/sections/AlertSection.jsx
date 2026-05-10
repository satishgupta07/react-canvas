/** Alert showcase — all 4 severity variants plus a dismissible example. */
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import Alert from '../../../components/ui/Alert/Alert';
import Typography from '../../../components/ui/Typography/Typography';
import { CodeBlock, DemoLabel } from '../helpers';

export default function AlertSection() {
  return (
    <AccordionItem id="alert" title="Alert" description="success · error · warning · info · dismissible">
      <Typography variant="muted">
        Contextual feedback banner. Supports four severity levels, an optional title, and a dismissible close button.
        Dismissing hides the component locally — manage visibility externally via <Typography variant="code">onDismiss</Typography> if needed.
      </Typography>

      <CodeBlock>{`import Alert from '../../components/ui/Alert/Alert';`}</CodeBlock>

      <CodeBlock>{`// Props
// variant     'success' | 'error' | 'warning' | 'info'  default: 'info'
// title       string    — bold heading line (optional)
// dismissible boolean   — shows a × close button         default: false
// onDismiss   () => void — called after the alert hides
// className   string
// children    ReactNode — body content

<Alert variant="warning" title="Approaching limit" dismissible onDismiss={() => refetch()}>
  You have used 90% of your monthly quota.
</Alert>

<Alert variant="success" title="Saved">
  Your changes have been published.
</Alert>`}</CodeBlock>

      <DemoLabel />
      <div className="flex flex-col gap-3">
        <Alert variant="success" title="Changes saved">Your profile has been updated successfully.</Alert>
        <Alert variant="error" title="Something went wrong">Could not connect to the server. Please try again.</Alert>
        <Alert variant="warning" title="Approaching limit">You have used 90% of your monthly quota.</Alert>
        <Alert variant="info" title="New feature available">Check out the new dashboard analytics tab.</Alert>
        <Alert variant="info" dismissible title="Dismissible alert">Click × to dismiss this notification.</Alert>
      </div>
    </AccordionItem>
  );
}
