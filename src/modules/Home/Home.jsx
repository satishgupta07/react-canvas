/**
 * Home — component showcase / documentation page
 *
 * Renders every UI component inside an <Accordion> so developers can
 * browse props, usage examples, and live demos in one place.
 *
 * Each section is a self-contained file in `./sections/`.  Adding a new
 * component to the showcase only requires:
 *   1. Creating a new `XxxSection.jsx` in sections/
 *   2. Importing and placing it inside the <Accordion> here
 *
 * `defaultOpen="button"` opens the Button section on first render as a
 * landing-page highlight.
 */
import { Accordion } from '../../components/ui/Accordion/Accordion';
import AccordionSection from './sections/AccordionSection';
import ButtonSection from './sections/ButtonSection';
import TypographySection from './sections/TypographySection';
import InputSection from './sections/InputSection';
import CheckboxSection from './sections/CheckboxSection';
import RadioSection from './sections/RadioSection';
import SelectSection from './sections/SelectSection';
import BadgeSection from './sections/BadgeSection';
import AlertSection from './sections/AlertSection';
import ModalSection from './sections/ModalSection';
import CardSection from './sections/CardSection';
import SpinnerSection from './sections/SpinnerSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--rc-bg)] px-8 py-10 text-[var(--rc-text)]">
      <div className="max-w-3xl">

        <header className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            React Canvas
          </h1>
          <p className="text-sm text-[var(--rc-muted)] leading-relaxed max-w-lg">
            A collection of reusable UI components built with Tailwind CSS and CSS variables — fully theme-aware.
            Each section below includes the import path, available props, and a usage example.
          </p>
        </header>

        <Accordion defaultOpen="button">
          <AccordionSection />
          <TypographySection />
          <ButtonSection />
          <InputSection />
          <CheckboxSection />
          <RadioSection />
          <SelectSection />
          <BadgeSection />
          <AlertSection />
          <ModalSection />
          <CardSection />
          <SpinnerSection />
        </Accordion>

      </div>
    </div>
  );
}
