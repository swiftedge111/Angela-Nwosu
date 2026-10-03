import Image from "next/image";
import portrait from "@/assets/angie-portrait.webp";

/** Angie's letter, word for word from the original site. */
export function AngieNote({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div className="relative mx-auto w-full max-w-md">
        <div aria-hidden className="absolute -inset-3 rounded-t-full rounded-b-[2.5rem] border border-brass/40" />
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-sand">
          <Image
            src={portrait}
            alt="Angela Nwosu smiling, holding strands of beads"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 28rem, 90vw"
            className="object-cover object-[50%_20%]"
          />
        </div>
      </div>

      <div>
        <p className="eyebrow text-brass">A special note from Angie</p>
        <Heading className="mt-5 font-display text-4xl leading-[1.08] font-medium text-balance text-forest-900 md:text-[3.25rem]">
          Nothing that is aligned reaches you by accident.
        </Heading>
        <div className="mt-8 space-y-5 text-[0.98rem] leading-relaxed text-muted">
          <p>You are here because your time has come! It&apos;s your time for clarity, success, and positivity!</p>
          <p>
            Well-being comes from living in right relationship with the earth beneath our feet, the air that carries our
            prayers, the fire that transforms, and the waters that cleanse and renew. When this balance is disturbed, life
            feels heavy, delayed, or closed. When it is restored, the way forward opens naturally.
          </p>
          <p>
            My work follows these ancestral understandings. Every ritual kit, herb, and fortified item is prepared in
            respect of natural law and spiritual order. These are not ordinary items; they are supports for alignment,
            clearing, and steady movement forward.
          </p>
          <p>
            I prepare each piece personally, with minimal handling, focused intention, and reverence for the elements
            involved. Nothing is rushed. Nothing is interfered with. What you receive has been worked with carefully, so
            its purpose remains clear and undisturbed.
          </p>
        </div>
        <p className="mt-8 border-l-2 border-brass/50 pl-5 font-display text-2xl leading-snug text-forest-800 italic">
          May what you receive help return you to balance.
          <br />
          May the elements support your steps.
          <br />
          May your path open as it is meant to.
        </p>
        <div className="mt-8">
          <p className="text-sm font-semibold text-brass">With love and intention,</p>
          <p className="-mt-1 font-script text-6xl text-forest-700">Angie</p>
        </div>
      </div>
    </div>
  );
}
