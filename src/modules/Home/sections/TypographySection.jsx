/** Typography showcase — all variants (h1–h4, label, body, muted, caption, code) with the `as` override demo. */
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import Typography from '../../../components/ui/Typography/Typography';
import { CodeBlock, DemoLabel } from '../helpers';

export default function TypographySection() {
  return (
    <AccordionItem id="typography" title="Typography" description="h1–h4 · label · body · muted · caption · code">
      <Typography variant="muted">
        Single component for all text elements. Pass a <Typography variant="code">variant</Typography> to
        control the HTML tag and base styles. Override the tag with the <Typography variant="code">as</Typography> prop,
        and extend styles with <Typography variant="code">className</Typography>.
      </Typography>

      <CodeBlock>{`import Typography from '../../components/ui/Typography/Typography';`}</CodeBlock>

      <CodeBlock>{`// Props
// variant  'h1' | 'h2' | 'h3' | 'h4' | 'label' | 'body' | 'muted' | 'caption' | 'code'
//          default: 'body'
// as       string   — override the rendered HTML element
//          (e.g. variant="h1" as="span" renders <span> with h1 styles)
// className string  — extra Tailwind classes
// children ReactNode
// ...props — forwarded to the underlying element (htmlFor, id, onClick, etc.)

<Typography variant="h1">Page Title</Typography>
<Typography variant="h3">Section Heading</Typography>
<Typography variant="label" htmlFor="email-input">Email address</Typography>
<Typography variant="body">Regular paragraph text.</Typography>
<Typography variant="muted">Subtle secondary text.</Typography>
<Typography variant="caption">12px hint or timestamp</Typography>
<Typography variant="code">const x = 1</Typography>

{/* Override tag — render h2 styles but as a <div> */}
<Typography variant="h2" as="div">Not a real heading</Typography>`}</CodeBlock>

      <DemoLabel />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Typography variant="caption" className="text-purple-400 uppercase tracking-widest">Headings</Typography>
          <Typography variant="h1">Heading 1 — 3xl extrabold</Typography>
          <Typography variant="h2">Heading 2 — 2xl bold</Typography>
          <Typography variant="h3">Heading 3 — xl semibold</Typography>
          <Typography variant="h4">Heading 4 — base semibold</Typography>
        </div>

        <div className="flex flex-col gap-2 border-t border-[var(--rc-border)] pt-4">
          <Typography variant="caption" className="text-purple-400 uppercase tracking-widest">Body & label</Typography>
          <Typography variant="label">Form label (renders as &lt;label&gt;)</Typography>
          <Typography variant="body">
            Body text — regular paragraph at 14px with relaxed line height. Use this for content
            that needs to be readable across light and dark themes.
          </Typography>
          <Typography variant="muted">
            Muted text — same size as body but uses the secondary colour token. Great for helper
            text, descriptions, and subtitles.
          </Typography>
        </div>

        <div className="flex flex-col gap-2 border-t border-[var(--rc-border)] pt-4">
          <Typography variant="caption" className="text-purple-400 uppercase tracking-widest">Utility</Typography>
          <Typography variant="caption">Caption — 12px muted, used for timestamps and hints</Typography>
          <Typography variant="body">
            Inline <Typography variant="code" as="span">code snippet</Typography> rendered inside a paragraph using{' '}
            <Typography variant="code" as="span">as="span"</Typography> to stay inline.
          </Typography>
        </div>
      </div>
    </AccordionItem>
  );
}
