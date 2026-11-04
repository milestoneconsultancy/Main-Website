import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  Users,
  LineChart,
  Wrench,
  MessageSquare,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";
import { services } from "@/config/services";
import { projects } from "@/config/projects";
import { company } from "@/config/company";
import { createWebPageSchema, createBreadcrumbSchema, siteUrl } from "@/config/schema";
import { ProjectCard } from "@/components/projects/ProjectCard";
import heroImage from "@/assets/hero-infrastructure.jpg";
import aboutImage from "@/assets/about-engineer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${company.name} | Project Management Consultancy in Kalyan, Maharashtra`,
      },
      {
        name: "description",
        content:
          "Milestone Consultancy delivers expert project management, civil engineering, highway infrastructure, and QA/QC consultancy across Kalyan, Mumbai & Maharashtra.",
      },
      {
        property: "og:title",
        content: `${company.name} | Project Management Consultancy in Kalyan, Maharashtra`,
      },
      {
        property: "og:description",
        content:
          "Milestone Consultancy delivers expert project management, civil engineering, highway infrastructure, and QA/QC consultancy across Kalyan, Mumbai & Maharashtra.",
      },
      {
        name: "keywords",
        content:
          "Project Management Consultancy, PMC, Engineering Consultancy, Civil Engineering Consultancy, Construction Management, Highway Engineering, Infrastructure Consultancy, Building Consultancy, Quantity Surveying, Cost Estimation, Tender Consultancy, Contract Management, Project Planning, Quality Assurance, QA QC, Kalyan, Thane, Mumbai Metropolitan Region, Maharashtra, India, Government Infrastructure, Private Infrastructure, Engineering Solutions",
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
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: siteUrl,
      },
      {
        property: "og:image",
        content: `${siteUrl}/milestone-logo.jpeg`,
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:alt",
        content: `${company.name} - Project Management Consultancy in Kalyan, Maharashtra`,
      },
      {
        property: "og:site_name",
        content: company.name,
      },
      {
        property: "og:locale",
        content: "en_IN",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: `${company.name} | Project Management Consultancy in Kalyan, Maharashtra`,
      },
      {
        name: "twitter:description",
        content:
          "Milestone Consultancy delivers expert project management, civil engineering, highway infrastructure, and QA/QC consultancy across Kalyan, Mumbai & Maharashtra.",
      },
      {
        name: "twitter:image",
        content: `${siteUrl}/milestone-logo.jpeg`,
      },
      {
        name: "twitter:image:alt",
        content: `${company.name} - Project Management Consultancy`,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: siteUrl,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            createWebPageSchema({
              id: "home",
              url: siteUrl,
              name: `${company.name} | Project Management Consultancy in Kalyan, Maharashtra`,
              description:
                "Milestone Consultancy is a project management consultancy and engineering consultancy firm in Kalyan, Maharashtra, providing civil engineering, construction management, highway engineering, infrastructure consultancy, and quality assurance services for government and private projects across the Mumbai Metropolitan Region.",
            }),
            createBreadcrumbSchema(siteUrl, [
              {
                name: "Home",
                item: siteUrl,
              },
            ]),
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

const whyChooseUs = [
  {
    icon: Compass,
    title: "Professional Approach",
    text: "Structured methodology on every engagement — from kickoff to closeout.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Focus",
    text: "Independent QA/QC frameworks aligned with Indian and international codes.",
  },
  {
    icon: Wrench,
    title: "Technical Expertise",
    text: "Engineering leadership across highways, bridges and infrastructure.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    text: "Clear reporting cadence with owners, contractors and stakeholders.",
  },
  {
    icon: Users,
    title: "Client-Centric Solutions",
    text: "Advisory tuned to each client's contract, risk and delivery model.",
  },
  {
    icon: LineChart,
    title: "Engineering Excellence",
    text: "Disciplined planning, measurement and value engineering as standard.",
  },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt="Aerial view of a modern highway interchange and cable-stayed bridge representing infrastructure engineering and construction management"
            className="h-full w-full object-cover"
            width={1920}
            height={1200}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-brand-navy)]/90 via-[color:var(--color-brand-navy)]/75 to-[color:var(--color-brand-navy)]/30" />
        </div>

        <div className="container-page min-h-[92vh] flex items-center py-28">
          <div className="max-w-3xl text-white">
            <motion.span
              data-aos="fade-up"
              data-aos-delay="0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-orange)]" />
              Project Management Consultancy
            </motion.span>

            <motion.h1
              id="hero-heading"
              data-aos="fade-up"
              data-aos-delay="100"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight text-balance"
            >
              Engineering Tomorrow.
              <span className="block text-[color:var(--color-brand-orange)]">
                Delivering Excellence.
              </span>
            </motion.h1>

            <motion.p
              data-aos="fade-up"
              data-aos-delay="200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/85"
            >
              Project Management Consultancy delivering highway, infrastructure and building
              projects with engineering precision to create sustainable structures across the Mumbai
              Metropolitan Region and Maharashtra.
            </motion.p>

            <motion.div
              data-aos="fade-up"
              data-aos-delay="300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white px-7 h-12 text-[15px]"
              >
                <Link to="/services">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-7 text-[15px] bg-transparent border-white/40 text-white hover:bg-white hover:text-[color:var(--color-brand-navy)]"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[color:var(--color-brand-navy)]/60 backdrop-blur"
          aria-hidden="true"
        >
          <div className="container-page grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {["Highway Engineering", "Infrastructure", "Building Consultancy", "QA / QC"].map(
              (t) => (
                <div key={t} className="py-5 px-4 text-center md:text-left">
                  <span className="text-xs uppercase tracking-[0.18em] text-white/60">
                    Practice
                  </span>
                  <div className="mt-1 text-sm font-medium text-white">{t}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* WHO WE ARE - Updated with Larger Mission, Vision, Values */}
      <section id="who-we-are" className="py-24 lg:py-32" aria-labelledby="who-we-are-heading">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
          <motion.div {...fadeUp} data-aos="fade-right" data-aos-delay="100" className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-[color:var(--color-brand-navy)]/10 to-[color:var(--color-brand-orange)]/10" />
            <div className="rounded-2xl shadow-[var(--shadow-elegant)] overflow-hidden aspect-[4/3]">
              <img
                src={aboutImage}
                alt="Civil engineer reviewing construction drawings and project plans at an infrastructure development site"
                loading="lazy"
                width={1400}
                height={1000}
                className="h-full w-full object-cover object-[center_15%]"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div {...fadeUp} data-aos="fade-left" data-aos-delay="200">
            <SectionHeader
              eyebrow="Who We Are"
              title="A consultancy built on engineering rigour and delivery discipline."
              description="Milestone Consultancy is a Project Management Consultancy focused on highways, infrastructure and building works across India. We support owners and developers with independent engineering, quality assurance and structured project delivery."
            />

            {/* ✅ Updated Mission, Vision, Values - Motha ani Visible */}
            <div className="mt-10 grid sm:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  label: "Mission",
                  body: "Deliver measurable value through disciplined project management.",
                  icon: "🎯",
                },
                {
                  label: "Vision",
                  body: "Be a trusted engineering partner for India's infrastructure growth.",
                  icon: "👁️",
                },
                {
                  label: "Values",
                  body: "Integrity, precision, safety and long-term client relationships.",
                  icon: "💎",
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  data-aos="fade-up"
                  data-aos-delay={i * 100 + 300}
                  className="group rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-premium)] hover:border-[color:var(--color-brand-orange)]/40"
                >
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl" aria-hidden="true">
                      {item.icon}
                    </span>
                    <div className="eyebrow text-sm md:text-base font-bold text-[color:var(--color-brand-navy)]">
                      {item.label}
                    </div>
                  </div>

                  <p className="mt-2 text-sm md:text-base lg:text-lg text-foreground/80 leading-relaxed font-medium">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                asChild
                variant="ghost"
                className="text-[color:var(--color-brand-navy)] hover:text-[color:var(--color-brand-navy)] px-0"
              >
                <Link to="/about">
                  Learn more about us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="py-24 lg:py-32 bg-muted/40 border-y border-border"
        aria-labelledby="services-heading"
      >
        <div className="container-page">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <SectionHeader
              eyebrow="What We Do"
              title="A full spectrum of project management and engineering services."
              description="From feasibility to close-out — a single accountable partner across the entire delivery chain."
            />

            <Button
              asChild
              variant="outline"
              className="rounded-full border-[color:var(--color-brand-navy)]/20 text-[color:var(--color-brand-navy)] hover:bg-[color:var(--color-brand-navy)] hover:text-white self-start lg:self-auto"
            >
              <Link to="/services">
                View all services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 9).map((s, i) => {
              const Icon = s.icon;

              return (
                <motion.div
                  key={s.slug}
                  data-aos="fade-up"
                  data-aos-delay={i * 50 + 100}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="group relative rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)] hover:border-[color:var(--color-brand-orange)]/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)]/5 text-[color:var(--color-brand-navy)] group-hover:bg-[color:var(--color-brand-orange)] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold text-[color:var(--color-brand-navy)]">
                    {s.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED INFRASTRUCTURE PROJECTS */}
      <section
        id="featured-projects"
        className="py-24 lg:py-32 bg-background border-b border-border"
        aria-labelledby="home-projects-heading"
      >
        <div className="container-page">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <SectionHeader
              eyebrow="Infrastructure Projects"
              title="Featured road & highway engineering projects in Maharashtra."
              description="Explore our project management consultancy, pavement engineering, and quality supervision on major public infrastructure assignments."
            />

            <Button
              asChild
              variant="outline"
              className="rounded-full border-[color:var(--color-brand-navy)]/20 text-[color:var(--color-brand-navy)] hover:bg-[color:var(--color-brand-navy)] hover:text-white self-start lg:self-auto"
            >
              <Link to="/projects">
                View all infrastructure projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 lg:py-32" aria-labelledby="why-choose-us-heading">
        <div className="container-page">
          <SectionHeader
            align="center"
            eyebrow="Why Choose Us"
            title="Engineering credibility. Delivery you can measure."
            description="We combine technical depth with disciplined project governance so owners can move forward with confidence."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  data-aos="zoom-in"
                  data-aos-delay={i * 50 + 100}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-border p-7 bg-gradient-to-b from-white to-muted/30"
                >
                  <Icon
                    className="h-6 w-6 text-[color:var(--color-brand-orange)]"
                    aria-hidden="true"
                  />

                  <h3 className="mt-4 font-display text-lg font-semibold text-[color:var(--color-brand-navy)]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CAREERS CALLOUT */}
      <section className="pb-16" aria-labelledby="home-careers-heading">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-soft)]">
            <div className="max-w-xl">
              <span className="eyebrow text-[color:var(--color-brand-orange)]">
                Careers at Milestone
              </span>
              <h3
                id="home-careers-heading"
                className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[color:var(--color-brand-navy)]"
              >
                Join our civil & highway engineering team.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We are actively recruiting site engineers, QA/QC specialists, and project managers
                for active infrastructure packages in Maharashtra.
              </p>
            </div>
            <Button
              asChild
              className="rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white self-start sm:self-center"
            >
              <Link to="/careers">
                Explore Open Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-page">
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="relative overflow-hidden rounded-3xl bg-[color:var(--color-brand-navy)] px-8 py-14 sm:px-14 sm:py-20"
          >
            <div
              className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[color:var(--color-brand-orange)]/20 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/5 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] items-center">
              <div>
                <span className="eyebrow text-[color:var(--color-brand-orange)]">
                  Start a Conversation
                </span>

                <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-balance">
                  Have a project in mind? Let's engineer it together.
                </h2>

                <p className="mt-5 text-white/70 max-w-xl">
                  Speak with our team about project management, highway engineering or
                  infrastructure consultancy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white h-12"
                >
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 bg-transparent border-white/30 text-white hover:bg-white hover:text-[color:var(--color-brand-navy)]"
                >
                  <a href={company.contact.phoneHref}>{company.contact.phone}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
