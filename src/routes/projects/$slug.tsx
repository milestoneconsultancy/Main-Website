import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  MapPin,
  Building2,
  Layers,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  CalendarClock,
  Sparkles,
  Award,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { getProjectBySlug, projects, legacyProjectSlugs } from "@/config/projects";
import { company } from "@/config/company";
import { createWebPageSchema, createBreadcrumbSchema, siteUrl } from "@/config/schema";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    if (legacyProjectSlugs[params.slug])
      throw redirect({
        to: "/projects/$slug",
        params: { slug: legacyProjectSlugs[params.slug] },
        statusCode: 301,
      });
    const project = getProjectBySlug(params.slug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.project) return {};
    const { project } = loaderData;
    const pageUrl = `${siteUrl}/projects/${project.slug}`;
    const cleanTitle =
      project.title.length > 55 ? `${project.title.slice(0, 52).trim()}...` : project.title;
    const pageTitle = `${cleanTitle} | Projects | ${company.name}`;
    const heroImageUrl =
      project.heroImage && project.heroImage.startsWith("http")
        ? project.heroImage
        : `${siteUrl}${project.heroImage?.startsWith("/") ? "" : "/"}${project.heroImage || "milestone-logo.jpeg"}`;

    const projectDesc =
      project.description.length > 160
        ? project.description.slice(0, 157).trim() + "..."
        : project.description;

    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: projectDesc },
        {
          name: "keywords",
          content: `${project.title}, ${project.category}, ${project.location}, ${project.workType || ""}, Milestone Consultancy, PMC, Project Management Consultancy, Maharashtra Infrastructure`,
        },
        {
          name: "robots",
          content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
        },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: projectDesc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: pageUrl },
        { property: "og:image", content: heroImageUrl },
        { property: "og:site_name", content: company.name },
        { property: "og:locale", content: "en_IN" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: pageTitle },
        { name: "twitter:description", content: projectDesc },
        { name: "twitter:image", content: heroImageUrl },
      ],
      links: [
        {
          rel: "canonical",
          href: pageUrl,
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              createWebPageSchema({
                id: `project-${project.slug}`,
                url: pageUrl,
                name: pageTitle,
                description: project.description,
                type: "ItemPage",
              }),
              createBreadcrumbSchema(pageUrl, [
                {
                  name: "Home",
                  item: siteUrl,
                },
                {
                  name: "Projects",
                  item: `${siteUrl}/projects`,
                },
                {
                  name: project.title,
                  item: pageUrl,
                },
              ]),
            ],
          }),
        },
      ],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();

  // Related projects (other projects in catalog)
  const relatedProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <SiteLayout>
      {/* Top Breadcrumbs Strip */}
      <section className="border-b border-border/80 bg-muted/30 py-3.5" aria-label="Breadcrumb">
        <div className="container-page">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Link to="/" className="hover:text-[color:var(--color-brand-navy)] transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              to="/projects"
              className="hover:text-[color:var(--color-brand-navy)] transition-colors"
            >
              Projects
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-[color:var(--color-brand-navy)] truncate max-w-[280px] sm:max-w-md">
              {project.title}
            </span>
          </nav>
        </div>
      </section>

      {/* Hero Section: 2-Column Corporate Presentation */}
      <section className="py-12 lg:py-16 bg-background" aria-labelledby="project-title">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Side: Metadata & Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200/80">
                  <span
                    className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
                    aria-hidden="true"
                  />
                  {project.status === "ongoing"
                    ? "Ongoing Project"
                    : project.status === "completed"
                      ? "Completed Project"
                      : "Upcoming Project"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-[color:var(--color-brand-navy)]/10 px-2.5 py-1 text-xs font-semibold text-[color:var(--color-brand-navy)]">
                  {project.category}
                </span>
              </div>

              {/* Project Title */}
              <h1
                id="project-title"
                className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.18] text-[color:var(--color-brand-navy)]"
              >
                {project.title}
              </h1>

              {/* Location */}
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-[color:var(--color-brand-orange)] flex-shrink-0" />
                <span className="font-medium text-foreground">{project.location}</span>
              </div>

              {/* Short Description */}
              <p className="mt-5 text-base sm:text-lg text-foreground/80 leading-relaxed">
                {project.description}
              </p>

              {/* Back to Projects Link */}
              <div className="mt-8 pt-4 border-t border-border/60 w-full">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-[color:var(--color-brand-orange)] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to all projects</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Side: Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-[var(--shadow-elegant)]">
                <img
                  src={project.heroImage}
                  alt={`${project.title} - ${project.category} infrastructure project in ${project.location}`}
                  className="h-full w-full object-cover"
                  width={1400}
                  height={960}
                  decoding="async"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Information Strip */}
      <section
        className="border-y border-border/80 bg-muted/40 py-6"
        aria-label="Project Quick Facts"
      >
        <div className="container-page">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {/* 1. Location */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-border/70 text-[color:var(--color-brand-orange)]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Location
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-[color:var(--color-brand-navy)]">
                  {project.location}
                </span>
              </div>
            </div>

            {/* 2. Nature of Work */}
            {project.workType && (
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-border/70 text-[color:var(--color-brand-navy)]">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Nature of Work
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-[color:var(--color-brand-navy)]">
                    {project.workType}
                  </span>
                </div>
              </div>
            )}

            {/* 3. Authority */}
            {project.authority && (
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-border/70 text-[color:var(--color-brand-navy)]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Authority / Client
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-[color:var(--color-brand-navy)] truncate max-w-[180px]">
                    {project.authority}
                  </span>
                </div>
              </div>
            )}

            {/* 4. Status or Project Value (if verified) */}
            {project.projectValue ? (
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-border/70 text-[color:var(--color-brand-orange)]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Project Value
                  </span>
                  <span className="mt-0.5 block text-sm font-bold text-[color:var(--color-brand-orange)]">
                    {project.projectValue}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-border/70 text-emerald-600">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Project Status
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-emerald-700 capitalize">
                    {project.status}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 lg:py-20 bg-background" aria-label="Project Details">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            {/* Primary Left Column */}
            <div className="lg:col-span-8 space-y-14">
              {/* 1. Project Overview */}
              {project.overview && (
                <div>
                  <span className="eyebrow text-[color:var(--color-brand-orange)]">
                    PROJECT OVERVIEW
                  </span>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[color:var(--color-brand-navy)]">
                    Context & Technical Background
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-foreground/85">
                    {project.overview}
                  </p>
                </div>
              )}

              {/* 2. Scope of Work (Consultancy & PMC Services) */}
              {project.scope && project.scope.length > 0 && (
                <div>
                  <span className="eyebrow text-[color:var(--color-brand-orange)]">
                    CONSULTANCY & PMC SCOPE
                  </span>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[color:var(--color-brand-navy)]">
                    Scope of Professional Services
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Key project management, engineering supervision, and technical assurance
                    deliverables administered for this assignment:
                  </p>
                  <ul className="mt-6 space-y-3.5">
                    {project.scope.map((item: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3.5 rounded-xl border border-border/80 bg-card p-4 text-sm leading-relaxed text-foreground shadow-sm"
                      >
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[color:var(--color-brand-orange)] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. Key Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <span className="eyebrow text-[color:var(--color-brand-orange)]">
                    KEY HIGHLIGHTS
                  </span>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[color:var(--color-brand-navy)]">
                    Technical Specifications & Features
                  </h2>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.highlights.map((h: string, idx: number) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-border/80 bg-muted/30 p-5 text-sm font-medium text-foreground leading-snug"
                      >
                        <div className="flex items-center gap-2 text-[color:var(--color-brand-navy)] font-bold mb-1.5">
                          <Sparkles className="h-4 w-4 text-[color:var(--color-brand-orange)]" />
                          <span>Feature {idx + 1}</span>
                        </div>
                        <p className="text-muted-foreground text-xs sm:text-sm">{h}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Project Gallery */}
              <div>
                <span className="eyebrow text-[color:var(--color-brand-orange)]">
                  PROJECT GALLERY
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[color:var(--color-brand-navy)]">
                  Site Photographs & Media
                </h2>
                <p className="mt-2 text-sm text-muted-foreground mb-6">
                  Representative photographs depicting alignment execution, materials inspection,
                  and site coordination.
                </p>
                <ProjectGallery images={project.gallery} projectTitle={project.title} />
              </div>
            </div>

            {/* Sidebar Right Column: Project Information & Governance */}
            <aside className="lg:col-span-4 space-y-8" aria-label="Project Information">
              {/* Project Metadata Card */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-sm sticky top-28">
                <h3 className="font-display text-lg font-bold text-[color:var(--color-brand-navy)] pb-4 border-b border-border/70">
                  Project Information
                </h3>

                <dl className="mt-5 space-y-4 text-sm">
                  {/* Category */}
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Sector / Category
                    </dt>
                    <dd className="mt-1 font-medium text-foreground">{project.category}</dd>
                  </div>

                  {/* Location */}
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Location
                    </dt>
                    <dd className="mt-1 font-medium text-foreground">{project.location}</dd>
                  </div>

                  {/* Work Type */}
                  {project.workType && (
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Work Specification
                      </dt>
                      <dd className="mt-1 font-medium text-foreground">{project.workType}</dd>
                    </div>
                  )}

                  {/* Authority */}
                  {project.authority && (
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Governing Authority
                      </dt>
                      <dd className="mt-1 font-medium text-foreground">{project.authority}</dd>
                    </div>
                  )}

                  {/* Client / Principal Contractor */}
                  {project.client && (
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Principal Contractor / Client
                      </dt>
                      <dd className="mt-1 font-medium text-foreground">{project.client}</dd>
                    </div>
                  )}

                  {/* Project Value */}
                  {project.projectValue && (
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Project Value / Scale
                      </dt>
                      <dd className="mt-1 font-bold text-[color:var(--color-brand-orange)]">
                        {project.projectValue}
                      </dd>
                    </div>
                  )}

                  {/* Status */}
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Execution Status
                    </dt>
                    <dd className="mt-1 flex items-center gap-2 text-foreground font-medium capitalize">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {project.status}
                    </dd>
                  </div>

                  {/* Related Services Links */}
                  <div className="pt-3 border-t border-border/70">
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Related Consultancy Services
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      <Link
                        to="/services"
                        className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-[color:var(--color-brand-navy)] hover:bg-[color:var(--color-brand-orange)]/15 transition-colors"
                      >
                        Highway Engineering
                      </Link>
                      <Link
                        to="/services"
                        className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-[color:var(--color-brand-navy)] hover:bg-[color:var(--color-brand-orange)]/15 transition-colors"
                      >
                        QA / QC Oversight
                      </Link>
                      <Link
                        to="/services"
                        className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-[color:var(--color-brand-navy)] hover:bg-[color:var(--color-brand-orange)]/15 transition-colors"
                      >
                        Construction Management
                      </Link>
                    </dd>
                  </div>
                </dl>

                {/* Sidebar CTA Box */}
                <div className="mt-8 rounded-xl bg-gradient-to-br from-[color:var(--color-brand-navy)] to-[color:var(--color-brand-blue)] p-5 text-white">
                  <h4 className="font-display font-bold text-sm">Require PMC for Similar Works?</h4>
                  <p className="mt-2 text-xs text-white/80 leading-relaxed">
                    Partner with Milestone Consultancy for compliant project scheduling, QA/QC, and
                    billing verification.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--color-brand-orange)] py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[color:var(--color-brand-orange)]/90 transition-colors"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section
          className="border-t border-border/80 py-16 bg-muted/25"
          aria-labelledby="related-projects-heading"
        >
          <div className="container-page">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="eyebrow text-[color:var(--color-brand-orange)]">EXPLORE MORE</span>
                <h2
                  id="related-projects-heading"
                  className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-[color:var(--color-brand-navy)]"
                >
                  Other Key Assignments
                </h2>
              </div>
              <Link
                to="/projects"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-brand-orange)] hover:underline"
              >
                <span>View all projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((p, idx) => (
                <ProjectCard key={p.id} project={p} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA Section */}
      <section
        className="py-20 bg-[color:var(--color-brand-navy)] text-white"
        aria-labelledby="detail-cta-heading"
      >
        <div className="container-page text-center max-w-2xl mx-auto">
          <span className="eyebrow text-[color:var(--color-brand-orange)]">
            COLLABORATE WITH MILESTONE
          </span>
          <h2 id="detail-cta-heading" className="mt-3 font-display text-3xl sm:text-4xl font-bold">
            Planning an Infrastructure Project?
          </h2>
          <p className="mt-4 text-base text-white/80 leading-relaxed">
            Speak directly with our project management team to discuss technical consultancy, QA/QC
            oversight, and disciplined execution support.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-orange)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[color:var(--color-brand-orange)]/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
