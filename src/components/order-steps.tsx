import { liveChatEnabled } from "@/lib/live-chat";

const channels = liveChatEnabled ? "WhatsApp, live chat or email" : "WhatsApp or email";

export const orderSteps = [
  {
    title: "Choose what you need",
    body: "Add your items to the bag. All prices are in US dollars.",
  },
  {
    title: "Send your order",
    body: `Send your order to us on ${channels} in one tap. No account or password needed.`,
  },
  {
    title: "We confirm and prepare",
    body: "We confirm shipping to your location and how to pay. Then your items are prepared personally, with intention.",
  },
];

export function OrderSteps({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {orderSteps.map((step, i) => (
        <li
          key={step.title}
          className={`rounded-[1.75rem] p-7 ${light ? "bg-ivory/[0.06] ring-1 ring-ivory/10" : "bg-white ring-1 ring-forest-900/5"}`}
        >
          <span className={`font-display text-5xl italic ${light ? "text-brass-light" : "text-brass"}`}>0{i + 1}</span>
          <h3 className={`mt-4 font-display text-2xl ${light ? "text-ivory" : "text-forest-900"}`}>{step.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${light ? "text-sage-200" : "text-muted"}`}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
