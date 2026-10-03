export const intentions = ["Protection", "Stability", "Attraction", "Clarity", "Progress"];

export function IntentionMarquee() {
  const row = (hidden?: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {[...intentions, ...intentions].map((word, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 font-display text-3xl text-forest-800 italic md:text-4xl">{word}</span>
          <span className="text-brass">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-b border-forest-900/10 bg-sand py-6">
      <div className="flex w-max animate-marquee">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
