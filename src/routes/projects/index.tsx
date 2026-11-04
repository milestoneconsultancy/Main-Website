import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, FileCheck, HardHat } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/config/projects";
import { company } from "@/config/company";
import { createWebPageSchema, createBreadcrumbSchema, siteUrl } from "@/config/schema";
import heroBg from "@/assets/hero-infrastructure.jpg";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      {
        title: `Infrastructure & Highway Projects Maharashtra | Milestone Consultancy`,
      },
      {
        name: "description",
        content:
          "Explore Milestone Consultancy's highway, road development, white topping, and PMC infrastructure projects executed across Nashik, Kalyan & Maharashtra.",
      },
      {
        name: "keywords",
        content:
          "Milestone Consultancy Projects, Infrastructure Projects Maharashtra, Highway Engineering Nashik, Concrete Road Construction, Bituminous Road Development, White Topping Pavement, PMC Nashik Municipal Corporation, Road Projects Kalyan, Civil Engineering Supervision",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        property: "og:title",
        content: `Infrastructure & Highway Projects Maharashtra | Milestone Consultancy`,
      },
      {
        property: "og:description",
        content:
          "Explore Milestone Consultancy's highway, road development, white topping, and PMC infrastructure projects executed across Nashik, Kalyan & Maharashtra.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: `${siteUrl}/projects`,
      },
      {
        property: "og:image",
        content: `${siteUrl}/milestone-logo.jpeg`,
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: `${company.name} - Infrastructure Projects`,
      },
      { property: "og:site_name", content: company.name },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `Infrastructure & Highway Projects Maharashtra | Milestone Consultancy`,
      },
      {
        name: "twitter:description",
        content:
          "Explore Milestone Consultancy's highway, road development, white topping, and PMC infrastructure projects executed across Nashik, Kalyan & Maharashtra.",
      },
      {
        name: "twitter:image",
        content: `${siteUrl}/milestone-logo.jpeg`,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${siteUrl}/projects`,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            createWebPageSchema({
              id: "projects",
              url: "https://milestoneconsultancy.in/projects",
              name: `Our Projects | ${company.name}`,
              description:
                "Explore Milestone Consultancy's key infrastructure assignments across Maharashtra.",
              type: "CollectionPage",
            }),
            createBreadcrumbSchema("https://milestoneconsultancy.in/projects", [
              {
                name: "Home",
                item: "https://milestoneconsultancy.in",
              },
              {
                name: "Projects",
                item: "https://milestoneconsultancy.in/projects",
              },
            ]),
          ],
        }),
      },
    ],
  }),
  component: ProjectsListingPage,
});

function ProjectsListingPage() {
  return (
    <SiteLayout>
      {/* 1. Hero Section - Sleek, Compact & Properly Fitted */}
      <section
        className="relative isolate overflow-hidden bg-[color:var(--color-brand-navy)] text-white"
        aria-labelledby="projects-hero-heading"
      >
        {/* Background Image with Layered Gradient Overlay */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={heroBg}
            alt="Infrastructure construction and road development across Maharashtra"
            className="h-full w-full object-cover object-center opacity-25"
            width={1920}
            height={480}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-brand-navy)] via-[color:var(--color-brand-navy)]/95 to-[color:var(--color-brand-blue)]/85" />
        </div>

        <div className="container-page py-10 sm:py-12 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-orange)]"
                aria-hidden="true"
              />
              OUR PROJECTS
            </div>

            {/* Main Heading - Clean, Proportional & Fitted */}
            <h1
              id="projects-hero-heading"
              className="mt-3.5 font-display text-2xl sm:text-3xl lg:text-[38px] font-bold leading-tight tracking-tight text-white"
            >
              Transforming Infrastructure{" "}
              <span className="text-[color:var(--color-brand-orange)]">Across Maharashtra</span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-2.5 text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
              Delivering professional project management, technical supervision and execution
              support across road and infrastructure projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Featured Projects Grid */}
      <section
        className="pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 bg-background"
        aria-labelledby="featured-projects-heading"
      >
        <div className="container-page">
          {/* Section Header */}
          <div className="max-w-2xl mb-8 lg:mb-10">
            <span className="eyebrow text-[color:var(--color-brand-orange)]">
              FEATURED PROJECTS
            </span>
            <h2
              id="featured-projects-heading"
              className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--color-brand-navy)]"
            >
              Our Key Projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Selected infrastructure assignments managed with technical precision and professional
              project oversight. Explore our{" "}
              <Link
                to="/services"
                className="font-semibold text-[color:var(--color-brand-orange)] hover:underline"
              >
                civil engineering and PMC consultancy services
              </Link>{" "}
              supporting public and private infrastructure across Maharashtra.
            </p>
          </div>

          {/* 3-Column Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Project Impact / Trust Statement Section */}
      <section
        className="py-20 bg-muted/40 border-y border-border/80"
        aria-labelledby="impact-heading"
      >
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow text-[color:var(--color-brand-orange)]">
              STANDARDS & DISCIPLINE
            </span>
            <h2
              id="impact-heading"
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[color:var(--color-brand-navy)] text-balance"
            >
              Technical Expertise.
              <br />
              Project Discipline.
              <br />
              <span className="text-[color:var(--color-brand-orange)]">
                Infrastructure That Moves.
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Milestone Consultancy bridges technical specifications and on-site realities, ensuring
              that highway and urban road assets are engineered for durability, safety, and
              accountability.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)] text-white">
                <ShieldCheck className="h-6 w-6 text-[color:var(--color-brand-orange)]" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[color:var(--color-brand-navy)]">
                Quality Assurance
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                Rigorous materials testing, slump checks, asphalt compaction control, and strict
                compliance with IRC and MORTH standards.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)] text-white">
                <FileCheck className="h-6 w-6 text-[color:var(--color-brand-orange)]" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[color:var(--color-brand-navy)]">
                Billing & Measurements
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                Independent quantity surveying, joint measurement sheets, and audit-ready
                verification for interim and running account claims.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)] text-white">
                <HardHat className="h-6 w-6 text-[color:var(--color-brand-orange)]" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[color:var(--color-brand-navy)]">
                Supervision & Safety
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                Continuous on-site resident engineering, traffic diversion monitoring, and periodic
                reporting to client authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact CTA Section */}
      <section className="py-20 lg:py-24 bg-background" aria-labelledby="cta-heading">
        <div className="container-page">
          <div className="rounded-3xl bg-[color:var(--color-brand-navy)] p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
            <div
              className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[color:var(--color-brand-orange)]/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-2xl">
              <span className="eyebrow text-[color:var(--color-brand-orange)]">
                PARTNER WITH US
              </span>
              <h2
                id="cta-heading"
                className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
              >
                Have a Project in Mind?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
                Let's discuss how Milestone Consultancy can support your next infrastructure project
                with disciplined project management, QA/QC oversight, and engineering excellence.
              </p>
              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[color:var(--color-brand-orange)] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[color:var(--color-brand-orange)]/90 hover:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
