/** Accordion showcase — nested demo accordion answering FAQ-style questions about the component. */
import { AccordionItem, Accordion } from '../../../components/ui/Accordion/Accordion';
import Typography from '../../../components/ui/Typography/Typography';
import { CodeBlock, DemoLabel } from '../helpers';

export default function AccordionSection() {
  return (
    <AccordionItem id="accordion" title="Accordion" description="single open · animated · card style">
      <Typography variant="muted">
        Collapsible content panels. Only one item can be open at a time. Built with a CSS grid
        animation trick — no JS height calculations needed. Each item renders as a card with a
        purple accent border when open.
      </Typography>

      <CodeBlock>{`import { Accordion, AccordionItem } from '../../components/ui/Accordion/Accordion';`}</CodeBlock>

      <CodeBlock>{`// Accordion props
// defaultOpen  string | null  — id of the item open on first render   default: null
// className    string

// AccordionItem props
// id           string         — unique identifier (required)
// title        string         — header label (required)
// description  string         — short subtitle shown on the right (optional)
// children     ReactNode      — body content

<Accordion defaultOpen="item-1">
  <AccordionItem id="item-1" title="Getting started" description="setup & install">
    <p>Body content for the first item.</p>
  </AccordionItem>
  <AccordionItem id="item-2" title="Configuration">
    <p>Body content for the second item.</p>
  </AccordionItem>
</Accordion>`}</CodeBlock>

      <DemoLabel />
      <Accordion defaultOpen="a1">
        <AccordionItem id="a1" title="What is React Canvas?" description="overview">
          <Typography variant="muted">
            React Canvas is a collection of reusable UI components built with Tailwind CSS
            and CSS variables. Every component is theme-aware and works in both light and dark mode.
          </Typography>
        </AccordionItem>
        <AccordionItem id="a2" title="How does the accordion animate?" description="CSS grid trick">
          <Typography variant="muted">
            The open/close animation uses <Typography variant="code">grid-template-rows</Typography> transitioning
            from <Typography variant="code">0fr</Typography> to <Typography variant="code">1fr</Typography>.
            No JavaScript height measurements — pure CSS transition.
          </Typography>
        </AccordionItem>
        <AccordionItem id="a3" title="Can multiple items be open?" description="no, single-open only">
          <Typography variant="muted">
            No — clicking an item closes the currently open one. Clicking the active item again
            collapses it. Pass <Typography variant="code">defaultOpen</Typography> to set the initial open item.
          </Typography>
        </AccordionItem>
      </Accordion>
    </AccordionItem>
  );
}
