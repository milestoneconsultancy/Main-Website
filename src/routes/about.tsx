import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Target, Eye, Gem, Compass, Building2, HeartHandshake, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";
import { company } from "@/config/company";
import { siteUrl } from "@/config/schema";
import aboutImage from "@/assets/about-engineer.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Milestone Consultancy | Civil Construction & PMC Experts` },
      {
        name: "description",
        content:
          "Learn about Milestone Consultancy, Kalyan's civil engineering & PMC consultancy delivering highway, road, and infrastructure projects across Maharashtra.",
      },
      {
        property: "og:title",
        content: `About Milestone Consultancy | Civil Construction & PMC Experts`,
      },
      {
        property: "og:description",
        content:
          "Learn about Milestone Consultancy, Kalyan's civil engineering & PMC consultancy delivering highway, road, and infrastructure projects across Maharashtra.",
      },
      {
        name: "keywords",
        content:
          "About Milestone Consultancy, Project Management Consultancy, Engineering Consultancy, Civil Engineering Consultancy, Construction Management, Highway Consultancy, Infrastructure Consultancy, Building Consultancy, Project Planning, Quantity Surveying, Quality Assurance, Quality Control, Kalyan, Thane, Mumbai Metropolitan Region, Maharashtra, India",
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
      { property: "og:url", content: `${siteUrl}/about` },
      { property: "og:image", content: `${siteUrl}/milestone-logo.jpeg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: `${company.name} - Project Management Consultancy in Kalyan, Maharashtra`,
      },
      { property: "og:site_name", content: company.name },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `About Milestone Consultancy | Civil Construction & PMC Experts`,
      },
      {
        name: "twitter:description",
        content:
          "Learn about Milestone Consultancy, Kalyan's civil engineering & PMC consultancy delivering highway, road, and infrastructure projects across Maharashtra.",
      },
      { name: "twitter:image", content: `${siteUrl}/milestone-logo.jpeg` },
      { name: "twitter:image:alt", content: `${company.name} - Project Management Consultancy` },
    ],
    links: [
      {
        rel: "canonical",
        href: `${siteUrl}/about`,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": "https://milestoneconsultancy.in/about#about-page",
          url: "https://milestoneconsultancy.in/about",
          name: `About ${company.name} | Project Management Consultancy`,
          description:
            "Learn about Milestone Consultancy, a project management consultancy and engineering consultancy firm in Kalyan, Maharashtra. Discover our mission, vision, values, and engineering philosophy for delivering infrastructure, highway, and building projects across India.",
          isPartOf: {
            "@id": "https://milestoneconsultancy.in#website",
          },
          about: {
            "@id": "https://milestoneconsultancy.in#organization",
          },
          publisher: {
            "@id": "https://milestoneconsultancy.in#organization",
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: "https://milestoneconsultancy.in/milestone-logo.jpeg",
            width: 1200,
            height: 630,
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://milestoneconsultancy.in",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About",
                item: "https://milestoneconsultancy.in/about",
              },
            ],
          },
          mainEntity: {
            "@id": "https://milestoneconsultancy.in#organization",
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To deliver measurable value to our clients through disciplined project management, engineering rigour and transparent execution across every project we undertake.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To become a trusted engineering consultancy partner for India's infrastructure growth — recognised for quality, integrity and long-term client outcomes.",
  },
  {
    icon: Gem,
    title: "Core Values",
    body: "Integrity, precision, safety and accountability. We believe great engineering is built on great habits — practised consistently, project after project.",
  },
];

const whyPoints = [
  {
    icon: Compass,
    title: "Structured Delivery",
    body: "Every project is governed by a defined scope, schedule, budget and quality baseline.",
  },
  {
    icon: Building2,
    title: "Engineering Depth",
    body: "Our team brings hands-on experience across highways, bridges, and building works.",
  },
  {
    icon: HeartHandshake,
    title: "Client Partnership",
    body: "We work alongside owners — not around them — with clear communication throughout.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      {/* Intro banner */}
      <section
        className="pt-16 pb-10 lg:pt-24 lg:pb-16 bg-[color:var(--color-brand-navy)] text-white"
        aria-labelledby="about-heading"
      >
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="eyebrow text-[color:var(--color-brand-orange)]">About Us</span>
            <h1
              id="about-heading"
              className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance leading-[1.05]"
            >
              Engineering discipline for India's next generation of infrastructure.
            </h1>
            <p className="mt-6 text-white/75 text-base sm:text-lg max-w-2xl">
              Milestone Consultancy is a project management consultancy based in Kalyan,
              Maharashtra. We support owners, developers and public agencies in delivering highways,
              infrastructure and buildings with engineering precision across the Mumbai Metropolitan
              Region and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24" aria-labelledby="pillars-heading">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)] text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-[color:var(--color-brand-navy)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why + Image */}
      <section className="pb-24" aria-labelledby="why-heading">
        <div className="container-page grid gap-14 lg:grid-cols-2 items-center">
          <img
            src={aboutImage}
            alt="Civil engineer supervising construction site work, reviewing project plans and ensuring quality control for infrastructure development"
            loading="lazy"
            width={1400}
            height={1000}
            className="rounded-2xl object-cover shadow-[var(--shadow-elegant)] w-full aspect-[4/3]"
            decoding="async"
          />
          <div>
            <SectionHeader
              eyebrow="Why Milestone Consultancy"
              title="A partner focused on outcomes, not just deliverables."
              description="We are a consultancy that combines contemporary project management practices with traditional engineering discipline. Our approach is deliberately professional, transparent and outcome-driven, serving clients across government infrastructure projects and private sector developments."
            />
            <div className="mt-8 space-y-5">
              {whyPoints.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="flex gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-brand-orange)]/10 text-[color:var(--color-brand-orange)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[color:var(--color-brand-navy)]">
                        {w.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{w.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="pb-24" aria-labelledby="philosophy-heading">
        <div className="container-page">
          <div className="rounded-3xl bg-muted/50 border border-border p-8 sm:p-14">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <span className="eyebrow">Engineering Philosophy</span>
                <h2
                  id="philosophy-heading"
                  className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-[color:var(--color-brand-navy)] text-balance"
                >
                  Plan carefully. Execute precisely. Sustain relentlessly.
                </h2>
              </div>
              <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
                <p>
                  We believe good project outcomes are the result of good project habits: clear
                  scope, honest measurement, disciplined quality control and open communication.
                </p>
                <p>
                  Our commitment is simple — to earn every client's trust by the quality of our
                  engineering, the clarity of our reporting and the reliability of our delivery
                  across highway, infrastructure and building projects.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white"
                  >
                    <Link to="/services">
                      Explore Our Services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-[color:var(--color-brand-navy)]/30 text-[color:var(--color-brand-navy)] hover:bg-[color:var(--color-brand-navy)] hover:text-white"
                  >
                    <Link to="/projects">View Project Portfolio</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
