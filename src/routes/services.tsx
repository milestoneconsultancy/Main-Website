import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";
import { services } from "@/config/services";
import { projects } from "@/config/projects";
import { company } from "@/config/company";
import {
  createWebPageSchema,
  createBreadcrumbSchema,
  serviceSchemas,
  siteUrl,
} from "@/config/schema";
import surveyImage from "@/assets/services-survey.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      {
        title: `Civil Engineering & PMC Consultancy Services | Milestone`,
      },
      {
        name: "description",
        content:
          "Expert civil engineering & PMC consultancy in Maharashtra: highway design, construction management, QA/QC testing, quantity surveying, and site supervision.",
      },
      {
        property: "og:title",
        content: `Civil Engineering & PMC Consultancy Services | Milestone`,
      },
      {
        property: "og:description",
        content:
          "Expert civil engineering & PMC consultancy in Maharashtra: highway design, construction management, QA/QC testing, quantity surveying, and site supervision.",
      },
      {
        name: "keywords",
        content:
          "Project Management Consultancy, PMC Services, Engineering Consultancy, Civil Engineering Consultancy, Construction Management, Highway Consultancy, Infrastructure Consultancy, Building Consultancy, Industrial Consultancy, Quality Assurance, Quality Control, QA QC, Quantity Surveying, Cost Estimation, Project Planning, Project Monitoring, Tender Consultancy, Contract Management, Resident Engineering, Construction Supervision, Engineering Solutions, Kalyan, Thane, Mumbai Metropolitan Region, Maharashtra, India",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: `${siteUrl}/services`,
      },
      {
        property: "og:image",
        content: `${siteUrl}/milestone-logo.jpeg`,
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: `${company.name} - Project Management Consultancy Services`,
      },
      { property: "og:site_name", content: company.name },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `Civil Engineering & PMC Consultancy Services | Milestone`,
      },
      {
        name: "twitter:description",
        content:
          "Expert civil engineering & PMC consultancy in Maharashtra: highway design, construction management, QA/QC testing, quantity surveying, and site supervision.",
      },
      {
        name: "twitter:image",
        content: `${siteUrl}/milestone-logo.jpeg`,
      },
      {
        name: "twitter:image:alt",
        content: `${company.name} - Project Management Consultancy Services`,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${siteUrl}/services`,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            createWebPageSchema({
              id: "services",
              url: "https://milestoneconsultancy.in/services",
              name: `Services | ${company.name} - Project Management Consultancy`,
              description:
                "Explore Milestone Consultancy's project management consultancy and engineering services including PMC, highway engineering, infrastructure consultancy, building consultancy, QA/QC, quantity surveying, cost estimation, project planning, tender consultancy, and contract management.",
              type: "CollectionPage",
            }),

            createBreadcrumbSchema("https://milestoneconsultancy.in/services", [
              {
                name: "Home",
                item: "https://milestoneconsultancy.in",
              },
              {
                name: "Services",
                item: "https://milestoneconsultancy.in/services",
              },
            ]),

            {
              "@type": "ItemList",
              "@id": "https://milestoneconsultancy.in/services#services-list",
              name: "Project Management Consultancy and Engineering Services",
              description:
                "Comprehensive project management and engineering consultancy services for infrastructure, highway, and building projects.",
              numberOfItems: serviceSchemas.length,
              itemListElement: serviceSchemas.map((service, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@id": service["@id"],
                },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section
        className="pt-16 pb-14 lg:pt-24 lg:pb-20 bg-[color:var(--color-brand-navy)] text-white"
        aria-labelledby="services-heading"
      >
        <div className="container-page grid gap-10 lg:grid-cols-2 items-end">
          <div>
            <span className="eyebrow text-[color:var(--color-brand-orange)]">Our Services</span>
            <h1
              id="services-heading"
              className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance leading-[1.05]"
            >
              Civil engineering & PMC services across the project lifecycle.
            </h1>
          </div>
          <p className="text-white/75 text-base sm:text-lg max-w-xl lg:justify-self-end">
            From concept and planning through execution and closeout, we provide the technical and
            management support owners need to deliver complex infrastructure, highway, and building
            projects with confidence.
          </p>
        </div>
      </section>

      <section className="py-24" aria-labelledby="service-list-heading">
        <div className="container-page">
          <h2 id="service-list-heading" className="sr-only">
            Comprehensive Civil Engineering, Highway, and PMC Services
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.04 }}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)] hover:border-[color:var(--color-brand-orange)]/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)]/5 text-[color:var(--color-brand-navy)] group-hover:bg-[color:var(--color-brand-orange)] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-[color:var(--color-brand-navy)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                    {s.description}
                  </p>
                  <div
                    className="mt-5 h-px w-10 bg-[color:var(--color-brand-orange)]"
                    aria-hidden="true"
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proven Field Delivery Cross-Links to Infrastructure Projects */}
      <section className="pb-20" aria-labelledby="proven-delivery-heading">
        <div className="container-page">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <span className="eyebrow text-[color:var(--color-brand-orange)]">
                  Proven Field Delivery
                </span>
                <h2
                  id="proven-delivery-heading"
                  className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[color:var(--color-brand-navy)]"
                >
                  Engineering disciplines proven across Maharashtra's infrastructure.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Our consultancy services are backed by verified field supervision across major
                  state and municipal packages, adhering strictly to Indian Roads Congress (IRC),
                  MoRTH specifications, and IS codes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-[color:var(--color-brand-navy)]/20 text-[color:var(--color-brand-navy)] hover:bg-[color:var(--color-brand-navy)] hover:text-white"
                >
                  <Link to="/projects">
                    View Project Case Studies
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-border/70 pt-6">
              <Link
                to="/projects/$slug"
                params={{
                  slug: projects.find((project) => project.id === "aa-19-maldhakka-road")!.slug,
                }}
                className="group rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:border-[color:var(--color-brand-orange)]/40 hover:bg-muted/40"
              >
                <div className="text-xs font-semibold text-[color:var(--color-brand-orange)]">
                  Highway & Pavement
                </div>
                <div className="mt-1 text-sm font-semibold text-[color:var(--color-brand-navy)] group-hover:underline">
                  Maldhakka Road Pavement Reconstruction →
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Concrete & Bituminous Road Execution
                </div>
              </Link>
              <Link
                to="/projects/$slug"
                params={{
                  slug: projects.find((project) => project.id === "mumbai-naka-trimbak-naka")!.slug,
                }}
                className="group rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:border-[color:var(--color-brand-orange)]/40 hover:bg-muted/40"
              >
                <div className="text-xs font-semibold text-[color:var(--color-brand-orange)]">
                  Urban Infrastructure
                </div>
                <div className="mt-1 text-sm font-semibold text-[color:var(--color-brand-navy)] group-hover:underline">
                  Mumbai Naka White Topping Corridor →
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  High-Strength Concrete Overlay Supervision
                </div>
              </Link>
              <Link
                to="/projects/$slug"
                params={{
                  slug: projects.find((project) => project.id === "nandur-bridge-jatra")!.slug,
                }}
                className="group rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:border-[color:var(--color-brand-orange)]/40 hover:bg-muted/40"
              >
                <div className="text-xs font-semibold text-[color:var(--color-brand-orange)]">
                  Corridor Engineering
                </div>
                <div className="mt-1 text-sm font-semibold text-[color:var(--color-brand-navy)] group-hover:underline">
                  Nandur Bridge to Jatra Hotel Link →
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Freight Corridor & Ghat Approach PMC
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24" aria-labelledby="engagement-heading">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 items-center rounded-3xl overflow-hidden border border-border bg-card">
            <img
              src={surveyImage}
              alt="Quantity surveyor and civil engineer conducting site measurement and survey work for highway infrastructure project"
              loading="lazy"
              width={1400}
              height={900}
              className="h-full w-full object-cover min-h-[320px]"
              decoding="async"
            />
            <div className="p-8 sm:p-12">
              <SectionHeader
                eyebrow="Engagement Model"
                title="Flexible engagement to fit the way you deliver."
                description="Whether you need an embedded resident engineering team, an independent QA/QC framework, or a full PMC across a portfolio of works, we can shape our engagement to your delivery structure."
              />
              <Button
                asChild
                className="mt-8 rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white h-11"
              >
                <Link to="/contact">
                  Discuss your project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
