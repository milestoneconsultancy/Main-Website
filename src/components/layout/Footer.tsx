import { Link } from "@tanstack/react-router";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/config/company";
import { primaryNav } from "@/config/navigation";
import { services } from "@/config/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-[color:var(--color-brand-navy)] text-white">
      <div className="container-page py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={company.brand.logoSrc}
              alt={company.brand.logoAlt}
              className="h-12 w-12 rounded-md bg-white/95 object-contain p-1"
            />
            <div className="leading-tight">
              <div className="font-display font-semibold">Milestone</div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">Consultancy</div>
            </div>
          </Link>
          <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-xs">
            {company.shortDescription}
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white/90">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3">
            {primaryNav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="text-sm text-white/70 hover:text-[color:var(--color-brand-orange)] transition"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white/90">
            Services
          </h4>
          <ul className="mt-5 space-y-3">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services"
                  className="text-sm text-white/70 hover:text-[color:var(--color-brand-orange)] transition"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white/90">
            Contact
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-white/80">
            <li className="flex gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-[color:var(--color-brand-orange)]" />
              <span>
                {company.address.line1}
                <br />
                {company.address.line2}
                <br />
                {company.address.country}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 mt-0.5 text-[color:var(--color-brand-orange)]" />
              <a
                href={company.contact.phoneHref}
                className="hover:text-white"
                aria-label={`Call us at ${company.contact.phone}`}
              >
                {company.contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-[color:var(--color-brand-orange)]" />
              <a
                href={company.contact.emailHref}
                className="hover:text-white break-all"
                aria-label={`Email us at ${company.contact.email}`}
              >
                {company.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">
            © {year} {company.legalName}. All rights reserved.
          </p>
          <button
            onClick={() =>
              typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top of page"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-orange)]"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
