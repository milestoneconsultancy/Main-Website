import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { company } from "@/config/company";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-border shadow-[var(--shadow-soft)]"
          : "bg-white/60 backdrop-blur-sm",
      )}
    >
      {/* Full width container with minimal padding */}
      <div className="flex h-28 items-center justify-between w-full px-0 sm:px-0">
        {/* Logo - 100% Left Edge with small padding */}
        <Link
          to="/"
          className="flex items-center gap-4 flex-shrink-0 ml-0 pl-2 sm:pl-4"
          aria-label={company.name}
        >
          <img
            src={company.brand.logoSrc}
            alt={company.brand.logoAlt}
            className="h-[108px] w-[108px] rounded-md object-contain"
            width={108}
            height={108}
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-[24px] font-bold tracking-tight text-[color:var(--color-brand-navy)]">
              Milestone Consultancy
            </span>
            <span className="text-[14px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Plan · Execute · Sustain
            </span>
          </div>
        </Link>

        {/* Navigation - Right side with spacing */}
        <div className="flex items-center gap-2 sm:gap-4 pr-2 sm:pr-4">
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {primaryNav.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative px-4 py-2.5 text-[15px] font-bold text-black transition-colors",
                    active ? "text-black" : "text-black/70 hover:text-black",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-4 right-4 h-0.5 rounded-full bg-[color:var(--color-brand-orange)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Get in Touch Button */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Button
              asChild
              className="bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white rounded-full px-6 py-3 text-[15px]"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-nav-toggle"
            className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-md border border-border flex-shrink-0 mr-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-orange)]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          id="mobile-navigation"
          role="region"
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-border bg-white"
        >
          <div className="flex flex-col gap-2 py-5 px-4">
            {primaryNav.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "px-4 py-4 rounded-md text-[16px] font-bold text-black",
                    active
                      ? "bg-muted text-black"
                      : "text-black/80 hover:bg-muted hover:text-black",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Button
              asChild
              className="mt-3 bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white rounded-full py-3 text-[15px]"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
