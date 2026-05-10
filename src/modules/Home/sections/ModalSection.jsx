/** Modal showcase — standard modal with form fields, and a small confirm/delete dialog. */
import { useState } from 'react';
import { AccordionItem } from '../../../components/ui/Accordion/Accordion';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import Modal from '../../../components/ui/Modal/Modal';
import Typography from '../../../components/ui/Typography/Typography';
import { Row, CodeBlock, DemoLabel } from '../helpers';

export default function ModalSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <AccordionItem id="modal" title="Modal" description="portal · backdrop · Esc to close · footer slot">
      <Typography variant="muted">
        Accessible dialog rendered into <Typography variant="code">document.body</Typography> via a portal.
        Closes on backdrop click or <kbd className="text-xs bg-[var(--rc-elevated)] border border-[var(--rc-border)] rounded px-1">Esc</kbd>.
        Pass a <Typography variant="code">footer</Typography> prop for action buttons.
      </Typography>

      <CodeBlock>{`import Modal from '../../components/ui/Modal/Modal';`}</CodeBlock>

      <CodeBlock>{`// Props
// isOpen    boolean    — controls visibility (required)
// onClose   () => void — called on backdrop click or Esc (required)
// title     string     — heading shown in the modal header
// size      'sm' | 'md' | 'lg' | 'xl' | 'full'               default: 'md'
// footer    ReactNode  — content rendered in the modal footer (buttons etc.)
// className string
// children  ReactNode  — modal body content

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Edit Profile"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Save Changes</Button>
    </>
  }
>
  <Input label="Display Name" placeholder="John Doe" />
</Modal>`}</CodeBlock>

      <DemoLabel />
      <Row>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Button variant="outline" onClick={() => setConfirmOpen(true)}>Confirm Dialog</Button>
      </Row>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Edit Profile"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Save Changes</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Display Name" placeholder="John Doe" />
          <Input label="Email" type="email" placeholder="john@example.com" />
          <Input label="Bio" type="textarea" placeholder="Tell us about yourself…" rows={3} />
        </div>
      </Modal>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete account?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setConfirmOpen(false)}>Delete</Button>
          </>
        }
      >
        <Typography variant="muted">
          This action is permanent and cannot be undone. All your data will be removed.
        </Typography>
      </Modal>
    </AccordionItem>
  );
}
