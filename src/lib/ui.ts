const variants = {
  primary: "bg-forest-800 text-ivory hover:bg-forest-700 shadow-[0_10px_30px_-12px_rgba(18,40,28,0.6)]",
  light: "bg-ivory text-forest-900 hover:bg-white",
  outline: "border border-forest-800/20 text-forest-900 hover:border-forest-800 hover:bg-forest-800 hover:text-ivory",
  "outline-light": "border border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-forest-900",
  whatsapp: "bg-whatsapp text-forest-950 hover:brightness-95",
  brass: "bg-brass text-white hover:bg-[#967340]",
} as const;

const sizes = {
  sm: "h-10 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-[0.95rem]",
} as const;

export function button(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md") {
  return `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide whitespace-nowrap transition duration-300 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]}`;
}
