// src/components/careers/CareerValueStrip.tsx
import { TrendingUp, Users, HardHat, HeartHandshake } from "lucide-react";

export function CareerValueStrip() {
  const items = [
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Build a long-term career",
    },
    {
      icon: Users,
      title: "Professional Environment",
      description: "Work with industry experts",
    },
    {
      icon: HardHat,
      title: "Meaningful Impact",
      description: "Contribute to real-world projects",
    },
    {
      icon: HeartHandshake,
      title: "Equal Opportunities",
      description: "We value talent and diversity",
    },
  ];

  return (
    <section className="relative z-10 -mt-8 mx-auto max-w-6xl px-4 sm:px-6">
      <div className="rounded-2xl border border-border/80 bg-white p-4 sm:p-6 shadow-[var(--shadow-soft)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-3.5 ${idx > 0 ? "pt-3.5 sm:pt-0 sm:pl-4" : ""}`}
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)]/5 text-[color:var(--color-brand-navy)]">
                  <Icon className="h-5 w-5 text-[color:var(--color-brand-navy)]" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-[color:var(--color-brand-navy)]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
