export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  children?: React.ReactNode;
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-6 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-xl"}>
        {eyebrow && <p className={`eyebrow ${tone === "light" ? "text-brass-light" : "text-brass"}`}>{eyebrow}</p>}
        <h2
          className={`mt-4 font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance md:text-5xl ${
            tone === "light" ? "text-ivory" : "text-forest-900"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p className={`mt-5 text-base leading-relaxed md:text-lg ${tone === "light" ? "text-sage-200" : "text-muted"}`}>
            {intro}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
